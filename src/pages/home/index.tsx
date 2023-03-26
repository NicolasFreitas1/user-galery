import { useState, useEffect } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Container, Teste } from "./styles";

import { Carousel } from "react-carousel-minimal";
import Modal from "react-modal";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import { useTable } from "react-table";
import jwt from "jsonwebtoken";
import Dropzone from "react-dropzone";

import imagem from "../../assets/teste111.jpg";
import imageInput from "../../assets/imageImput.svg";
import LixoImg from "../../assets/LixoImg.svg";
import { ModalComponent } from "../../components/Modal";

Modal.setAppElement("#root");

interface Image {
  id: number;
  name: string;
  url: string;
}

export function Home() {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef();
  const [showError, setShowError] = useState("");
  const errorFixed = showError.replace(/"/g, "");
  const [toggleBtn, setToggleBtn] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  /*   const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No file selected"); */
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<Image[]>([]);

  const toggle = () => {
    setToggleBtn((prevState) => !prevState);
  };

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    async function getImage() {
      try {
        const { data } = await api.get<Image[]>("/get_images");
        localStorage.getItem("token");
        console.log(data);
        setImages(data);
      } catch (error: any) {
        onOpen();
        setShowError(JSON.stringify(error.response.data.message));
        console.log(JSON.stringify(error.response.data.message));
      }
    }
    getImage();
  }, []);

  // Envia a imagem para um serviço de armazenamento em nuvem


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files![0]);
    
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await api.post('/upload_image',formData );
      console.log(formData)
      console.log(response.data);

      const imageUrl = response.data.url;
      console.log(imageUrl)
      localStorage.setItem("image_url", imageUrl);
      const urlImagem = localStorage.getItem('image_url');

      if (urlImagem) {
        const imgElement = document.getElementById('aaaaImagem') as HTMLImageElement;
        if (imgElement){
          imgElement.src = urlImagem;
        }
        
      } else {
        console.log('A imagem não foi encontrada no localStorage.');
      }
      closeModal;


    } catch (error) {
      console.log(error);
    }
  };

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }
  function goBack() {
    navigate("/");
  }
  // Data carrossel
  const dataImg = [
    {
      image: `${images}`,
      caption: `${images}`,
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };
  const data = React.useMemo(
    () => images,
    [
      {
        col4: "Ações",
      },
    ],
    []
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Nome",
        accessor: "name",
      },
      {
        Header: "Data de criação",
        accessor: "createdAt",
      },
      {
        Header: "Tamanho",
        accessor: "vlSize",
      },
      {
        Header: "Ações",
        accessor: `${FormData.name}`,
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;



  return (
    <Container>
      <header>
        <button type="button" onClick={handleLogout}>
          Encerrar sessao
        </button>
        <div className="Buttons">
          <button
            id="imageBtn"
            className="ImgButton1"
            type="button"
            onClick={toggle}
            disabled={toggleBtn}
          ></button>
          <button
            id="table"
            className="ImgButton2"
            type="button"
            onClick={toggle}
            disabled={!toggleBtn}
          ></button>
        </div>
        <button
          style={{ display: !toggleBtn ? "block" : "none" }}
          className="AddImages"
          type="submit"
          onClick={openModal}
        >
          Upload de imagem
        </button>
      </header>

      <div
        className="Carousel"
        style={{ display: toggleBtn ? "block" : "none" }}
      >
        {images.map((image) => (
        <img id="aaaaImagem" key={image.id} alt={image.name} />
      ))}
{/*         <Carousel
          data={dataImg}
          time={2000}
          width="850px"
          height="500px"
          captionStyle={captionStyle}
          radius="10px"
          slideNumber={true}
          slideNumberStyle={slideNumberStyle}
          captionPosition="bottom"
          automatic={true}
          dots={true}
          pauseIconColor="white"
          pauseIconSize="40px"
          slideBackgroundColor="darkgrey"
          slideImageFit="cover"
          thumbnails={true}
          thumbnailWidth="100px"
          style={{
            textAlign: "center",
            maxWidth: "850px",
            maxHeight: "500px",
            margin: "40px auto",
          }}
        /> */}
      </div>

      <div style={{ display: !toggleBtn ? "block" : "none" }}>
        <table {...getTableProps()} style={{ border: "solid 1px #7D7D7D" }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      border: "solid 1px gray",
                      background: "#B5B5B5",
                      color: "black",
                      fontWeight: "bold",
                      padding: "10px",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                          background: "#F8F8F8",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ModalComponent isOpen={modalIsOpen} close={closeModal}>
        <Teste>
        <form onSubmit={handleSubmit}>
        <input type="file"  name="file" accept="image/*" onChange={handleFileChange} />
          <div className="ButtonsModal">
            <button className="ModalButton">
              Concluir
            </button>
            <button type="reset" className="ModalButton" onClick={closeModal}>
              Cancelar
            </button>
          </div>
          </form>
        </Teste>
      </ModalComponent>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Erro
            </AlertDialogHeader>

            <AlertDialogBody>{errorFixed}</AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Fechar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}

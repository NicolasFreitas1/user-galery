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

export function Home() {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef();
  const [showError, setShowError] = useState("");
  const errorFixed = showError.replace(/"/g, "");
  const [toggleBtn, setToggleBtn] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [images, setImages] = useState([]);
/*   const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No file selected"); */
  const [imageURL, setImageURL] = useState("");
  const [imageName, setImageName] = useState([])

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
        const { data } = await api.get("/get_images/");
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


  const handleImageUpload = async (file) => {
    // Envia a imagem para um serviço de armazenamento em nuvem
    const formData = new FormData();
    formData.append("image", file[0]);

    const response = await fetch("http://localhost:3000/upload_image", {
      method: "POST",
      body: formData,
    });

    // Obtém a URL da imagem a partir da resposta
   
    const data = await response.json();
    console.log(data)
    const imageUrl = data.imageUrl;
    const imageName = data.image.name;

    // Define a URL da imagem no estado do componente
    setImageURL(imageUrl);
    setImageName(imageName);
  };
 /*  async function postImages() {
    try {
      const { data } = await api.post("/upload_image/", {
        name: fileName,
      });
      console.log(data);
      setImages(data);
      closeModal();
    } catch (error: any) {
      onOpen();
      setShowError(JSON.stringify(error.response.data.message));
      console.log(JSON.stringify(error.response.data.message));
    }
  }
 */
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
      image: `${imageURL}`,
      caption: `${imageName}`,
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
            className="ImgButton"
            type="button"
            onClick={toggle}
            disabled={toggleBtn}
          ></button>
          <button
            id="table"
            className="ImgButton"
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
        <Carousel
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
        />
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
          {imageURL ? (
            <img src={imageURL} alt="Uploaded image" />
          ) : (
            <Dropzone onDrop= {handleImageUpload}>
              {({ getRootProps, getInputProps }) => (
                <div className="fieldImage"{...getRootProps()}>
                  <input {...getInputProps()} />
                  <img src={imageInput} width={50} alt="Upload image" />
                  
                </div>
                
              )}  
            </Dropzone>
          )}
          <div className="ButtonsModal">
          <button className="ModalButton" onClick={() => {handleImageUpload}}>Concluir </button>
          <button className="ModalButton" onClick={closeModal}>Cancelar </button>
          </div>
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

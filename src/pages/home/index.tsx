import { useState, useEffect, ChangeEvent } from "react";
import * as React from "react";
import * as fs from "fs";
import * as path from "path";
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

import base64ToImage from 'base64-to-image';
import { useTable } from "react-table";

import imagem from "../../assets/teste111.jpg";
import imageInput from "../../assets/imageImput.svg";
import LixoImg from "../../assets/LixoImg.svg";
import { ModalComponent } from "../../components/Modal";

Modal.setAppElement("#root");

interface Image {
  id: number;
  filename: string;
  base64: string;
  data: string;
  
}

export function Home() {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef();
  const [showError, setShowError] = useState("");
  const errorFixed = showError.replace(/"/g, "");
  const [toggleBtn, setToggleBtn] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  /*   const [image, setImage] = useState(null); */
  const [fileName, setFileName] = useState("No file selected");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState()
  const [images, setImages] = useState<Image[]>([]);
  const [imageData, setImageData] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const [imageSrc, setImageSrc] = useState(null);
  
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
      const response = await api.get('get_images');
      const token = localStorage.getItem("token");
      api.defaults.headers.authorization = `Bearer ${token}`;
      setImages(response.data);
    }
    
  
    catch (error: any) {
    /*       onOpen();
    /*       setShowError(JSON.stringify(error.response.data.message));*/
          console.log(JSON.stringify(error.response.data.message));  
    }
  }
  getImage();
}, []);

    /*   setImageData(JSON.stringify(data));
      const file = data.images.base64.split(',')[1];
      console.log(file);
      const url = URL.createObjectURL(await fetch(`data:image/png;base64,${file}`).then(res => res.blob()));
      setImageUrl(url); */
  
/*       const imageDataArray = data.map(image => image.data).toString();
      const imageDataJson = JSON.stringify(imageDataArray).replaceAll(/["]/g, '');
      setImageData(JSON.stringify(imageDataJson));
      console.log(imageDataJson);
      console.log(imageData); */
      




/* const imageBase64 = `data:image/*;base64, ${imageData.replaceAll('"','')}`; // a string com a imagem em base64

// cria um blob a partir da imagem em base64
const blob = new Blob([imageBase64], { type: "image/*" });


// cria uma URL para o blob
const imageUrl = URL.createObjectURL(blob); */





  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFile(event.target.files![0]);
    console.log(selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    setFileName(selectedFile.name);

    try {
      const { data } = await api.post("/upload_image", formData);
      console.log("Resposta do servidor:", data);
      setImages([...images, data]);
    
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
    }
  };

  function handleCancel() {
    localStorage.removeItem("image");
    setModalIsOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  function goBack() {
    navigate("/");
  }
  // Data carrossel
  /* 
  const fun = () => {
    const te = testeImagens.map((testeImag)=> {
      image: testeImag,
      caption: = shdks
    })
  }
 */


const dataImg  = [
   images.map((image) => (
    {
      image: `data:image/*;base64,${image.data}`,
      caption: `${image.filename}`, 
    }
  )),
] 
 


/*   const dataImg = [
    {
      image: `${imageBase64}`,
      caption: `${imageUrl}`,
    },
  
  ]; */

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
        col4: "Bytes"
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
        Header: "Extensão",
        accessor: `extensao`,
      },
      ,
      {
        Header: "Tamanho",
        accessor: "vlSize",
      },
      {
        Header: "Data de criação",
        accessor: "createdAt",
      },
      {
        Header: "Ações", 
        accessor: "col4",
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
        <img key={image.filename} src={`data:image/png;base64,${image.data}`} alt={image.filename} />
      ))}


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
          <form name="image" onSubmit={handleSubmit}>
            <fieldset className="fieldImage">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileInputChange}
              />

        
            </fieldset>
            <div className="ButtonsModal">
              <button type="submit" className="ModalButton">
                Concluir
              </button>
              <button
                type="reset"
                className="ModalButton"
                onClick={handleCancel}
              >
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
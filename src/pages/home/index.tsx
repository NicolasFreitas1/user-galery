import { useState, useEffect } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Container, Teste } from "./styles";
// @ts-ignore
import { Carousel } from "react-carousel-minimal";
import Modal from "react-modal";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import { useTable } from "react-table";

import { ModalComponent } from "../../components/Modal";

Modal.setAppElement("#root");

interface Image {
  id: number;
  name: string;
  extensao: string;
  createdAt: string;
  size: number;
  nmStored: string;
  data: string;
}

export function Home() {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [showError, setShowError] = useState("");
  const errorFixed = showError;
  const [toggleBtn, setToggleBtn] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [imageById, setImageById] = useState<Image[]>([]);

  const toggle = () => {
    setToggleBtn((prevState) => !prevState);
  };

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  function openModal2() {
    setModalIsOpen2(true);
  }
  function closeModal2() {
    setModalIsOpen2(false);
  }

  useEffect(() => {
     verifyToken();
     getImage();
    }, []);

  async function verifyToken() {
    const token = localStorage.getItem("token");
    

    if (token) {
      navigate("/home");
      api.defaults.headers.authorization = `Bearer ${token}`;
    }
    else{
      navigate("/");
    }
  }

  async function getImage() {
    try {
      const response = await api.get("/get_images");

      setImages(response.data);
    } catch (error: any) {
      onOpen();
      setShowError(JSON.stringify(error.response.data.messages ) || (error.response.data.message));
    }
  }
  async function getImageById(id: number) {
    try {
      const response = await api.get(`/get_images/${id}`);
      console.log(response.data);
      setImageById(response.data);
      openModal2();
    } catch (error: any) {
      onOpen();
      setShowError(JSON.stringify(error.response.data.messages ) || (error.response.data.message));
    }
  }

  async function deleteImage(id: number) {
    try {
      const response = await api.delete(`/delete_image/${id}`);
      console.log(response.data);
      getImage()
    } catch (error: any) {
      onOpen();
      setShowError(JSON.stringify(error.response.data.messages ) || (error.response.data.message));
    }
  }

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

    try {
      const { data } = await api.post("/upload_image", formData);
      setImages([...images, data]);
      setModalIsOpen(false);
      getImage();
    } catch (error) {
      setShowError("Erro ao enviar imagem: " + JSON.stringify(error));
      
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
  const dataImg = images.map((image) => ({
    image: `data:image/*;base64,${image.data}`,
    caption: `${image.name} `,
  }));

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold", 
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };
  //@ts-ignore
  const data = React.useMemo(() => images, [images]);

  //Tabela
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
    ],
    []
  );

  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "Ações",
        Header: "Ações",
        Cell: ({ row }) => (
          <div>
          <button className ="ViewImage" onClick={() => getImageById(row.values.id)}>
          </button> 
          <button className="DeleteImage" onClick={() => deleteImage(row.values.id)}>
          </button>
          </div>
        ),
      },
    ]);
  };
  //@ts-ignore
  const tableInstance = useTable({ columns, data }, tableHooks);

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
        {dataImg.length ? (
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
        ) : (
          <h1> Faça uploads das suas imagens para vê-las aqui</h1>
        )}
      </div>

      <div style={{ display: !toggleBtn ? "block" : "none" }}>
      {dataImg.length ?(
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
         ) : (
          <h1> Você não possui imagens </h1>
        )}
      </div>

      <ModalComponent isOpen={modalIsOpen} close={closeModal}>
        <Teste>
          <form name="image" onSubmit={handleSubmit}>
            <fieldset className="fieldImage" onClick={() => document.querySelector('input')?.click()}>
              <input
                className="field-input"
                type="file" 
                name="image"
                accept="image/*"
                onChange={handleFileInputChange}
                hidden
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

      <ModalComponent isOpen={modalIsOpen2} close={closeModal2}>
        <Teste>
          <img src={`data:image/*;base64,${imageById.map(image => image.data)}`} width={600} alt="Imagem" />
          <button className="ModalButton" onClick={closeModal2} >Fechar</button>
        </Teste>
      </ModalComponent>

      <AlertDialog
        isOpen={isOpen}
        //@ts-ignore
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

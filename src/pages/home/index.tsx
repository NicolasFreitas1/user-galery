import  { useState, useEffect  } from 'react';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { Container } from './styles';
import './modal.css'
import { Carousel } from 'react-carousel-minimal';
import Modal from 'react-modal';
import { AlertDialog,
        AlertDialogBody, 
        AlertDialogContent,
        AlertDialogFooter,
        AlertDialogHeader, 
        AlertDialogOverlay, 
        Button, 
        useDisclosure,
      } from '@chakra-ui/react'
import { useTable}  from 'react-table'; 

import imagem from '../../assets/teste111.jpg'
import lixo from '../../assets/lixo.svg'


Modal.setAppElement('#root');

export function Home() {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure()

  const cancelRef = React.useRef()
  const [showError, setShowError] = useState('');
  const errorFixed = showError.replace(/"/g, '')
  const [toggleBtn, setToggleBtn] = useState(true)
  const [images, setImages] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

 const toggle= () => {
    setToggleBtn((prevState)=> !prevState)
    
 };

 function openModal() {
    setModalIsOpen(true)
 };
 function closeModal() {
    setModalIsOpen(false)
 };

  useEffect(() => {
    async function getImage() {
      try {
          const { data } = await api.get("/get_images/");
          console.log(data)
          setImages(data)
        
               
        }
      catch (error: any) {
        onOpen();
        setShowError(JSON.stringify((error.response.data.message)));
        console.log(JSON.stringify((error.response.data.message)));
        

      }
  }
     getImage();
    }, []);
          

    function handleLogout() { 
      localStorage.clear();
      navigate('/')
    }
    function goBack() { 
      navigate('/')
    }

    const dataImg = [
      {
        image: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
        caption: "Scotland"
      },
      {
        image: `${imagem}`,
        caption: "Teste"
      },
    ];
  
    const captionStyle = {
      fontSize: '2em',
      fontWeight: 'bold',
    }
    const slideNumberStyle = {
      fontSize: '20px',
      fontWeight: 'bold',
    }
    const data = React.useMemo(
      () => images, [
        {
          col4: 'Ações',

        }
      ]
      , []
    );
    const columns = React.useMemo(
      () => [
        {
          Header: 'Id',
          accessor: 'id', 
        },
        {
          Header: 'Nome',
          accessor: 'name',
        },
        {
          Header: 'Data de criação',
          accessor: 'createdAt',
        },
        {
          Header: 'Tamanho',
          accessor: 'vlSize',
        },
        {
          Header: 'Ações',
          accessor: 'col4',
        },
      ],
      []
    )

    const tableInstance = useTable({ columns, data })
 
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = tableInstance

  return (
    <Container>
      <header>
        <button 
          type="button"
          onClick={handleLogout} 
          >
            Encerrar sessao
        </button>
        <div className='Buttons'>
          <button 
            id = "imageBtn"
            className='ImgButton' 
            type="button"
            onClick={toggle}
            disabled  = {toggleBtn}
          >
          </button>
          <button 
            id = "table"
            className='ImgButton' 
            type="button"
            onClick={toggle} 
            disabled = {!toggleBtn}
          >
        </button>
        </div> 
        <button 
            style={{ display: !toggleBtn ? 'block' : 'none' }}
            className='AddImages' 
            type="button" 
            onClick = {openModal}
          >
            Upload de imagem
        </button>
      </header>
      
      <div className='Carousel' style={{ display: toggleBtn ? 'block' : 'none' }}>
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

      <div style={{ display: !toggleBtn ? 'block' : 'none' }}>
      <table {...getTableProps()} style={{ border: 'solid 1px #7D7D7D' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   border: 'solid 1px gray',
                   background: '#B5B5B5',
                   color: 'black',
                   fontWeight: 'bold',
                   padding: '10px',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: '#F8F8F8',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
      </div> 

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
        >
          <h2>Hello Modal</h2>
          <p>Lore</p>
          <button 
            type="button" 
            className='ModalButton'
            onClick={closeModal}
            >
              Close
            </button>
      </Modal>


      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Erro
            </AlertDialogHeader>

          <AlertDialogBody>
            {errorFixed}
          </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Fechar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
            
    </Container>
  )
}





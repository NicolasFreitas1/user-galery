import React, { useState, useEffect  } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { Container } from './styles';
import { Carousel } from 'react-carousel-minimal';

import { AlertDialog,
        AlertDialogBody, 
        AlertDialogContent,
        AlertDialogFooter,
        AlertDialogHeader, 
        AlertDialogOverlay, 
        Button, 
        Stack, 
        Switch,
        useDisclosure,
} from '@chakra-ui/react'

import images from '../../assets/teste111.jpg'
export function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [showError, setShowError] = useState('');
  const errorFixed = showError.replace(/"/g, '')


  
  const navigate = useNavigate();

  useEffect(() => {
    async function getImage() {
      try {
          const { data } = await api.get("/get_images/");
          console.log(data)
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

    const data = [
      {
        image: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
        caption: "Scotland"
      },
      {
        image: `http://localhost:3000/uploads`,
        caption: "teste"
      },
      {
        image: `${images}`,
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

  return (
    <Container>
      <header>
        <button 
          type="button"
          onClick={handleLogout} 
          >
            Encerrar sessao
        </button>
        <Stack align='center' direction='row'>
          <Switch size='lg' colorScheme="whatsapp" />
        </Stack>
      </header>
      <Carousel
            data={data}
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
                                <Button colorScheme='red' onClick={goBack} ml={3}>
                                    Fechar
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
    
    </Container>
  )
}

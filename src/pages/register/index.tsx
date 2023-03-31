import React, { useState, useEffect } from "react";

import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

import { Container } from "./styles";

import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/modal";
import { Button, useDisclosure } from "@chakra-ui/react";

import ButtonSend from "../../components/ButtonSend";
import Input from "../../components/Input";

export function Register() {
  const navigate = useNavigate();
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState("");

  useEffect(() => {
    verifyToken();
  }, []);

  async function verifyToken(){
    const token = localStorage.getItem("token");
    if(token){
        navigate('/home');
        api.defaults.headers.authorization = `Bearer ${token}`;
    }
  }

  async function handleRegister(event: any) {
    event.preventDefault();

    try {
      const { data } = await api.post("/user/register", {
        name,
        login,
        password,
      });
      const token = data.token
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error: any) {
      onOpen();
      setShowError(error.response.data.messages || error.response.data.message);
      
    }
  }

  return (
    <Container>
      <div className="Geral">
        <div className="DivImg"></div>
        <form method="post" onSubmit={handleRegister}>
          <fieldset>
            <legend>Registrar-se</legend>
            <Input
              type="text"
              placeholder="Digite seu nome"
              onChange={setName}
              required
            />
            <Input
              type="text"
              placeholder="Digite seu usuário"
              onChange={setLogin}
              required
            /> 
            <Input
              type="password"
              placeholder="Digite sua senha"
              onChange={setPassword}
              required
            />

            <ButtonSend >
              Acessar a plataforma
            </ButtonSend>
            <Link to="/" className="Text">
              Já possui uma conta? Faça login
            </Link>
          </fieldset>
        </form>
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

              <AlertDialogBody>{showError}</AlertDialogBody>

              <AlertDialogFooter>
                <Button colorScheme="red" onClick={onClose} ml={3}>
                  Fechar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    </Container>
  );
}

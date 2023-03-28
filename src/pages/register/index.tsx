import React, { useState, useEffect } from "react";

import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

import { Container } from "./styles";

import teste111 from "../login/assets/teste111.jpg";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState("");
  const errorFixed = showError.replace(/"/g, '')

  async function handleRegister(event: any) {
    event.preventDefault();

    try {
      const { data } = await api.post("/register", {
        name,
        login,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("login", JSON.stringify(data.login));
      localStorage.setItem("id", JSON.stringify(data.id));
      console.log(data);
      const token = localStorage.getItem("token");
      api.defaults.headers.authorization = `Bearer ${token}`;
      console.log(token);
      navigate("/home");
    } catch (error: any) {
      setShowError(JSON.stringify(error.response.data.message));
      console.log(JSON.stringify(error.response.data.message));
      onOpen();
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
      </div>
    </Container>
  );
}

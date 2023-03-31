import React, { useState, useEffect } from "react";

import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

import { Container } from "./styles";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import ButtonSend from "../../components/ButtonSend";
import Input from "../../components/Input";

export function Login() {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState("");

  useEffect(() => {
    verifyToken();
  }, []);

  async function verifyToken() {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
      api.defaults.headers.authorization = `Bearer ${token}`;
    }
  }

  async function handleLogin(event: any) {
    event.preventDefault();
    try {
      const { data } = await api.post("/user/login", {
        login,
        password,
      });
      const token = data.token;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error: any) {
      setShowError(error.response.data.message);
      onOpen();
    }
  }

  return (
    <Container>
      <div className="Geral">
        <div className="DivImg"></div>
        <form method="post" onSubmit={handleLogin}>
          <fieldset>
            <legend>Entrar</legend>
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

            <ButtonSend>Acessar a plataforma</ButtonSend>
            <Link to="/register" className="Text">
              Não possui uma conta? Registrar-se
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

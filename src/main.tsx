import "./styles/global.css";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterComponent } from "./router";
import { ChakraProvider } from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <React.StrictMode>
      <RouterComponent />
    </React.StrictMode>
  </ChakraProvider>
);

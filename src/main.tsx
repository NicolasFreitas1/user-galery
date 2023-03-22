import "./styles/global.css";

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

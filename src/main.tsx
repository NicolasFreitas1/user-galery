import "./styles/global.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterComponent } from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterComponent />
  </React.StrictMode>
);

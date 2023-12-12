import React from "react";
import ReactDOM from "react-dom/client";
import { Root } from "./modules/root/index.tsx";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);

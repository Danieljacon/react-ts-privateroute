import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "nprogress/nprogress.css";
import { Router } from "./Rooter";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

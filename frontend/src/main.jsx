import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import MsalAuthWrapper from "./MsalAuthWrapper.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MsalAuthWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MsalAuthWrapper>
  </React.StrictMode>
);

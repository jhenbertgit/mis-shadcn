import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/index.css";
import Header from "./components/Header.tsx";
import ThemeProvider from "./components/ThemeProvider.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="intelMis">
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

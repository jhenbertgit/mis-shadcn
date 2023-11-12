import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/index.css";
import Header from "./components/Header.tsx";
import ThemeProvider from "./components/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="intelMis">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

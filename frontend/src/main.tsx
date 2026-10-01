import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext";

// components
import PageMeta from "./components/PageMeta";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PageMeta />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);


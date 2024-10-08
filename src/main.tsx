import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.scss";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { SnackbarProvider } from "./components/Snackbar";

// Ensure the root element exists and type-safe
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </SnackbarProvider>
  </StrictMode>
);

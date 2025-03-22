import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";

import App from "./App";
import theme from "./theme";
import QueryProvider from "./context/query/provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <App />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>
);

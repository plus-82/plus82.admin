import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import App from "./App";
import QueryProvider from "./context/query/provider";
import theme from "./theme";

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

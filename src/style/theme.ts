import { createTheme } from "@mui/material/styles";

// change select component color
export const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    error: {
      main: "#FF3D3D",
    },
    action: {
      disabled: "#ddd",
    },
    primary: {
      main: "#FFA3FD",
      contrastText: "#191825",
      light: "#fff",
    },
    secondary: {
      main: "#865DFF",
    },
    background: {
      default: "#191825",
      paper: "#404258",
    },
  },
});

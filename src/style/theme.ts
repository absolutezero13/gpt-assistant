import { createTheme } from "@mui/material/styles";

// change select component color
export const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#FFA3FD",
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

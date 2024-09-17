// src/theme.tsx
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#224958", // --boston-blue
    },
    secondary: {
      main: "#ffffff", // --white
    },
    error: {
      main: "#c62828", // --red
    },
    warning: {
      main: "#ff8f00", // --orange
    },
    info: {
      main: "#ffd740", // --yellow
    },
    success: {
      main: "#2e7d32", // --green
    },
    background: {
      default: "#f5f5f5", // --white-smoke
    },
    text: {
      primary: "#000000", // --black
    },
  },
  typography: {
    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    fontSize: 14,
    h1: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: "5px",
    //       width: "100px",
    //     },
    //     disabled: {
    //       backgroundColor: "#9c9fa1", // --disabled
    //     },
    //   },
    // },
    MuiTable: {
      styleOverrides: {
        root: {
          // Add table-specific styles here
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
        },
      },
    },
    // Add other component overrides as needed
  },
});

export default theme;

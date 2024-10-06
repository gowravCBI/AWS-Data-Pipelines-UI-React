import { createTheme } from "@mui/material/styles";

const typography = {
  fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
  fontSize: 14,
  h1: { fontSize: 40 },
  h2: { fontSize: 32 },
  h3: { fontSize: 24 },
  h4: { fontSize: 20 },
  h5: { fontSize: 16 },
  h6: { fontSize: 14 },
};

const theme = createTheme({
  palette: {
    primary: { main: "#224958" },
    secondary: { main: "#ffffff" },
    error: { main: "#c62828" },
    warning: { main: "#ff8f00" },
    info: { main: "#ffd740" },
    success: { main: "#2e7d32" },
    background: { default: "#f5f5f5" },
    text: { primary: "#000000" },
  },
  typography,
});

export default theme;

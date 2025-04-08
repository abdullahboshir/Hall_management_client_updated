import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0075ED",
      light: "rgb(209, 215, 228)",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      main: "#03DAC6",
      light: "rgb(119, 128, 146)",
    },
    error: {
      main: "#f44336",
      light: "#ef5350",
      dark: "#d32f2f",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          padding: "8px 24px",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
  typography: {
    body1: {
      color: "#0B1134CC",
    },
  },
});

theme.shadows[1] = "0px 5px 22px lightgray";

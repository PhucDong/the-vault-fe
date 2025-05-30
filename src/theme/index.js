import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider as MUIThemeProvider } from "@mui/material";

const primary = {
  main: "#111111",
  light: "#cfcfcf",
  dark: "#616060",
};

const secondary = {
  main: "#FFFFFF",
};

const error = {
  main: "#DF2935",
};

const success = { main: "#248232" };

const info = { main: "#00A5CF" };

const theme = createTheme({
  palette: {
    primary: primary,
    secondary: secondary,
    success: success,
    error: error,
    info: info,
  },
  typography: {
    fontFamily: "Noto Sans, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          boxSizing: "border-box",
          overflowY: "overlay",
        },
        "*, *::before, *::after": {
          boxSizing: "inherit",
        },
        body: {
          overflow: "hidden !important", // Prevent unwanted shifts
          height: "100%",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          fontSize: "16px",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        lineHeight: "100%",
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

const ThemeProvider = ({ children }) => {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;

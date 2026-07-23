import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563EB",
    },

    secondary: {
      main: "#0F172A",
    },

    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },

    success: {
      main: "#22C55E",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#EF4444",
    },

    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },
  },

  shape: {
    borderRadius: 14,
  },

  typography: {
    fontFamily: ["Inter", "Segoe UI", "Roboto", "sans-serif"].join(","),

    h3: {
      fontWeight: 700,
      fontSize: "2.2rem",
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    subtitle1: {
      fontWeight: 500,
    },

    body2: {
      color: "#64748B",
    },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 18px rgba(15,23,42,.05)",
          border: "1px solid #E2E8F0",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 18px rgba(15,23,42,.05)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          background: "#F8FAFC",
        },
      },
    },
  },
});

export default theme;

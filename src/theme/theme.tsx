import { PaletteMode, PaletteOptions, createTheme } from "@mui/material";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    pageTitle: true;
    sectionTitle: true;
    title: true;
    display1: true;
    highlight: true;
    highlightMuted: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      a0: string;
      a1: string;
      a2: string;
      a3: string;
      b0: string;
      b1: string;
      b2: string;
      grey: string;
    };
    gradients: {
      brand: string;
      brandInverted: string;
    };
  }
}

const FONT = "Sora, sans-serif";
const SECONDARY_FONT = "Sora, sans-serif";

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1440,
    xxl: 1920,
  },
};

const colorPalette = (mode: PaletteMode) => {
  const getColor = (darkColor: string, lightColor: string) => {
    return mode === "dark" ? darkColor : lightColor;
  };

  // Available colors
  return {
    palette: {
      mode,
      // Typography
      text: {
        primary: getColor("#DAEDF8", "#1c1e20"), // Title & Highlights
        secondary: getColor("#a5a8b6", "#4d4d4d"), // Text, Paragraphs, Units, Icons
      },
      // Brand Specific
      primary: {
        main: getColor("#0094f6", "#0094f6"), // Call to Action, Interactive Element
      },
      secondary: {
        main: getColor("#0fcad5", "#0fcad5"), // Highlight, Non-Interactive
      },
      gradients: {
        brand: "linear-gradient(to right, #0FCAD5, #0094F6)",
        brandInverted: "linear-gradient(to right, #0094F6, #0FCAD5)",
      },
      // Status & Alerts
      success: {
        main: getColor("#1dffb4", "#1dffb4"),
      },
      info: {
        main: getColor("#2f8af5", "#2f8af5"),
      },
      warning: {
        main: getColor("#ed6c02", "#ed6c02"),
      },
      error: {
        main: getColor("#e3402a", "#e3402a"),
      },
      // Layout
      background: {
        default: getColor("#0B1121", "#f2f2f2"), // Body
        paper: getColor("#111828", "#ffffff"), // Navigation Bar, Footer, Cards
      },

      // Palette
      custom: {
        a0: getColor("#0B1121", "#f5f5f5"),
        a1: getColor("#111828", "#e0e0e0"),
        a2: getColor("#192233", "#d1d1d1"),
        a3: getColor("#2E384B", "#c1c1c1"),
        b0: getColor("#1DFFB4", "#80e27e"),
        b1: getColor("#0FCAD5", "#7edbd0"),
        b2: getColor("#0094F6", "#3a98e3"),
        grey: getColor("#909090", "#b0b0b0"),
      },

      divider: getColor("#ebebef14", "#cccccc"),
    },
  };
};

// Define your theme options
const typographyOptions = (palette: PaletteOptions) => {
  return {
    fontFamily: FONT,
    fontSize: 14,
    htmlFontSize: 16,
    // Default Text
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      color: palette.text?.primary,
    },
    display1: {
      fontSize: "1rem",
      fontWeight: 600,
      color: palette.text?.primary,
    },
    caption: {
      color: palette.text?.secondary,
    },
    pageTitle: {
      fontSize: "2.5rem",
      fontWeight: 500,
      color: palette.text?.primary,
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: 600,
      fontFamily: SECONDARY_FONT,
      color: palette.text?.primary,
    },
    title: {
      fontSize: "1rem",
      fontWeight: 500,
      color: palette.text?.primary,
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
      fontFamily: SECONDARY_FONT,
      color: palette.text?.primary,
    },

    // Helper Text
    // Page Highlights (rarely used, mainly to highlight important numbers (TVL, total balance, etc))
    highlight: {
      fontSize: "1.85rem",
      fontWeight: 600,
      color: palette.text?.primary,
      lineHeight: 1.2,
    },
    highlightMuted: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: palette.text?.secondary,
      lineHeight: 1.2,
    },
    // Disable unused MUI defaults
    h1: undefined,
    h2: undefined,
    h3: undefined,
    h4: undefined,
    h5: undefined,
    subtitle1: undefined,
    subtitle2: undefined,
    body2: undefined,
    overline: undefined,
  };
};

const customComponents = (palette: PaletteOptions) => {
  return {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            // Global scrollbar styles
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#111828b",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#0094f675",
              borderRadius: "6px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#0094f6",
            },
          },
          // Apply to all scrollable elements
          "*": {
            "&::-webkit-scrollbar": {
              width: "5px",
              height: "5px", // For Chrome, Safari, and Opera
            },
            "&::-webkit-scrollbar-track": {
              background: "#111828b",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#0094f675",
              borderRadius: "6px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#0094f6",
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: palette.background?.paper,
            borderRadius: 20,
            backgroundImage: "none",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: palette.background?.paper,
            backgroundImage: "none",
          },
        },
      },
    },
  };
};

export const scTheme = (mode: PaletteMode) => {
  const customPalette = colorPalette(mode);

  const theme = createTheme({
    direction: "ltr",
    breakpoints: breakpoints,
    typography: typographyOptions(customPalette.palette),
    ...customPalette,
    ...customComponents(customPalette.palette),
  });

  return theme;
};

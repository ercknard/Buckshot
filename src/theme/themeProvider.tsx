import { ReactNode, useEffect, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  PaletteMode,
  IconButton,
  Typography,
} from "@mui/material";
import { scTheme } from "@/theme/theme"; // Adjust the import according to your theme file
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeToggleButton: React.FC<{
  currentTheme: PaletteMode;
  toggleTheme: () => void;
}> = ({ currentTheme, toggleTheme }) => {
  const isDarkMode = currentTheme === "dark"; // Check for dark mode

  return (
    <IconButton
      type="button"
      className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${
        isDarkMode
          ? "text-[#b2b3bd] hover:bg-gray-700"
          : "text-[#62636c] hover:bg-gray-300"
      }`}
      onClick={toggleTheme}
    >
      <span className="absolute -inset-1.5" />
      <Typography className="sr-only">Toggle theme</Typography>
      {isDarkMode ? (
        <LightModeOutlinedIcon className="h-6 w-6" />
      ) : (
        <DarkModeOutlinedIcon className="h-6 w-6" />
      )}
    </IconButton>
  );
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState<PaletteMode>("dark");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") as PaletteMode;
    if (currentTheme === "dark" || currentTheme === "light") {
      setActiveTheme(currentTheme);
    } else {
      // Set default to dark if nothing is in localStorage
      const defaultTheme: PaletteMode = "dark";
      localStorage.setItem("theme", defaultTheme);
      setActiveTheme(defaultTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = activeTheme === "dark" ? "light" : "dark";
    setActiveTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <MuiThemeProvider theme={scTheme(activeTheme)}>
      <CssBaseline />
      <ThemeToggleButton currentTheme={activeTheme} toggleTheme={toggleTheme} />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  PaletteMode,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { scTheme } from "@/theme/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const ThemeContext = createContext<Theme | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeToggleButton: React.FC<{
  currentTheme: PaletteMode;
  toggleTheme: () => void;
}> = ({ currentTheme, toggleTheme }) => {
  const isDarkMode = currentTheme === "dark";

  return (
    <IconButton
      sx={{ position: "absolute", right: "0", top: "0" }}
      onClick={toggleTheme}
    >
      {isDarkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </IconButton>
  );
};

const ColorSetButton: React.FC<{
  setId: number;
  currentSet: number;
  onClick: (setId: number) => void;
}> = ({ setId, currentSet, onClick }) => (
  <Button
    variant={currentSet === setId ? "contained" : "outlined"}
    onClick={() => onClick(setId)}
    sx={{ margin: 1 }}
  >
    Color Set {setId}
  </Button>
);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState<PaletteMode>("dark");
  const [activeSet, setActiveSet] = useState<number>(1);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") as PaletteMode;
    const currentSet = localStorage.getItem("colorSet");

    if (currentTheme === "dark" || currentTheme === "light") {
      setActiveTheme(currentTheme);
    } else {
      const defaultTheme: PaletteMode = "dark";
      localStorage.setItem("theme", defaultTheme);
      setActiveTheme(defaultTheme);
    }

    if (currentSet) {
      setActiveSet(Number(currentSet));
    } else {
      localStorage.setItem("colorSet", "1");
      setActiveSet(1);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = activeTheme === "dark" ? "light" : "dark";
    setActiveTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const changeColorSet = (setId: number) => {
    setActiveSet(setId);
    localStorage.setItem("colorSet", setId.toString());
  };

  const customPalette = scTheme(activeTheme, activeSet);

  return (
    <ThemeContext.Provider value={customPalette}>
      <MuiThemeProvider theme={customPalette}>
        <CssBaseline />
        <ThemeToggleButton
          currentTheme={activeTheme}
          toggleTheme={toggleTheme}
        />
        <Box sx={{ position: "absolute", top: "0", right: "2rem" }}>
          {[1, 2, 3, 4, 5].map((setId) => (
            <ColorSetButton
              key={setId}
              setId={setId}
              currentSet={activeSet}
              onClick={changeColorSet}
            />
          ))}
        </Box>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;

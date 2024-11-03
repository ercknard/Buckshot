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
  Drawer,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { scTheme } from "@/theme/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon

const ThemeContext = createContext<Theme | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeToggleButton: React.FC<{
  currentTheme: PaletteMode;
  toggleTheme: (theme: PaletteMode) => void;
}> = ({ currentTheme, toggleTheme }) => {
  const colors = useThemeContext();

  const iconColor =
    currentTheme === "dark"
      ? colors.palette.custom.secondaryText
      : colors.palette.custom.secondaryText;

  return (
    <Stack
      direction={"row"}
      bgcolor={"custom.mainColor"}
      padding={0.5}
      spacing={1}
      width={"18rem"}
      borderRadius={"4px"}
    >
      <Button
        variant={currentTheme === "light" ? "outlined" : "contained"}
        sx={{
          color: currentTheme === "light" ? iconColor : "#ffffff",
          backgroundColor:
            currentTheme === "light"
              ? "custom.primaryBackground"
              : "custom.mainColor",
        }}
        onClick={() => toggleTheme("light")}
      >
        <LightModeOutlinedIcon />
        <Typography variant={"h6"} marginLeft={".25rem"}>
          Light mode
        </Typography>
      </Button>
      <Button
        variant={currentTheme === "dark" ? "outlined" : "contained"}
        sx={{
          color: currentTheme === "dark" ? iconColor : "#ffffff",
          backgroundColor:
            currentTheme === "dark"
              ? "custom.primaryBackground"
              : "custom.mainColor",
        }}
        onClick={() => toggleTheme("dark")}
      >
        <DarkModeOutlinedIcon sx={{ color: iconColor }} />
        <Typography variant={"h6"} marginLeft={".25rem"}>
          Dark mode
        </Typography>
      </Button>
    </Stack>
  );
};

const ColorSetButton: React.FC<{
  setId: number;
  currentSet: number;
  onClick: (setId: number) => void;
}> = ({ setId, currentSet, onClick }) => {
  const colors = ["#6169cf", "#456545", "#868645", "#a16c4f", "#b770ad"];

  return (
    <Button
      variant={currentSet === setId ? "contained" : "outlined"}
      onClick={() => onClick(setId)}
      sx={{
        backgroundColor:
          currentSet === setId ? colors[setId - 1] : colors[setId - 1] + "50",
        color: currentSet === setId ? "#ffffff" : colors[setId - 1],
        borderColor: colors[setId - 1],
      }}
    >
      {setId}
    </Button>
  );
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState<PaletteMode>("dark");
  const [activeSet, setActiveSet] = useState<number>(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
  const iconColor = customPalette.palette.custom.primaryText;

  return (
    <ThemeContext.Provider value={customPalette}>
      <MuiThemeProvider theme={customPalette}>
        <CssBaseline />
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            color: iconColor,
          }}
        >
          <SettingsIcon />
        </IconButton>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ minWidth: "400px", padding: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant={"h5"}>Settings</Typography>
              <IconButton
                onClick={() => setDrawerOpen(false)}
                sx={{
                  color: iconColor,
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
            <Box marginTop={1}>
              <Divider />
            </Box>
            <Box sx={{ marginTop: 2.5 }}>
              <ThemeToggleButton
                currentTheme={activeTheme}
                toggleTheme={toggleTheme}
              />
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              sx={{ marginTop: 2.5 }}
            >
              {[1, 2, 3, 4, 5].map((setId) => (
                <ColorSetButton
                  key={setId}
                  setId={setId}
                  currentSet={activeSet}
                  onClick={changeColorSet}
                />
              ))}
            </Box>
          </Box>
        </Drawer>
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

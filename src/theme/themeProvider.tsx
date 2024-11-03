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
import CloseIcon from "@mui/icons-material/Close";
import ChangeLoader from "./themeChangeLoader";

const ThemeContext = createContext<Theme | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeToggleButton: React.FC<{
  currentTheme: PaletteMode;
  toggleTheme: (theme: PaletteMode) => void;
}> = ({ currentTheme, toggleTheme }) => {
  const colors = useThemeContext();
  const iconColor = colors.palette.custom.secondaryText;

  return (
    <Stack
      direction="row"
      bgcolor="custom.mainColor"
      padding={0.5}
      spacing={1}
      width="18rem"
      borderRadius="4px"
    >
      {["light", "dark"].map((theme) => (
        <Button
          key={theme}
          variant={currentTheme === theme ? "contained" : "outlined"}
          sx={{
            color: currentTheme === theme ? "#ffffff" : iconColor,
            backgroundColor:
              currentTheme === theme
                ? "custom.mainColor"
                : "custom.primaryBackground",
          }}
          onClick={() => toggleTheme(theme as PaletteMode)}
        >
          {theme === "light" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
          <Typography variant="h6" marginLeft=".25rem">
            {`${theme.charAt(0).toUpperCase() + theme.slice(1)} mode`}
          </Typography>
        </Button>
      ))}
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
          currentSet === setId ? colors[setId - 1] : `${colors[setId - 1]}15`,
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
  const [loading, setLoading] = useState(false);
  const [loaderKey, setLoaderKey] = useState(0);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as PaletteMode;
    const storedSet = localStorage.getItem("colorSet");
    setActiveTheme(
      storedTheme === "dark" || storedTheme === "light" ? storedTheme : "dark"
    );

    setActiveSet(storedSet ? Number(storedSet) : 1);
    localStorage.setItem("theme", storedTheme || "dark");
    localStorage.setItem("colorSet", storedSet || "1");
  }, []);

  const toggleTheme = (theme: PaletteMode) => {
    setActiveTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const changeColorSet = (setId: number) => {
    setLoading(true);
    setActiveSet(setId);
    localStorage.setItem("colorSet", setId.toString());

    // Change the loader key to force re-render
    setLoaderKey((prevKey) => prevKey + 1);

    // Simulating loading duration
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const customPalette = scTheme(activeTheme, activeSet);
  const iconColor = customPalette.palette.custom.primaryText;

  return (
    <ThemeContext.Provider value={customPalette}>
      <MuiThemeProvider theme={customPalette}>
        <CssBaseline />
        <ChangeLoader
          loading={loading}
          key={loaderKey}
          colorSetId={activeSet}
        />
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
              <Typography variant="h5" color="custom.primaryText">
                Settings
              </Typography>
              <IconButton
                onClick={() => setDrawerOpen(false)}
                sx={{ color: iconColor }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
            <Divider
              sx={{
                bgcolor: "custom.tertiaryBorders",
                marginTop: 1.5,
                marginBottom: 2.5,
              }}
            />
            <ThemeToggleButton
              currentTheme={activeTheme}
              toggleTheme={toggleTheme}
            />
            <Box display="flex" justifyContent="space-between" marginTop={2.5}>
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
  if (!context)
    throw new Error("useThemeContext must be used within a ThemeProvider");
  return context;
};

export default ThemeProvider;

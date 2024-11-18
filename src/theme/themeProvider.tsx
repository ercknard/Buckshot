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
  Fab,
  Drawer,
  Box,
  Typography,
  Stack,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import { Theme as MuiTheme } from "@mui/material/styles";
import { scTheme } from "@/theme/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import ChangeLoader from "./themeChangeLoader";

// Define the context type
interface CustomTheme extends MuiTheme {
  activeSet: number;
  fancyMode: boolean;
  soundsMode: boolean;
}

// Create context with a default value of null
const ThemeContext = createContext<CustomTheme | null>(null);

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
      width="16.4rem"
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
  const [fancyMode, setFancyMode] = useState<boolean>(true);
  const [soundsMode, setSoundsMode] = useState<boolean>(true);

  useEffect(() => {
    // First, check if there's a stored theme and color set in localStorage
    const storedTheme =
      (localStorage.getItem("theme") as PaletteMode) || "dark"; // Explicitly cast to PaletteMode
    const storedSet = Number(localStorage.getItem("colorSet")) || 1; // Default to set 1 if no value found
    const storedFancyMode = localStorage.getItem("fancyMode") === "true";
    const storedSoundsMode = localStorage.getItem("soundsMode") === "true";

    // Apply the theme and color set from localStorage
    setActiveTheme(storedTheme); // No need to cast, already a PaletteMode
    setActiveSet(storedSet);
    setFancyMode(storedFancyMode);
    setSoundsMode(storedSoundsMode);

    // Now, check the URL for parameters (if present, override localStorage values)
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get("theme");
    const urlColor = urlParams.get("color");
    const urlFancy = urlParams.get("fancy");
    const urlSound = urlParams.get("sound");

    // If there are URL parameters for theme or color, override localStorage values
    const finalTheme =
      urlTheme && (urlTheme === "light" || urlTheme === "dark")
        ? (urlTheme as PaletteMode)
        : storedTheme;
    const finalSet =
      urlColor &&
      ["blue", "green", "yellow", "orange", "pink"].includes(urlColor)
        ? ["blue", "green", "yellow", "orange", "pink"].indexOf(urlColor) + 1
        : storedSet;
    const finalFancyMode = urlFancy === "on";
    const finalSoundMode = urlSound === "on";

    // Update the state with the final values (from either URL or localStorage)
    setActiveTheme(finalTheme); // No need to cast, already a PaletteMode
    setActiveSet(finalSet);
    setFancyMode(finalFancyMode);
    setSoundsMode(finalSoundMode);

    // Store the final values in localStorage
    localStorage.setItem("theme", finalTheme);
    localStorage.setItem("colorSet", finalSet.toString());
    localStorage.setItem("fancyMode", finalFancyMode.toString());
    localStorage.setItem("soundMode", finalSoundMode.toString());

    // Optionally update the URL with the correct theme and color set (for sharing/bookmarking)
    const url = new URL(window.location.href);
    url.searchParams.set("theme", finalTheme);
    url.searchParams.set(
      "color",
      ["blue", "green", "yellow", "orange", "pink"][finalSet - 1]
    );
    url.searchParams.set("fancy", finalFancyMode ? "on" : "off");
    url.searchParams.set("sound", finalSoundMode ? "on" : "off");
    window.history.pushState({}, "", url.toString());
  }, []);

  const toggleTheme = (theme: PaletteMode) => {
    setActiveTheme(theme);
    localStorage.setItem("theme", theme);
    // Update URL parameter
    const url = new URL(window.location.href);
    url.searchParams.set("theme", theme);
    window.history.pushState({}, "", url.toString());
  };

  const changeColorSet = (setId: number) => {
    setLoading(true);
    setActiveSet(setId);
    localStorage.setItem("colorSet", setId.toString());
    // Update URL parameter

    const url = new URL(window.location.href);

    let color;
    switch (setId) {
      case 1:
        color = "blue";
        break;
      case 2:
        color = "green";
        break;
      case 3:
        color = "yellow";
        break;
      case 4:
        color = "orange";
        break;
      case 5:
        color = "pink";
        break;
      default:
        color = "blue"; // If setId is anything else, just use it as a string
    }

    url.searchParams.set("color", color);
    window.history.pushState({}, "", url.toString());

    setLoaderKey((prevKey) => prevKey + 1); // Force re-render

    setTimeout(() => {
      setLoading(false); // Hide loader after 3 seconds
    }, 3000); // Simulate loading duration

    document.body.style.overflowY = "auto";

    setTimeout(() => {
      setDrawerOpen(false); // Close drawer after an additional 1 second
    }, 1000); // 1 second delay before closing
  };

  const toggleFancyMode = () => {
    setLoading(true);
    const newFancyMode = !fancyMode;
    setFancyMode(newFancyMode);
    localStorage.setItem("fancyMode", newFancyMode.toString());

    // Optionally update the URL to reflect the fancy mode
    const url = new URL(window.location.href);
    url.searchParams.set("fancy", newFancyMode ? "on" : "off");
    window.history.pushState({}, "", url.toString());
    setDrawerOpen(false);

    setLoaderKey((prevKey) => prevKey + 1); // Force re-render

    setTimeout(() => {
      setLoading(false); // Hide loader after 3 seconds
    }, 3000); // Simulate loading duration
  };

  const toggleSoundMode = () => {
    const newSoundMode = !soundsMode;
    setSoundsMode(newSoundMode);
    localStorage.setItem("soundMode", newSoundMode.toString());

    // Optionally update the URL to reflect the fancy mode
    const url = new URL(window.location.href);
    url.searchParams.set("sound", newSoundMode ? "on" : "off");
    window.history.pushState({}, "", url.toString());
  };

  const customPalette: CustomTheme = {
    ...scTheme(activeTheme, activeSet),
    activeSet, // Add the activeSet to the theme
    fancyMode,
    soundsMode,
  };

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
        <Fab
          onClick={() => setDrawerOpen(true)}
          sx={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            color: iconColor,
            backgroundColor: customPalette.palette.custom.mainColor,
            "&:hover": {
              backgroundColor:
                customPalette.palette.custom.secondarySolidColors, // Optional
            },
          }}
        >
          <Typography color={customPalette.palette.custom.secondaryText}>
            <SettingsIcon />
          </Typography>
        </Fab>
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
                Preference
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
            <Stack
              direction={"row"}
              marginTop={2.5}
              spacing={2}
              alignItems={"center"}
            >
              <Typography variant="h5" color="custom.primaryText">
                Fancy Mode:
              </Typography>
              <Button
                variant={fancyMode ? "contained" : "outlined"}
                onClick={toggleFancyMode}
                sx={{
                  backgroundColor: fancyMode
                    ? customPalette.palette.custom.secondarySolidColors
                    : customPalette.palette.custom.secondarySolidColors,
                  color: fancyMode
                    ? customPalette.palette.custom.secondaryText
                    : customPalette.palette.custom.secondaryText,
                }}
              >
                {fancyMode ? "ON" : "OFF"}
              </Button>
            </Stack>

            <Stack
              direction={"row"}
              marginTop={2.5}
              spacing={2}
              alignItems={"center"}
            >
              <Typography variant="h5" color="custom.primaryText">
                Sound Mode:
              </Typography>
              <Button
                variant={soundsMode ? "contained" : "outlined"}
                onClick={toggleSoundMode}
                sx={{
                  backgroundColor: soundsMode
                    ? customPalette.palette.custom.secondarySolidColors
                    : customPalette.palette.custom.secondarySolidColors,
                  color: soundsMode
                    ? customPalette.palette.custom.secondaryText
                    : customPalette.palette.custom.secondaryText,
                }}
              >
                {soundsMode ? "ON" : "OFF"}
              </Button>
            </Stack>
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

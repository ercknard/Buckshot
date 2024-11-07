import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Grid,
  Paper,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import DefaultDialog from "../DefaultDialog";

type CustomTheme = {
  activeSet: number;
};

type Mod = {
  name: string;
  html_url: string;
};

const ModsList: React.FC = () => {
  const [mods, setMods] = useState<Mod[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { activeSet } = useThemeContext() as CustomTheme;

  const colorSetBgBorderRight: { [key: string]: string } = {
    1: "/static/images/blue-border.png",
    2: "/static/images/green-border.png",
    3: "/static/images/yellow-border.png",
    4: "/static/images/orange-border.png",
    5: "/static/images/pink-border.png",
  };

  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];

  useEffect(() => {
    const fetchMods = async () => {
      try {
        const response = await fetch("/api/MinetestModsApi");
        if (!response.ok) {
          throw new Error("Failed to fetch mod list");
        }
        const data = await response.json();
        setMods(data);
      } catch (err) {
        setError("Error loading mods");
      } finally {
        setLoading(false);
      }
    };

    fetchMods();
  }, []);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // Separate the first 5 mods and the rest
  const displayedMods = mods.slice(0, 10);
  const remainingMods = mods.slice(10);

  return (
    <Box padding={3}>
      <Grid
        position={"relative"}
        zIndex={2}
        container
        spacing={3}
        justifyContent="center"
      >
        {displayedMods.map((mod) => (
          <Grid item xs={12} sm={6} md={2.4} key={mod.name}>
            <a href={mod.html_url} target="_blank" rel="noopener noreferrer">
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  textAlign: "center",
                  transition: "transform 0.2s, background-color 0.3s",
                  backgroundColor: "custom.secondaryBackground",
                  borderWidth: "10px",
                  borderStyle: "solid",
                  borderImage: `url('${imageBgBorderSrc}') 30 round`,
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "custom.secondaryComponents",
                  },
                }}
              >
                <Typography variant="h6" fontSize={"1.5rem"}>
                  {mod.name}
                </Typography>
              </Paper>
            </a>
          </Grid>
        ))}
      </Grid>

      {/* Button to open dialog for remaining mods */}
      {remainingMods.length > 0 && (
        <Box display="flex" justifyContent="right" marginTop={3}>
          <Button variant="outlined" onClick={handleDialogOpen}>
            View More Mods
          </Button>
        </Box>
      )}

      {/* Dialog to show the remaining mods */}
      <DefaultDialog
        maxWidth="md"
        open={openDialog}
        handleOnClose={handleDialogClose}
        title="All mods"
      >
        <Grid
          position={"relative"}
          zIndex={2}
          container
          spacing={3}
          justifyContent="center"
        >
          {remainingMods.map((mod) => (
            <Grid item xs={12} sm={6} md={4} key={mod.name}>
              <a href={mod.html_url} target="_blank" rel="noopener noreferrer">
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    textAlign: "center",
                    transition: "transform 0.2s, background-color 0.3s",
                    backgroundColor: "custom.secondaryBackground",
                    borderWidth: "10px",
                    borderStyle: "solid",
                    borderImage: `url('${imageBgBorderSrc}') 30 round`,
                    "&:hover": {
                      transform: "scale(1.05)",
                      backgroundColor: "custom.secondaryComponents",
                    },
                  }}
                >
                  <Typography variant="h6" fontSize={"1.5rem"}>
                    {mod.name}
                  </Typography>
                </Paper>
              </a>
            </Grid>
          ))}
        </Grid>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </DefaultDialog>
    </Box>
  );
};

const ModsSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      position={"relative"}
      width={1}
      left={0}
      sx={{
        padding: 4,
        backgroundColor: "custom.secondaryBackground",
        paddingTop: "10rem",
        paddingBottom: "10rem",
      }}
    >
      {/* Container for Mods List */}
      <Container
        sx={{
          justifyContent: { sm: "center", xs: "left" },
          marginX: "auto",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Featured Mods
        </Typography>

        {/* Display Mods List */}
        <ModsList />
      </Container>
    </Box>
  );
};

export default ModsSection;

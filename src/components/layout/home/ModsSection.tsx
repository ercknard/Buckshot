import React, { useState, useRef, useEffect } from "react";
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
  Stack,
} from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import DefaultDialog from "../DefaultDialog";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

type CustomTheme = {
  activeSet: number;
};

type Mod = {
  name: string;
  html_url: string;
};

const slides = [
  {
    id: 1,
    title: "TestCoin",
    content:
      "Test Coin is a fake hybrid PoW/PoS cryptocurrency used as in-game currency in CryptechTest game.",
    image: "/static/images/testcoin-grouped.png",
    image_size: "40%",
  },
  {
    id: 2,
    title: "Starships",
    content: "CryptechTest Voxel Starships",
    image: "/static/images/scout.webp",
    image_size: "40%",
  },
  {
    id: 3,
    title: "Orbital Station",
    content: "CryptechTest Spawn point",
    image: "/static/images/ship-2.png",
    image_size: "40%",
  },
];

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
        title="Cryptech Mods List"
      >
        <Grid
          position={"relative"}
          zIndex={2}
          container
          spacing={5}
          justifyContent="center"
          paddingTop={5}
        >
          {remainingMods.map((mod) => (
            <Grid item xs={12} sm={6} md={4} key={mod.name}>
              <a href={mod.html_url} target="_blank" rel="noopener noreferrer">
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2.5,
                    textAlign: "center",
                    transition: "transform 0.2s, background-color 0.3s",
                    backgroundColor: "custom.secondaryBackground",
                    backgroundImage: "unset",
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
  const { activeSet } = useThemeContext();

  const colorSetBgBorderRight: { [key: string]: string } = {
    1: "/static/images/blue-border.png",
    2: "/static/images/green-border.png",
    3: "/static/images/yellow-border.png",
    4: "/static/images/orange-border.png",
    5: "/static/images/pink-border.png",
  };

  const colorSetBgBorderDark: { [key: string]: string } = {
    1: "/static/images/blue-border-dark.png",
    2: "/static/images/green-border-dark.png",
    3: "/static/images/yellow-border-dark.png",
    4: "/static/images/orange-border-dark.png",
    5: "/static/images/pink-border-dark.png",
  };

  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];

  const imageBgBorderDarkSrc =
    colorSetBgBorderDark[activeSet.toString()] || colorSetBgBorderDark[1];

  return (
    <Box
      position={"relative"}
      width={1}
      left={0}
      sx={{
        padding: 4,
        backgroundColor: "custom.primaryComponents",
        paddingTop: "10rem",
        paddingBottom: "10rem",
      }}
    >
      {/* <Box
        component={"img"}
        alt="Logo"
        src={imageBgBorderDarkSrc}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <Box
        component={"img"}
        alt="Logo"
        src={imageBgBorderSrc}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      /> */}

      {/* Container for Mods List */}
      <Container
        sx={{
          justifyContent: { sm: "center", xs: "left" },
          marginX: "auto",
        }}
      >
        <Box position={"relative"} zIndex={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Featured Mods
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Check out our latest feature mods, designed to enhance functionality
            and improve your experience.
          </Typography>
        </Box>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Box
                  component="img"
                  width={slide.image_size}
                  alt="Logo"
                  src={slide.image}
                  marginX={"auto"}
                />
                <Stack direction={"column"} spacing={1}>
                  <Typography
                    variant="body1"
                    fontSize={"1.75rem"}
                    color="custom.primaryText"
                  >
                    {slide.title}
                  </Typography>
                  <Typography variant="h5" color="custom.secondaryText">
                    {slide.content}
                  </Typography>
                </Stack>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <ModsList />
      </Container>
    </Box>
  );
};

export default ModsSection;

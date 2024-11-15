import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import DefaultDialog from "../DefaultDialog";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import supabase from "@/lib/supabase";

type CustomTheme = {
  activeSet: number;
};

type Mod = {
  name: string;
  html_url: string;
};

type Slide = {
  id: number;
  title: string;
  content: string;
  image: string;
  image_size: string;
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
    <Box padding={3} sx={{ display: { md: "block", xs: "none" } }}>
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
                  borderImage: `url("${imageBgBorderSrc}") 30 round`,
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
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { activeSet } = useThemeContext() as CustomTheme;

  // Background images based on the active set
  const colorSetCapsule: { [key: string]: string } = {
    1: "/static/images/blue-capsule.png",
    2: "/static/images/green-capsule.png",
    3: "/static/images/yellow-capsule.png",
    4: "/static/images/orange-capsule.png",
    5: "/static/images/pink-capsule.png",
  };

  const imageBgCapsule =
    colorSetCapsule[activeSet.toString()] || colorSetCapsule[1];

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // Fetch slides from Supabase
        const { data, error } = await supabase
          .from("featured_mods") // Assuming "featuredmods" is your table name
          .select("*");

        if (error) throw error;

        setSlides(data); // Set the fetched slides data
      } catch (err) {
        setError("Error loading slides");
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

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

  return (
    <Box
      id="mods"
      position={"relative"}
      width={1}
      left={0}
      sx={{
        padding: { md: "4", xs: "1" },
        backgroundColor: (theme) =>
          `rgba(${parseInt(
            theme.palette.custom.primaryComponents.slice(1, 3),
            16
          )}, ${parseInt(
            theme.palette.custom.primaryComponents.slice(3, 5),
            16
          )}, ${parseInt(
            theme.palette.custom.primaryComponents.slice(5, 7),
            16
          )}, .5)`,

        paddingTop: { md: "5rem", xs: "3rem" },
        paddingBottom: { md: "5rem", xs: "3rem" },
      }}
    >
      <Box
        component={"img"}
        alt="Logo"
        src={imageBgCapsule}
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.75,
          filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))",
        })}
      />

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

        {/* Swiper Component for Featured Mods */}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".swiper-button-prev", // Custom prev button
            nextEl: ".swiper-button-next", // Custom next button
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          style={{ marginBottom: "2rem" }}
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
                  width={{ xs: "100%", md: `${slide.image_size}` }}
                  alt={slide.title}
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

          {/* Custom Navigation Buttons */}
          <Box
            className="swiper-button-prev"
            sx={{
              position: "absolute",
              display: { md: "block", xs: "none" },
              top: "58.25%",
              left: "10px",
              transform: "translateY(-50%)",
              zIndex: 3,
              cursor: "pointer",
              color: "custom.primaryText",
            }}
          />
          <Box
            className="swiper-button-next"
            sx={{
              position: "absolute",
              display: { md: "block", xs: "none" },
              top: "58.25%",
              right: "10px",
              transform: "translateY(-50%)",
              zIndex: 3,
              cursor: "pointer",
              color: "custom.primaryText",
            }}
          />
        </Swiper>
        <ModsList />
      </Container>
    </Box>
  );
};

export default ModsSection;

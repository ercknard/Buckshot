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

const slides = [
  {
    id: 1,
    title: "StakeCube",
    content: "Join the Future of Finance & Trade Crypto with Confidence.",
    image: "/static/images/stakecube-logo.jpeg",
  },
];

const PartnersSection: React.FC = () => {
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

  const colorSetCapsule: { [key: string]: string } = {
    1: "/static/images/blue-capsule.png",
    2: "/static/images/green-capsule.png",
    3: "/static/images/yellow-capsule.png",
    4: "/static/images/orange-capsule.png",
    5: "/static/images/pink-capsule.png",
  };

  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];

  const imageBgBorderDarkSrc =
    colorSetBgBorderDark[activeSet.toString()] || colorSetBgBorderDark[1];

  const imageBgCapsule =
    colorSetCapsule[activeSet.toString()] || colorSetCapsule[1];

  return (
    <Box
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
        paddingTop: { md: "5rem", xs: "2.5rem" },
        paddingBottom: { md: "5rem", xs: "2.5rem" },
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
          filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))", // Drop shadow applied
        })}
      />

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
            Our Partners
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            A special thanks to our partners for their invaluable support in
            making this game possible.
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
                  padding: 2,
                  textAlign: "center",
                  marginBottom: 5,
                  marginTop: 5,
                }}
              >
                <Box
                  component="img"
                  width="15%"
                  alt="Logo"
                  src={slide.image}
                  marginX={"auto"}
                />
                <Stack direction={"column"} spacing={2} marginTop={"2.5rem"}>
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
      </Container>
    </Box>
  );
};

export default PartnersSection;

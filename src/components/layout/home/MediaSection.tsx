import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import navigation styles

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

type CustomTheme = {
  activeSet: number;
};

const videoUrls = [
  "https://firebasestorage.googleapis.com/v0/b/cryptech-3c327.appspot.com/o/CryptechTest_Teaser_final%20(1).mp4?alt=media&token=466d45d1-f730-4e0f-9b23-a24cc7dccc96",
  "https://firebasestorage.googleapis.com/v0/b/cryptech-3c327.appspot.com/o/CryptechTest_Teaser_final%20(1).mp4?alt=media&token=466d45d1-f730-4e0f-9b23-a24cc7dccc96",
  "https://firebasestorage.googleapis.com/v0/b/cryptech-3c327.appspot.com/o/CryptechTest_Teaser_final%20(1).mp4?alt=media&token=466d45d1-f730-4e0f-9b23-a24cc7dccc96",
  "https://firebasestorage.googleapis.com/v0/b/cryptech-3c327.appspot.com/o/CryptechTest_Teaser_final%20(1).mp4?alt=media&token=466d45d1-f730-4e0f-9b23-a24cc7dccc96",
  "https://firebasestorage.googleapis.com/v0/b/cryptech-3c327.appspot.com/o/CryptechTest_Teaser_final%20(1).mp4?alt=media&token=466d45d1-f730-4e0f-9b23-a24cc7dccc96",
];

const MediaSection: React.FC = () => {
  const { activeSet } = useThemeContext() as CustomTheme;
  const theme = useTheme();

  const colorSetBgMap: { [key: string]: string } = {
    1: "/static/images/blue-gate.webp",
    2: "/static/images/green-gate.webp",
    3: "/static/images/yellow-gate.webp",
    4: "/static/images/orange-gate.webp",
    5: "/static/images/pink-gate.webp",
  };

  const colorSetBgBannerRight: { [key: string]: string } = {
    1: "/static/images/blue-banner.png",
    2: "/static/images/green-banner.png",
    3: "/static/images/yellow-banner.png",
    4: "/static/images/orange-banner.png",
    5: "/static/images/pink-banner.png",
  };

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

  const imageBgSrc = colorSetBgMap[activeSet.toString()] || colorSetBgMap[1];

  const imageBgBannerSrc =
    colorSetBgBannerRight[activeSet.toString()] || colorSetBgBannerRight[1];

  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];

  const imageBgBorderDarkSrc =
    colorSetBgBorderDark[activeSet.toString()] || colorSetBgBorderDark[1];

  const videoThumbnails = [
    `${imageBgSrc}`,
    `${imageBgSrc}`,
    `${imageBgSrc}`,
    `${imageBgSrc}`,
    `${imageBgSrc}`,
  ];

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
      {/* <Box
        component={"img"}
        src="/static/images/earth.webp"
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.35,
        })}
      /> */}

      <Box
        component={"img"}
        src={imageBgBorderDarkSrc}
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        })}
      />

      <Box
        component={"img"}
        src={imageBgBorderSrc}
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        })}
      />

      <Box position={"relative"} zIndex={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Gameplays
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          If you enjoy our server, or the plugin we make, and want to help
          contribute financially, we happily accept cryptocurrency donations!
        </Typography>

        <Swiper
          loop={true} // Enable looping
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={225} // Adds space between slides (left and right)
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 500,
            modifier: 1,
            slideShadows: true,
            scale: 1.2, // Scale up the active slide
          }}
          pagination={true}
          navigation={true} // Enable next/prev navigation arrows
          modules={[EffectCoverflow, Pagination, Navigation]} // Import Navigation module
          className="mySwiper"
        >
          {videoUrls.map((url, index) => (
            <SwiperSlide
              key={index}
              style={{
                borderWidth: "10px",
                borderStyle: "solid",
                borderImage: `url('${imageBgBorderSrc}') 30 round`,
              }}
            >
              <video
                width="75%"
                controls
                poster={videoThumbnails[index]} // Set the thumbnail (poster)
              >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default MediaSection;

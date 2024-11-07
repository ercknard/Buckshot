import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { ArrowBack, ArrowForward } from "@mui/icons-material"; // MUI icons for prev and next
import ReactPlayer from "react-player"; // Import react-player

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

const videoTitles = [
  "Epic Adventure Begins",
  "Thrilling Gameplay Moments",
  "Unforgettable Action Sequences",
  "Master the Game",
  "Victory Awaits",
];

const MediaSection: React.FC = () => {
  const { activeSet } = useThemeContext() as CustomTheme;
  const theme = useTheme();
  const swiperRef = useRef(null);

  // State to handle client-side rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true once the component has mounted on the client
  }, []);

  if (!isClient) {
    return null; // Prevent rendering until client-side hydration is complete
  }

  // Mapping for background images based on activeSet
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
        src="/static/images/BG-B.webp"
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.55,
        })}
      /> */}

      <Box
        component={"img"}
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
        src={imageBgBorderSrc}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <Box position={"relative"} zIndex={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Gameplays
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          Get ready for epic gameplay, awesome moments, and plenty of
          fun—let&apos;s dive in!
        </Typography>

        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={250}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={false}
          navigation={{
            prevEl: ".swiper-button-prev", // Custom prev button
            nextEl: ".swiper-button-next", // Custom next button
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="mySwiper"
          ref={swiperRef} // Pass the ref to the Swiper component
        >
          {videoUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%", // 16:9 Aspect Ratio (56.25%)
                  overflow: "hidden", // Ensure child doesn't overflow the container
                  borderRadius: 2, // Optional: rounded corners for aesthetics
                }}
              >
                <ReactPlayer
                  url={url}
                  width="100%"
                  height="100%"
                  controls
                  light={videoThumbnails[index]} // Show thumbnail before play
                  playing={false} // Do not autoplay by default
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                align="center"
                sx={{
                  marginTop: 1,
                  padding: 0.5,
                  bgcolor: "custom.primaryComponents",
                }}
              >
                {videoTitles[index]}
              </Typography>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <Box
          className="swiper-button-prev"
          sx={{
            position: "absolute",
            top: "58.25%",
            left: "10px",
            transform: "translateY(-50%)",
            zIndex: 3,
            borderRadius: "50%",
            boxShadow: 3,
          }}
        >
          <IconButton color="primary">
            <ArrowBack />
          </IconButton>
        </Box>

        <Box
          className="swiper-button-next"
          sx={{
            position: "absolute",
            top: "58.25%",
            right: "10px",
            transform: "translateY(-50%)",
            zIndex: 3,
            borderRadius: "50%",
            boxShadow: 3,
          }}
        >
          <IconButton color="primary">
            <ArrowForward fontSize={"small"} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MediaSection;

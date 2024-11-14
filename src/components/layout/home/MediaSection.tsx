import React, { useEffect, useState, useRef } from "react";
import { Alert, CircularProgress, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import ReactPlayer from "react-player"; // Import react-player
import supabase from "@/lib/supabase";

type CustomTheme = {
  activeSet: number;
};

interface Media {
  video_url: string;
  title: string;
  cover_image: string;
}

// const media: Media[] = [
//   {
//     video_url:
//       "https://firebasestorage.googleapis.com/v0/b/cryptech-3c327.appspot.com/o/CryptechTest_Teaser_final%20(1).mp4?alt=media&token=466d45d1-f730-4e0f-9b23-a24cc7dccc96",
//     title: "Part I: Epic Adventure Begins",
//     cover_image: "/static/images/bg-2.webp",
//   },
//   {
//     video_url:
//       "https://firebasestorage.googleapis.com/v0/b/cryptech-3c327.appspot.com/o/CryptechTest_Teaser_final%20(1).mp4?alt=media&token=466d45d1-f730-4e0f-9b23-a24cc7dccc96",
//     title: "Part II: Thrilling Gameplay Moments",
//     cover_image: "/static/images/bg-1.webp",
//   },
//   {
//     video_url:
//       "https://firebasestorage.googleapis.com/v0/b/cryptech-3c327.appspot.com/o/CryptechTest_Teaser_final%20(1).mp4?alt=media&token=466d45d1-f730-4e0f-9b23-a24cc7dccc96",
//     title: "Part III: Unforgettable Action Sequences",
//     cover_image: "/static/images/spaceship.webp",
//   },
//   {
//     video_url:
//       "https://firebasestorage.googleapis.com/v0/b/cryptech-3c327.appspot.com/o/CryptechTest_Teaser_final%20(1).mp4?alt=media&token=466d45d1-f730-4e0f-9b23-a24cc7dccc96",
//     title: "Part IV: Master the Game",
//     cover_image: "/static/images/bgse.png",
//   },
//   {
//     video_url:
//       "https://firebasestorage.googleapis.com/v0/b/cryptech-3c327.appspot.com/o/CryptechTest_Teaser_final%20(1).mp4?alt=media&token=466d45d1-f730-4e0f-9b23-a24cc7dccc96",
//     title: "Part V: Victory Awaits",
//     cover_image: "static/images/corridor-b.png",
//   },
// ];

const MediaSection: React.FC = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const { activeSet } = useThemeContext() as CustomTheme;
  const theme = useTheme();
  const swiperRef = useRef(null);

  // State to handle client-side rendering
  const [isClient, setIsClient] = useState(false);
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // Fetch slides from Supabase
        const { data, error } = await supabase
          .from("media") // Assuming "featuredmods" is your table name
          .select("*");

        if (error) throw error;

        setMedia(data); // Set the fetched slides data
      } catch (err) {
        setError("Error loading slides");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

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

  const colorSetCapsule: { [key: string]: string } = {
    1: "/static/images/blue-capsule.png",
    2: "/static/images/green-capsule.png",
    3: "/static/images/yellow-capsule.png",
    4: "/static/images/orange-capsule.png",
    5: "/static/images/pink-capsule.png",
  };

  const imageBgSrc = colorSetBgMap[activeSet.toString()] || colorSetBgMap[1];
  const imageBgCapsule =
    colorSetCapsule[activeSet.toString()] || colorSetCapsule[1];

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
      id="gameplay"
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
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.75,
          filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))", // Drop shadow applied
        }}
      />

      <Box position={"relative"} zIndex={2} padding={{ xs: 1, md: 0 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Gameplays
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          Get ready for epic gameplay, awesome moments, and plenty of
          fun—let&apos;s dive in!
        </Typography>

        {!isSmallScreen ? (
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
              depth: 250,
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
            ref={swiperRef}
            style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
          >
            {media.map((item, index) => (
              <SwiperSlide key={index} style={{ width: "35%" }}>
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
                    url={item.video_url}
                    width="100%"
                    height="100%"
                    controls
                    light={item.cover_image} // Show thumbnail before play
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
                  {item.title}
                </Typography>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
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
              depth: 250,
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
            ref={swiperRef}
            style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
          >
            {media.map((item, index) => (
              <SwiperSlide key={index} style={{ width: "90%" }}>
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
                    url={item.video_url}
                    width="100%"
                    height="100%"
                    controls
                    light={item.cover_image} // Show thumbnail before play
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
                  {item.title}
                </Typography>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
      {/* Custom Navigation Buttons */}
      <Box
        className="swiper-button-prev"
        sx={{
          position: "absolute",
          display: { md: "block", xs: "none" },
          top: "58.25%",
          left: "30%",
          transform: "translateY(-50%)",
          zIndex: 3,
          cursor: "pointer",
          color: "custom.primaryText",
        }}
      >
        {/* <IconButton>
            <Typography color="custom.secondaryText">
              <ArrowBack fontSize="large" />
            </Typography>
          </IconButton> */}
      </Box>

      <Box
        className="swiper-button-next"
        sx={{
          position: "absolute",
          display: { md: "block", xs: "none" },
          top: "58.25%",
          right: "30%",
          transform: "translateY(-50%)",
          zIndex: 3,
          cursor: "pointer",
          color: "custom.primaryText",
        }}
      >
        {/* <IconButton>
            <Typography color="custom.secondaryText">
              <ArrowForward fontSize="large" />
            </Typography>
          </IconButton> */}
      </Box>
    </Box>
  );
};

export default MediaSection;

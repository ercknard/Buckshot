import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import DefaultDialog from "../DefaultDialog";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import supabase from "@/lib/supabase";

type CustomTheme = {
  activeSet: number;
};

type Partners = {
  id: number;
  title: string;
  content: string;
  image: string;
};

const PartnersSection: React.FC = () => {
  const theme = useTheme();
  const { activeSet } = useThemeContext();
  const [partners, setPartners] = useState<Partners[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase.from("partners").select("*");

        if (error) throw error;

        setPartners(data);
      } catch (err) {
        setError("Error loading slides");
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
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
      id="partners"
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
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {partners.map((slide) => (
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
                  width={{ xs: "50%", md: "15%" }}
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
          ></Box>

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
          ></Box>
        </Swiper>
      </Container>
    </Box>
  );
};

export default PartnersSection;

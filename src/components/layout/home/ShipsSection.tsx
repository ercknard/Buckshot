import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Container,
  Tab,
  Tabs,
  Paper,
  Stack,
} from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import Particlesview from "../Particles";
import MainBorder from "../MainBorder";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Scrollbar } from "swiper/modules";

// Define the Ship type
type Ship = {
  id: number;
  title: string;
  content: string;
  image: string;
  image_size: string;
  ship_type: string;
};

const station: Ship[] = [
  {
    id: 1,
    title: "Orbital Station",
    content: "CryptechTest Spawn point",
    image: "/static/images/ship-2.png",
    image_size: "40%",
    ship_type: "Station",
  },
];

const scout: Ship[] = [
  {
    id: 1,
    title: "Scout",
    content: "CryptechTest Spawn point",
    image: "/static/images/scout.webp",
    image_size: "40%",
    ship_type: "Scout",
  },

  {
    id: 2,
    title: "Proto Scout",
    content: "CryptechTest Spawn point",
    image: "/static/images/scout.webp",
    image_size: "40%",
    ship_type: "Scout",
  },
];

const raider: Ship[] = [
  {
    id: 1,
    title: "Raider",
    content: "CryptechTest Spawn point",
    image: "/static/images/scout.webp",
    image_size: "40%",
    ship_type: "Raider",
  },
];

const battle: Ship[] = [
  {
    id: 1,
    title: "Small Battle",
    content: "CryptechTest Spawn point",
    image: "/static/images/scout.webp",
    image_size: "40%",
    ship_type: "Cruiser",
  },

  {
    id: 2,
    title: "Meduim Battle",
    content: "CryptechTest Spawn point",
    image: "/static/images/scout.webp",
    image_size: "40%",
    ship_type: "Cruiser",
  },

  {
    id: 3,
    title: "Large Battle",
    content: "CryptechTest Spawn point",
    image: "/static/images/scout.webp",
    image_size: "40%",
    ship_type: "Cruiser",
  },
];

const cargo: Ship[] = [
  {
    id: 1,
    title: "Cargo Cruiser",
    content: "CryptechTest Spawn point",
    image: "/static/images/scout.webp",
    image_size: "40%",
    ship_type: "Cruiser",
  },
];

const ShipsSection: React.FC = () => {
  const theme = useTheme();
  const { activeSet } = useThemeContext();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [expandedMember, setExpandedMember] = useState<Ship | null>(station[0]); // Default to first entry of station

  const colorSetBgBorderRight: { [key: string]: string } = {
    1: "/static/images/blue-border.png",
    2: "/static/images/green-border.png",
    3: "/static/images/yellow-border.png",
    4: "/static/images/orange-border.png",
    5: "/static/images/pink-border.png",
  };

  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];

  // Ship data mapping for each tab
  const tabShipData = [station, scout, raider, battle, cargo];

  // Handle tab change and set the first entry of the selected tab as the expanded member
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // Set the first member of the new tab as expanded member
    setExpandedMember(tabShipData[newValue][0]);
  };

  const handleCardClick = (member: Ship) => {
    setExpandedMember(member); // Set the clicked member as expanded
  };

  return (
    <Box
      id={"ships"}
      position={"relative"}
      width={1}
      left={0}
      sx={{
        padding: { md: "4", xs: "1" },
        backgroundColor: "custom.secondaryBackground",
        paddingTop: { md: "7.5rem", xs: "2.5rem" },
        paddingBottom: { md: "7.5rem", xs: "2.5rem" },
        minHeight: "75vh",
      }}
    >
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 1,
          pointerEvents: "none",
        })}
      >
        <Particlesview containerId="ships-particles" />
      </Box>

      <MainBorder />

      <Container
        sx={{
          justifyContent: { sm: "center", xs: "left" },
          marginX: "auto",
        }}
      >
        <Box position={"relative"} zIndex={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Starships
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            The Starships lets you build and fly customizable ships, exploring
            space and engaging in battles.
          </Typography>
        </Box>

        {expandedMember && (
          <>
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                minHeight: "35vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Typography
                variant="h1"
                sx={{
                  position: "absolute",
                  display: { md: "block", xs: "none" },
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: "1",
                  color: theme.palette.custom.primaryText,
                }}
              >
                {expandedMember.title}
              </Typography> */}
              <Box
                component="img"
                alt="Ship"
                src={expandedMember.image}
                sx={{
                  position: "absolute",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  zIndex: "2",
                  top: "5%",
                }}
              />
            </Box>
          </>
        )}

        <Tabs
          value={activeTab}
          onChange={handleTabChange} // Use handleTabChange
          sx={{
            marginTop: 2,
            marginBottom: 2,
            "& .MuiTabs-flexContainer": {
              color: "custom.secondaryText",
            },
            "& .MuiTab-root": {
              color: "custom.primaryTextGrayed",
            },
            "& .MuiTab-root.Mui-selected": {
              color: "custom.secondaryText",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "custom.secondaryText",
            },
          }}
        >
          <Tab label="Station" />
          <Tab label="Scout" />
          <Tab label="Raider" />
          <Tab label="Battle Cruiser" />
          <Tab label="Cargo Cruiser" />
        </Tabs>

        <Box position={"relative"} zIndex={2}>
          <Swiper
            spaceBetween={32} // Set space between each slide
            slidesPerView={5} // Automatically adjust the number of slides based on the container width
            loop={false} // Disable looping
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            scrollbar={{
              hide: false,
              draggable: true,
            }}
            modules={[Scrollbar]}
            breakpoints={{
              1024: {
                slidesPerView: 5, // For large screens (desktops)
              },
              768: {
                slidesPerView: 3, // For tablets (portrait mode)
              },
              480: {
                slidesPerView: 1, // For small screens (mobile devices)
              },
            }}
            style={{ paddingLeft: ".5rem", paddingRight: ".5rem" }}
          >
            {tabShipData[activeTab].map((member) => (
              <SwiperSlide
                key={member.id}
                style={{ paddingBottom: "1.5rem", paddingTop: ".5rem" }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    minHeight: "265px",
                    textAlign: "center",
                    backgroundColor:
                      expandedMember === member
                        ? "custom.secondaryComponents"
                        : "custom.secondaryBackground",
                    transition: "transform 0.2s, background-color 0.3s",
                    cursor: "pointer",
                    borderWidth: "10px", // Adjust the border width as per your preference
                    borderStyle: "solid",
                    borderImage: `url('${imageBgBorderSrc}') 30 round`, // Use an image as the border
                    "&:hover": {
                      transform: "scale(1.05)",
                      backgroundColor:
                        expandedMember === member
                          ? "custom.secondaryComponents"
                          : "custom.secondaryBackground",
                    },
                  }}
                  onClick={() => handleCardClick(member)}
                >
                  <Box
                    component="img"
                    src={member.image}
                    alt={`${member.title}`}
                    sx={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="body1" fontSize={"1.10rem"}>
                    {member.title}
                  </Typography>
                  <Typography variant="h5" sx={{ marginTop: 2 }}>
                    Type: {member.ship_type}
                  </Typography>
                </Paper>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>

      <style jsx global>
        {`
          /* Swiper scrollbar customizations */
          .swiper-scrollbar {
            background-color: ${theme.palette.custom
              .secondaryBackground}; /* Track background */
            border-radius: 10px; /* Rounded track edges */
            height: 8px; /* Scrollbar height */
          }

          .swiper-scrollbar-drag {
            background-color: ${theme.palette.custom
              .mainColor}; /* Thumb color */
            border-radius: 10px; /* Rounded thumb */
            opacity: 0.7; /* Thumb opacity */
          }

          .swiper-scrollbar-drag:hover {
            background-color: ${theme.palette.custom
              .secondarySolidColors}; /* Thumb color on hover */
          }
        `}
      </style>
    </Box>
  );
};

export default ShipsSection;

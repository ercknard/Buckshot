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
import MainBorder from "../MainBorder";
import { Swiper, SwiperSlide } from "swiper/react";
import { Divider, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Scrollbar } from "swiper/modules";

// Import the Supabase client
import supabase from "@/lib/supabase";

// Define the Ship type
type Ship = {
  id: number;
  title: string;
  content: string;
  image: string;
  image_size: string;
  ship_type: string;
  specs_1?: string;
  specs_2?: string;
  specs_3?: string;
  specs_4?: string;
  specs_5?: string;
  specs_6?: string;
};

const ShipsSection: React.FC = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const theme = useTheme();
  const { activeSet } = useThemeContext();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [expandedMember, setExpandedMember] = useState<Ship | null>(null); // Initially null
  const [shipData, setShipData] = useState<Ship[][]>([]); // Array to store ship data for each tab
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading

  const colorSetBgBorderRight: { [key: string]: string } = {
    1: "/static/images/blue-border.png",
    2: "/static/images/green-border.png",
    3: "/static/images/yellow-border.png",
    4: "/static/images/orange-border.png",
    5: "/static/images/pink-border.png",
  };

  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];

  // Fetch ship data from Supabase
  useEffect(() => {
    const fetchShipData = async () => {
      try {
        setLoading(true);

        // Fetch ship data for each category from Supabase
        const { data: battleShips, error: battleError } = await supabase
          .from("battle_ships") // Adjust table name based on your actual table in Supabase
          .select("*");
        if (battleError) throw battleError;

        const { data: cargoShips, error: cargoError } = await supabase
          .from("cargo_ships")
          .select("*");
        if (cargoError) throw cargoError;

        const { data: scoutShips, error: scoutError } = await supabase
          .from("scout_ships")
          .select("*");
        if (scoutError) throw scoutError;

        const { data: stationShips, error: stationError } = await supabase
          .from("station_ships")
          .select("*");
        if (stationError) throw stationError;

        const { data: raiderShips, error: raiderError } = await supabase
          .from("raider_ships")
          .select("*");
        if (raiderError) throw raiderError;

        // Combine all the data into one array
        setShipData([
          battleShips,
          cargoShips,
          scoutShips,
          stationShips,
          raiderShips,
        ]);
        setLoading(false);

        // Set the first ship from battle as the default expanded member
        setExpandedMember(battleShips[0]);
      } catch (error) {
        console.error("Error fetching ship data:", error);
        setLoading(false);
      }
    };

    fetchShipData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // Set the first member of the new tab as expanded member
    setExpandedMember(shipData[newValue][0]);
  };

  const handleCardClick = (member: Ship) => {
    setExpandedMember(member); // Set the clicked member as expanded
  };

  if (loading) {
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  }

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
      <MainBorder containerId="ships-particles" />

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
                display: "flex", // Enable flexbox
                flexDirection: "column", // Stack children vertically
                justifyContent: "center", // Vertically center the content
                alignItems: "center", // Horizontally center the content
              }}
            >
              <Box
                sx={{
                  position: { md: "absolute", xs: "relative" },
                  display: "flex", // Enable flexbox
                  flexDirection: "column", // Stack children vertically
                  marginTop: 5,
                  marginBottom: 5,
                  padding: 5,
                  transition: "transform 0.2s, background-color 0.3s",
                  backgroundColor: "custom.primaryComponents",
                  borderWidth: "10px", // Adjust the border width as per your preference
                  borderStyle: "solid",
                  borderImage: `url('${imageBgBorderSrc}') 30 round`, // Use an image as the border
                  left: { md: "10%", xs: "unset" },
                  zIndex: 3,
                }}
              >
                <Typography
                  variant="body1"
                  fontSize={"1.10rem"}
                  color="custom.primaryText"
                >
                  {expandedMember.title} Features :
                </Typography>
                <Typography
                  variant="h5"
                  textAlign="left"
                  sx={{ marginTop: 3 }}
                  color="custom.secondaryText"
                >
                  {expandedMember.specs_1}
                </Typography>
                <Typography
                  variant="h5"
                  textAlign="left"
                  sx={{ marginTop: 2 }}
                  color="custom.secondaryText"
                >
                  {expandedMember.specs_2}
                </Typography>
                <Typography
                  variant="h5"
                  textAlign="left"
                  sx={{ marginTop: 2 }}
                  color="custom.secondaryText"
                >
                  {expandedMember.specs_3}
                </Typography>
                <Typography
                  variant="h5"
                  textAlign="left"
                  sx={{ marginTop: 2 }}
                  color="custom.secondaryText"
                >
                  {expandedMember.specs_4}
                </Typography>
                <Typography
                  variant="h5"
                  textAlign="left"
                  sx={{ marginTop: 2 }}
                  color="custom.secondaryText"
                >
                  {expandedMember.specs_5}
                </Typography>
                <Typography
                  variant="h5"
                  textAlign="left"
                  sx={{ marginTop: 2 }}
                  color="custom.secondaryText"
                >
                  {expandedMember.specs_6}
                </Typography>
              </Box>
              <Box
                component="img"
                alt="Logo"
                src={expandedMember.image}
                sx={{
                  position: { md: "absolute", xs: "relative" },
                  maxWidth: "100%", // Ensure the image does not exceed the container width
                  maxHeight: "100%", // Optional: limit the height of the image if needed
                  zIndex: "2",
                  top: "5%",
                  right: { md: "10%", xs: "unset" },
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
          <Tab label="Battle Cruiser" />
          <Tab label="Cargo Cruiser" />
          <Tab label="Scout" />
          <Tab label="Orbital Station" />
          <Tab label="Raider" />
        </Tabs>

        <Box position={"relative"} zIndex={2}>
          <Swiper
            spaceBetween={32} // Set space between each slide
            slidesPerView={"auto"} // Automatically adjust the number of slides based on the container width
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
                slidesPerView: 2, // For small screens (mobile devices)
              },
            }}
            style={{ paddingLeft: ".5rem", paddingRight: ".5rem" }}
          >
            {shipData[activeTab].map((member) => (
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
    </Box>
  );
};

export default ShipsSection;

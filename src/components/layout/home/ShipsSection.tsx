import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import { Paper } from "@mui/material";
import { Stack } from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import MainBorder from "../MainBorder";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Divider } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Scrollbar } from "swiper/modules";
import supabase from "@/lib/supabase";

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
  const [expandedMember, setExpandedMember] = useState<Ship | null>(null);
  const [shipData, setShipData] = useState<Ship[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    const fetchShipData = async () => {
      try {
        setLoading(true);

        const { data: battleShips, error: battleError } = await supabase
          .from("ships_battle")
          .select("*");
        if (battleError) throw battleError;

        const { data: cargoShips, error: cargoError } = await supabase
          .from("ships_cargo")
          .select("*");
        if (cargoError) throw cargoError;

        const { data: scoutShips, error: scoutError } = await supabase
          .from("ships_scout")
          .select("*");
        if (scoutError) throw scoutError;

        const { data: stationShips, error: stationError } = await supabase
          .from("ships_station")
          .select("*");
        if (stationError) throw stationError;

        const { data: raiderShips, error: raiderError } = await supabase
          .from("ships_raider")
          .select("*");
        if (raiderError) throw raiderError;

        const { data: utilityShips, error: utilityError } = await supabase
          .from("ships_utility")
          .select("*");
        if (utilityError) throw utilityError;

        setShipData([
          battleShips,
          cargoShips,
          scoutShips,
          stationShips,
          raiderShips,
          utilityShips,
        ]);
        setLoading(false);

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
    setExpandedMember(shipData[newValue][0]);
  };

  const handleCardClick = (member: Ship) => {
    setExpandedMember(member);
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
        paddingTop: { md: "7.5rem", xs: "3rem" },
        paddingBottom: { md: "7.5rem", xs: "3rem" },
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
                minHeight: "40vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  position: { md: "absolute", xs: "relative" },
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 5,
                  marginBottom: 5,
                  padding: 5,
                  transition: "transform 0.2s, background-color 0.3s",
                  backgroundColor: "custom.primaryComponents",
                  borderWidth: "10px",
                  borderStyle: "solid",
                  borderImage: `url('${imageBgBorderSrc}') 30 round`,
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
                  maxWidth: "100%",
                  maxHeight: "100%",
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
          onChange={handleTabChange}
          sx={{
            overflowX: "auto",
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
          <Tab label="Utility" />
        </Tabs>

        <Box position={"relative"} zIndex={2}>
          <Swiper
            spaceBetween={32}
            slidesPerView={"auto"}
            loop={false}
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
                slidesPerView: 5,
              },
              768: {
                slidesPerView: 3,
              },
              480: {
                slidesPerView: 2,
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
                    borderWidth: "10px",
                    borderStyle: "solid",
                    borderImage: `url('${imageBgBorderSrc}') 30 round`,
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

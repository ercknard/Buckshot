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
import { keyframes } from "@emotion/react";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

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
  specs_7?: string;
  specs_8?: string;
  specs_9?: string;
  specs_10?: string;
  no_specs?: string;
  front_view?: string;
  back_view?: string;
  side_view?: string;
};

const jumpAnimation = keyframes`
  0%, 100% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const ShipsSection: React.FC = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const theme = useTheme();
  const { activeSet } = useThemeContext();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeTabShips, setActiveTabShips] = useState<number>(0);
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

  const handleTabChangeShips = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setActiveTabShips(newValue);
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
            <Box marginTop={3} justifyItems={"center"}>
              <Tabs
                value={activeTabShips}
                onChange={handleTabChangeShips}
                sx={{
                  overflowX: "auto",
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
                <Tab label="Model" />
                <Tab label="Ship Features" />
                <Tab label="Views" />
              </Tabs>
            </Box>
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
              {activeTabShips === 0 && (
                <>
                  <Box
                    component="img"
                    alt="Logo"
                    src={expandedMember.image}
                    width={{ xs: "100%", md: `${expandedMember.image_size}` }}
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      animation: `${jumpAnimation} 3s ease-in-out infinite`,
                    }}
                  />
                  {/* <Stack direction={"column"} spacing={1} marginBottom={4}>
                      <Typography
                        variant="body1"
                        fontSize={"1.75rem"}
                        color="custom.primaryText"
                      >
                        {expandedMember.title} {expandedMember.ship_type}
                      </Typography>
                      <Typography variant="h5" color="custom.secondaryText">
                        {expandedMember.content}
                      </Typography>
                    </Stack> */}
                </>
              )}

              {activeTabShips === 1 && (
                <Stack
                  direction={"column"}
                  spacing={1}
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontSize={"1.5rem"}
                    color="custom.primaryText"
                  >
                    {expandedMember.title} Features :
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.secondaryText"
                  >
                    {expandedMember.specs_1}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.secondaryText"
                  >
                    {expandedMember.specs_2}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.secondaryText"
                  >
                    {expandedMember.specs_3}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.secondaryText"
                  >
                    {expandedMember.specs_4}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.secondaryText"
                  >
                    {expandedMember.specs_5}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.secondaryText"
                  >
                    {expandedMember.specs_6}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.secondaryText"
                  >
                    {expandedMember.specs_7}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.secondaryText"
                  >
                    {expandedMember.specs_8}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.secondaryText"
                  >
                    {expandedMember.specs_9}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.secondaryText"
                  >
                    {expandedMember.specs_10}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.secondaryText"
                  >
                    {expandedMember.no_specs}
                  </Typography>
                </Stack>
              )}
              {activeTabShips === 2 && (
                <>
                  <Stack
                    direction={"column"}
                    spacing={1}
                    sx={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
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
                      <SwiperSlide>
                        <Box
                          component="img"
                          width={{
                            xs: "100%",
                            md: `${expandedMember.front_view}`,
                          }}
                          alt={expandedMember.title}
                          src={expandedMember.image}
                          marginX={"auto"}
                          sx={{
                            animation: `${jumpAnimation} 3s ease-in-out infinite`,
                          }}
                        />
                        <Stack direction={"column"} spacing={1}>
                          <Typography variant="h5" color="custom.secondaryText">
                            {expandedMember.title} Front View
                          </Typography>
                        </Stack>
                      </SwiperSlide>
                      <SwiperSlide>
                        <Box
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Box
                            component="img"
                            width={{
                              xs: "100%",
                              md: `${expandedMember.back_view}`,
                            }}
                            alt={expandedMember.title}
                            src={expandedMember.image}
                            marginX={"auto"}
                            sx={{
                              animation: `${jumpAnimation} 3s ease-in-out infinite`,
                            }}
                          />
                          <Stack direction={"column"} spacing={1}>
                            <Typography
                              variant="h5"
                              color="custom.secondaryText"
                            >
                              {expandedMember.title} Back View
                            </Typography>
                          </Stack>
                        </Box>
                      </SwiperSlide>
                      <SwiperSlide>
                        <Box
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Box
                            component="img"
                            width={{
                              xs: "100%",
                              md: `${expandedMember.side_view}`,
                            }}
                            alt={expandedMember.title}
                            src={expandedMember.image}
                            marginX={"auto"}
                            sx={{
                              animation: `${jumpAnimation} 3s ease-in-out infinite`,
                            }}
                          />
                          <Stack direction={"column"} spacing={1}>
                            <Typography
                              variant="h5"
                              color="custom.secondaryText"
                            >
                              {expandedMember.title} Side View
                            </Typography>
                          </Stack>
                        </Box>
                      </SwiperSlide>
                    </Swiper>
                  </Stack>
                </>
              )}
            </Box>
          </>
        )}

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            overflowX: "auto",
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
          <Tab label="Utility Ships" />
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
            {shipData[activeTab]
              .sort((a, b) => a.id - b.id)
              .map((member) => (
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

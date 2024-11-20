import React, { useState, useEffect } from "react";
import { Alert, Typography } from "@mui/material";
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
import CircularProgress from "@mui/material/CircularProgress";

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
  isshow?: string;
};

const jumpAnimation = keyframes`
  0%, 100% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const toOpacityAnimation = keyframes`
  0%, 100% {
   opacity: .5;
  }
  90% {
    opacity: 0;
  }
`;

const ShipsSection: React.FC = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const theme = useTheme();
  const { activeSet, soundsMode } = useThemeContext();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeTabShips, setActiveTabShips] = useState<number>(1);
  const [expandedMember, setExpandedMember] = useState<Ship | null>(null);
  const [shipData, setShipData] = useState<Ship[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isShipsVisible, setIsShipsVisible] = useState<boolean>(false);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound2, setClickSound2] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only load the sound when the component is mounted on the client side
    if (typeof window !== "undefined") {
      const sound = new Audio("/static/sounds/sounds_scifi_nodes_switch.ogg");
      setClickSound(sound);
      const sound2 = new Audio(
        "/static/sounds/sounds_scifi_nodes_palm_scanner.ogg"
      );
      setClickSound2(sound2);
    }
  }, []); // This useEffect will only run on the client side

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsShipsVisible(true); // "Team" section is in view
        } else {
          setIsShipsVisible(false); // "Team" section is out of view
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is in view
      }
    );

    const shipsSection = document.getElementById("ships");
    if (shipsSection) {
      observer.observe(shipsSection);
    }

    return () => {
      if (shipsSection) {
        observer.unobserve(shipsSection);
      }
    };
  }, []);

  const colorSetBgBorderRight: { [key: string]: string } = {
    1: "/static/images/blue-border.png",
    2: "/static/images/green-border.png",
    3: "/static/images/yellow-border.png",
    4: "/static/images/orange-border.png",
    5: "/static/images/pink-border.png",
  };

  const colorSetBgBanner: { [key: string]: string } = {
    1: "/static/images/blue-banner.png",
    2: "/static/images/green-banner.png",
    3: "/static/images/yellow-banner.png",
    4: "/static/images/orange-banner.png",
    5: "/static/images/pink-banner.png",
  };

  const colorSetBgCrack: { [key: string]: string } = {
    1: "/static/images/blue-crack.webp",
    2: "/static/images/green-crack.webp",
    3: "/static/images/yellow-crack.webp",
    4: "/static/images/orange-crack.webp",
    5: "/static/images/pink-crack.webp",
  };

  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];

  const imageBgBannerSrc =
    colorSetBgBanner[activeSet.toString()] || colorSetBgBanner[1];

  const imageBgCrackSrc =
    colorSetBgCrack[activeSet.toString()] || colorSetBgCrack[1];

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

        const defaultBattleShip = battleShips.find((ship) => ship.id === 1);

        // Set expandedMember to the entry with id: 1 or the first ship in the array if not found
        setExpandedMember(defaultBattleShip || battleShips[0]);
      } catch (error) {
        console.error("Error fetching ship data:", error);
        setError("Error fetching ship data.");
        setLoading(false);
      }
    };

    fetchShipData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);

    // Set the default entry with id: 1 when switching tabs
    const defaultMember = shipData[newValue].find((item) => item.id === 1);

    // If no entry with id 1 is found, fall back to the first item in the array
    setExpandedMember(defaultMember || shipData[newValue][0]);

    // Play the sound if it's loaded
    if (clickSound2 && soundsMode) {
      clickSound2.play();
    }
  };

  const handleTabChangeShips = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setActiveTabShips(newValue);
    // Play the sound if it's loaded
    if (clickSound2 && soundsMode) {
      clickSound2.play();
    }
  };

  const handleCardClick = (member: Ship) => {
    setExpandedMember(member);

    // Play the sound if it's loaded
    if (clickSound && soundsMode) {
      clickSound.play();
    }
  };

  if (loading) {
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
        <MainBorder containerId="ships-particles" isVisible={isShipsVisible} />

        <Container
          sx={{
            justifyContent: { sm: "center", xs: "left" },
            marginX: "auto",
          }}
        >
          <Box position={"relative"} zIndex={2}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              color="custom.secondaryTextGrayed"
            >
              Starships
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              color="custom.primaryTextGrayed"
            >
              The Starships lets you build and fly customizable ships, exploring
              space and engaging in battles.
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop={7.5}
            >
              <CircularProgress />
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
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
        }}
      >
        <MainBorder containerId="ships-particles" isVisible={isShipsVisible} />

        <Container
          sx={{
            justifyContent: { sm: "center", xs: "left" },
            marginX: "auto",
          }}
        >
          <Box position={"relative"} zIndex={2}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              color="custom.secondaryTextGrayed"
            >
              Starships
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              color="custom.primaryTextGrayed"
            >
              The Starships lets you build and fly customizable ships, exploring
              space and engaging in battles.
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop={7.5}
            >
              <Alert severity="error">{error}</Alert>
            </Box>
          </Box>
        </Container>
      </Box>
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
        backgroundColor: "custom.primaryBackground",
        paddingTop: { md: "7.5rem", xs: "3rem" },
        paddingBottom: { md: "7.5rem", xs: "3rem" },
        minHeight: "75vh",
      }}
    >
      <MainBorder containerId="ships-particles" isVisible={isShipsVisible} />

      <Container
        sx={{
          justifyContent: { sm: "center", xs: "left" },
          marginX: "auto",
        }}
      >
        <Box position={"relative"} zIndex={2}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            color="custom.secondaryTextGrayed"
          >
            Starships
          </Typography>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            color="custom.primaryTextGrayed"
          >
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
                minHeight: "38vh",
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
                    width={{
                      xs: "100%",
                      md: `${expandedMember.image_size}`,
                    }}
                    alt={expandedMember.title}
                    src={imageBgCrackSrc}
                    marginX={"auto"}
                    sx={{
                      position: "absolute",
                      animation: `${toOpacityAnimation} 3s ease-in-out infinite`,
                      top: "0",
                    }}
                  />
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
                  <Stack
                    direction={"column"}
                    spacing={1}
                    sx={{ marginBottom: "2rem" }}
                  >
                    <Typography variant="h5" color="custom.secondaryText">
                      {expandedMember.title} Model
                    </Typography>
                  </Stack>
                </>
              )}

              {activeTabShips === 1 && (
                <Stack
                  direction={"column"}
                  spacing={1.5}
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 4.5,
                    marginBottom: 4.5,
                    padding: 5,
                    transition: "transform 0.2s, background-color 0.3s",
                    backgroundColor: "custom.primaryComponents",
                    borderWidth: "10px",
                    borderStyle: "solid",
                    borderImage: `url('${imageBgBorderSrc}') 30 round`,
                    zIndex: 3,
                  }}
                >
                  <Typography
                    variant="body1"
                    fontSize={"1.25rem"}
                    color="custom.primaryText"
                  >
                    {expandedMember.title} Features
                  </Typography>

                  <Divider />

                  <Typography
                    variant="h5"
                    textAlign="center"
                    color="custom.primaryTextGrayed"
                  >
                    {expandedMember.no_specs}
                  </Typography>

                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.primaryTextGrayed"
                  >
                    {expandedMember.specs_1}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.primaryTextGrayed"
                  >
                    {expandedMember.specs_2}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.primaryTextGrayed"
                  >
                    {expandedMember.specs_3}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.primaryTextGrayed"
                  >
                    {expandedMember.specs_4}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.primaryTextGrayed"
                  >
                    {expandedMember.specs_5}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.primaryTextGrayed"
                  >
                    {expandedMember.specs_6}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.primaryTextGrayed"
                  >
                    {expandedMember.specs_7}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.primaryTextGrayed"
                  >
                    {expandedMember.specs_8}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.primaryTextGrayed"
                  >
                    {expandedMember.specs_9}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="left"
                    color="custom.primaryTextGrayed"
                  >
                    {expandedMember.specs_10}
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
                            md: `${expandedMember.image_size}`,
                          }}
                          alt={expandedMember.title}
                          src={expandedMember.front_view}
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
                              md: `${expandedMember.image_size}`,
                            }}
                            alt={expandedMember.title}
                            src={expandedMember.back_view}
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
                              md: `${expandedMember.image_size}`,
                            }}
                            alt={expandedMember.title}
                            src={expandedMember.side_view}
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
                  style={{
                    paddingBottom: "1.5rem",
                    paddingTop: ".5rem",
                    display: `${member.isshow}`,
                  }}
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
                        animation:
                          expandedMember === member
                            ? `${jumpAnimation} 3s ease-in-out infinite`
                            : `unset`,
                      }}
                    />
                    <Typography
                      variant="body1"
                      fontSize={"1.10rem"}
                      color="custom.secondaryTextGrayed"
                    >
                      {member.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ marginTop: 2 }}
                      color="custom.primaryTextGrayed"
                    >
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

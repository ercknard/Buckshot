import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import supabase from "@/lib/supabase";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from "@mui/material";

type CustomTheme = {
  activeSet: number;
  fancyMode: boolean;
  soundsMode: boolean;
};

interface Modes {
  id: number;
  name: string;
  ip: string;
  image: string;
  port: string;
  intro: string;
  bgs: string;
  isshow: string;
}

const GameModeSection: React.FC = () => {
  const theme = useTheme();
  const { activeSet, fancyMode, soundsMode } = useThemeContext() as CustomTheme;
  const [expandedMember, setExpandedMember] = useState<Modes | null>(null);
  const [modes, setModes] = useState<Modes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only load the sound when the component is mounted on the client side
    if (typeof window !== "undefined") {
      const sound = new Audio("/static/sounds/sounds_scifi_nodes_switch.ogg");
      setClickSound(sound);
    }
  }, []); // This useEffect will only run on the client side

  useEffect(() => {
    const fetchModes = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("test_gamemodes")
          .select("*");

        if (error) {
          setError("Error fetching gamemodes data.");
        } else {
          setModes(data);

          // Set the default expandedMember to the entry with id 1
          const defaultMode = data.find((mode) => mode.id === 1);
          if (defaultMode) {
            setExpandedMember(defaultMode);
          } else {
            // Optionally, handle case when no entry with id 1 is found
            setExpandedMember(data[0]); // fallback to the first entry
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchModes();
  }, []);

  const handleCardClick = (member: Modes) => {
    if (expandedMember === member) {
      return;
    }
    setExpandedMember(expandedMember === member ? null : member);
    // Play the sound if it's loaded
    if (clickSound && soundsMode) {
      clickSound.play();
    }
  };

  const colorSetCapsule: { [key: string]: string } = {
    1: "/static/images/blue-capsule.png",
    2: "/static/images/green-capsule.png",
    3: "/static/images/yellow-capsule.png",
    4: "/static/images/orange-capsule.png",
    5: "/static/images/pink-capsule.png",
  };

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

  const imageBgCapsule =
    colorSetCapsule[activeSet.toString()] || colorSetCapsule[1];
  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];
  const imageBgBannerSrc =
    colorSetBgBanner[activeSet.toString()] || colorSetBgBanner[1];

  if (loading) {
    return (
      <Box
        id="servers"
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
            zIndex: 1,
          })}
        />

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
              Game Servers
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              color="custom.primaryTextGrayed"
            >
              Explore a variety of exciting game modes on our servers, offering
              endless fun and diverse experiences for every type of gamer, from
              competitive challenges to casual adventures.
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
        id="servers"
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
            zIndex: 1,
          })}
        />

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
              Game Servers
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              color="custom.primaryTextGrayed"
            >
              Explore a variety of exciting game modes on our servers, offering
              endless fun and diverse experiences for every type of gamer, from
              competitive challenges to casual adventures.
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
      id="servers"
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
          opacity: 0.5,
          filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))",
          zIndex: 1,
        })}
      />

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
            Game Servers
          </Typography>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            color="custom.primaryTextGrayed"
          >
            Explore a variety of exciting game modes on our servers, offering
            endless fun and diverse experiences for every type of gamer, from
            competitive challenges to casual adventures.
          </Typography>
        </Box>

        {expandedMember && (
          <>
            {fancyMode ? (
              <Box
                component={"img"}
                alt="Logo"
                src={expandedMember.bgs}
                sx={(theme) => ({
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0.1,
                  filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))",
                })}
              />
            ) : (
              <></>
            )}

            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
                marginBottom: 5,
                padding: 5,
                transition: "transform 0.2s, background-color 0.3s",
                backgroundColor: "custom.secondaryBackground",
                borderWidth: "10px",
                borderStyle: "solid",
                borderImage: `url('${imageBgBorderSrc}') 30 round`,
              }}
            >
              <Box
                component="img"
                alt="Logo"
                src={expandedMember.bgs}
                sx={(theme) => ({
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.25,
                })}
              />

              <Box
                component="img"
                alt="Logo"
                src={imageBgBannerSrc}
                sx={(theme) => ({
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  opacity: 0.1,
                })}
              />

              <Box position="relative" zIndex={2} justifyItems="center">
                <Box
                  component="img"
                  alt="Logo"
                  src={expandedMember.image}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
                <Typography
                  fontSize={"1.5rem"}
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  color="custom.secondaryTextGrayed"
                >
                  {expandedMember.name}
                </Typography>

                <Typography
                  variant="h5"
                  fontSize={"1.5rem"}
                  sx={{ marginBottom: 2 }}
                  color="custom.primaryTextGrayed"
                >
                  {expandedMember.intro}
                </Typography>

                <Box
                  sx={{
                    padding: 1,
                    paddingX: 3,
                    backgroundColor: "custom.secondaryComponents",
                    borderRadius: "4px",
                  }}
                >
                  <Typography
                    variant="h5"
                    fontSize={{ md: "1.75rem", xs: "1.25rem" }}
                    color="custom.secondaryTextGrayed"
                  >
                    IP address: {expandedMember.ip}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    padding: 1,
                    paddingX: 3,
                    backgroundColor: "custom.secondaryComponents",
                    borderRadius: "4px",
                    marginTop: 1,
                  }}
                >
                  <Typography
                    variant="h5"
                    fontSize={{ md: "1.75rem", xs: "1.25rem" }}
                    color="custom.secondaryTextGrayed"
                  >
                    {expandedMember.name} port: {expandedMember.port}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        )}

        <Grid
          position={"relative"}
          zIndex={2}
          container
          spacing={{ md: 4, xs: 2 }}
          justifyContent="left"
        >
          {modes
            .sort((a, b) => a.id - b.id)
            .map((member) => (
              <Grid
                item
                xs={6}
                md={2.4}
                key={member.name}
                sx={{
                  marginBottom: "1.5rem",
                  marginTop: ".5rem",
                  display: `${member.isshow}`,
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    textAlign: "center",
                    justifyItems: "center",
                    transition: "transform 0.2s, background-color 0.3s",
                    cursor: expandedMember === member ? "pointer" : "pointer",
                    backgroundColor:
                      expandedMember === member
                        ? "custom.secondaryComponents"
                        : "custom.secondaryBackground",
                    borderWidth: "10px",
                    borderStyle: "solid",
                    borderImage: `url('${imageBgBorderSrc}') 30 round`,
                    "&:hover": {
                      transform:
                        expandedMember === member ? "none" : "scale(1.05)",
                      backgroundColor:
                        expandedMember === member
                          ? "custom.secondaryComponents"
                          : "custom.secondaryBackground",
                    },
                  }}
                  onClick={() => handleCardClick(member)}
                >
                  <Box
                    component={"img"}
                    src={member.image}
                    alt={`${member.name} - ${member.name}`}
                    sx={{
                      width: "50%",
                      height: "auto",
                    }}
                  />
                  <Typography
                    variant="body1"
                    fontSize={"1.10rem"}
                    sx={{ marginTop: 2 }}
                    color="custom.secondaryTextGrayed"
                  >
                    {member.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default GameModeSection;

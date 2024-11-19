import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Container from "@mui/material/Container";
import { useThemeContext } from "@/theme/themeProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import supabase from "@/lib/supabase";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperCore from "swiper";
import { Scrollbar } from "swiper/modules";
import { useTheme } from "@mui/material/styles";
import MainBorder from "../MainBorder";
import { keyframes } from "@emotion/react";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

type CustomTheme = {
  activeSet: number;
  soundsMode: boolean;
};

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  land: string;
  details: string;
  dcdetails: string;
  isshow: string;
}

const jumpAnimation = keyframes`
  0%, 100% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const glitchEffect = keyframes`
  0% {
    opacity: 1;
  }
  10% {
    opacity: 0.7;
  }
  20% {
    opacity: 0.6;
  }
  30% {
    opacity: 1;
  }
  40% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.5;
  }
  60% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
`;

const TeamSection: React.FC = () => {
  const { activeSet, soundsMode } = useThemeContext() as CustomTheme;
  const [activeTab, setActiveTab] = useState<number>(0);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamModerators, setTeamModerators] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const [isTeamVisible, setIsTeamVisible] = useState<boolean>(false);
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
          setIsTeamVisible(true); // "Team" section is in view
        } else {
          setIsTeamVisible(false); // "Team" section is out of view
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is in view
      }
    );

    const teamSection = document.getElementById("team");
    if (teamSection) {
      observer.observe(teamSection);
    }

    return () => {
      if (teamSection) {
        observer.unobserve(teamSection);
      }
    };
  }, []);

  const activeSetNumber =
    typeof activeSet === "number"
      ? activeSet
      : parseInt(activeSet as string, 10);
  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch team members with the role "Leads"
        const { data: members, error: membersError } = await supabase
          .from("team_members")
          .select("*")
          .eq("role", "Leads");

        if (membersError) {
          throw membersError;
        }

        // Fetch team moderators with roles "Moderator" or "Contributor"
        const { data: moderators, error: moderatorsError } = await supabase
          .from("team_moderators")
          .select("*")
          .in("role", ["Moderator", "Contributor"]);

        if (moderatorsError) {
          throw moderatorsError;
        }

        setTeamMembers(members);
        setTeamModerators(moderators);

        // Set the default expandedMember for members with id === 1, if exists
        const defaultMember = members.find((member) => member.id === 1);
        if (defaultMember) {
          setExpandedMember(defaultMember);
        } else if (members && members.length > 0) {
          setExpandedMember(members[0]); // fallback to the first member if no member with id === 1
        }

        // Set the default expandedMember for moderators with id === 1, if activeTab === 1
        if (activeTab === 1) {
          const defaultModerator = moderators.find(
            (moderator) => moderator.id === 1
          );
          if (defaultModerator) {
            setExpandedMember(defaultModerator);
          } else if (moderators && moderators.length > 0) {
            setExpandedMember(moderators[0]); // fallback to the first moderator if no moderator with id === 1
          }
        }
      } catch (err) {
        setError("Error fetching team data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []); // Add activeTab as a dependency if it changes dynamically

  const getDefaultMember = (activeSet: number) => {
    switch (activeSet) {
      case 1:
        return teamMembers[3];
      case 2:
        return teamMembers[2];
      case 3:
        return teamMembers[0];
      case 4:
        return teamMembers[4];
      case 5:
        return teamMembers[1];
      default:
        return teamMembers[2];
    }
  };

  const [expandedMember, setExpandedMember] = useState<TeamMember | null>(
    getDefaultMember(activeSetNumber)
  );

  useEffect(() => {
    setExpandedMember(getDefaultMember(activeSetNumber));
  }, [activeSetNumber]);

  const handleCardClick = (member: TeamMember) => {
    if (expandedMember === member) {
      return;
    }
    setExpandedMember(expandedMember === member ? null : member);
    // Play the sound if it's loaded
    if (clickSound && soundsMode) {
      clickSound.play();
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
    // Play the sound if it's loaded and sound mode is enabled
    if (clickSound2 && soundsMode) {
      clickSound2.play();
    }
  };

  const colorSetBgBorderRight: { [key: string]: string } = {
    1: "/static/images/blue-border.png",
    2: "/static/images/green-border.png",
    3: "/static/images/yellow-border.png",
    4: "/static/images/orange-border.png",
    5: "/static/images/pink-border.png",
  };

  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];

  SwiperCore.use([Scrollbar]);

  if (loading) {
    return (
      <Box
        id="team"
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
        <MainBorder containerId="teams-particles" isVisible={isTeamVisible} />

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
              CryptechTest Team
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              color="custom.primaryTextGrayed"
            >
              Meet the creative minds and skilled players who brought our game
              to life, each contributing their unique talents to create an
              unforgettable experience.
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
        id="team"
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
        <MainBorder containerId="teams-particles" isVisible={isTeamVisible} />

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
              CryptechTest Team
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              color="custom.primaryTextGrayed"
            >
              Meet the creative minds and skilled players who brought our game
              to life, each contributing their unique talents to create an
              unforgettable experience.
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
      id="team"
      position={"relative"}
      width={1}
      left={0}
      sx={{
        padding: { md: "4", xs: "1" },
        backgroundColor: "custom.primaryBackground",
        paddingTop: { md: "7.5rem", xs: "3rem" },
        paddingBottom: { md: "7.5rem", xs: "3rem" },
      }}
    >
      <MainBorder containerId="teams-particles" isVisible={isTeamVisible} />

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
            CryptechTest Team
          </Typography>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            color="custom.primaryTextGrayed"
          >
            Meet the creative minds and skilled players who brought our game to
            life, each contributing their unique talents to create an
            unforgettable experience.
          </Typography>
        </Box>

        <Box position={"relative"}>
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
                <Typography
                  variant="h1"
                  sx={(theme) => ({
                    position: "absolute",
                    display: { md: "block", xs: "none" },
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "1",
                    textWrap: "nowrap",
                    color: theme.palette.custom.primaryText,
                    animation: `${glitchEffect} 3s ease-in-out infinite`,
                  })}
                >
                  {expandedMember.name}
                </Typography>
                <Box
                  component="img"
                  alt="Logo"
                  src={expandedMember.land}
                  sx={{
                    position: "absolute",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    zIndex: "2",
                    top: "5%",
                    animation: `${jumpAnimation} 3s ease-in-out infinite`,
                  }}
                />
              </Box>

              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
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
                <Tab label="Leads" />
                <Tab label="Moderators" />
              </Tabs>
            </>
          )}

          {activeTab === 0 && (
            <Grid
              position={"relative"}
              zIndex={2}
              container
              spacing={{ md: 4, xs: 2 }}
              justifyContent="center"
              sx={{ paddingLeft: ".5rem", paddingRight: ".5rem" }}
            >
              {teamMembers
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
                        transition: "transform 0.2s, background-color 0.3s",
                        cursor:
                          expandedMember === member ? "pointer" : "pointer",
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
                        alt={`${member.name} - ${member.role}`}
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
                        fontSize={{ md: "1.10rem", xs: "1rem" }}
                        sx={{ marginTop: 2 }}
                        color="custom.secondaryTextGrayed"
                      >
                        {member.name}
                      </Typography>
                      <Typography variant="h5" color="custom.primaryTextGrayed">
                        {member.role}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          )}

          {activeTab === 1 && (
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
                    slidesPerView: 1,
                  },
                }}
                style={{ paddingLeft: ".5rem", paddingRight: ".5rem" }}
              >
                {teamModerators
                  .sort((a, b) => a.id - b.id)
                  .map((member) => (
                    <SwiperSlide
                      key={member.name}
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
                          component={"img"}
                          src={member.image}
                          alt={`${member.name} - ${member.role}`}
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
                          sx={{ marginTop: 2 }}
                          color="custom.secondaryTextGrayed"
                        >
                          {member.name}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="custom.primaryTextGrayed"
                        >
                          {member.role}
                        </Typography>
                      </Paper>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </Box>
          )}
        </Box>
      </Container>

      <style jsx global>
        {`
          .swiper-scrollbar {
            background-color: ${theme.palette.custom.secondaryBackground};
            border-radius: 10px;
            height: 8px;
          }

          .swiper-scrollbar-drag {
            background-color: ${theme.palette.custom.mainColor};
            border-radius: 10px;
            opacity: 0.7;
          }

          .swiper-scrollbar-drag:hover {
            background-color: ${theme.palette.custom.secondarySolidColors};
          }
        `}
      </style>
    </Box>
  );
};

export default TeamSection;

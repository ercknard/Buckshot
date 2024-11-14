import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Tab,
  Tabs,
  Container,
} from "@mui/material";
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

type CustomTheme = {
  activeSet: number;
};

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  land: string;
  details: string;
  dcdetails: string;
}

const TeamSection: React.FC = () => {
  const { activeSet } = useThemeContext() as CustomTheme;
  const [activeTab, setActiveTab] = useState<number>(0);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamModerators, setTeamModerators] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const activeSetNumber =
    typeof activeSet === "number"
      ? activeSet
      : parseInt(activeSet as string, 10);

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch data from Supabase for Team Members
        const { data: members, error: membersError } = await supabase
          .from("team_members") // Make sure this is the correct table name
          .select("*")
          .eq("role", "Leads"); // Filter for team members

        if (membersError) {
          throw membersError;
        }

        // Fetch data from Supabase for Team Moderators
        const { data: moderators, error: moderatorsError } = await supabase
          .from("team_moderators") // Same table for moderators as well, you could also create a separate table if needed
          .select("*")
          .in("role", ["Moderator", "Contributor"]); // Filter for moderators and contributors

        if (moderatorsError) {
          throw moderatorsError;
        }

        setTeamMembers(members);
        setTeamModerators(moderators);

        // Set default expanded member to the first team member
        if (members && members.length > 0) {
          setExpandedMember(members[0]); // Set the first member as default
        }

        // Optionally, you can set the first moderator as default expanded if moderators tab is active
        if (moderators && moderators.length > 0 && activeTab === 1) {
          setExpandedMember(moderators[0]); // Set the first moderator as default
        }
      } catch (err) {
        setError("Error fetching team data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const getDefaultMember = (activeSet: number) => {
    switch (activeSet) {
      case 1:
        return teamMembers[3]; // Example: Kyuhi for blue
      case 2:
        return teamMembers[2]; // Vanikoro for green
      case 3:
        return teamMembers[0]; // Squidicuz for yellow
      case 4:
        return teamMembers[4]; // Shikoku for orange
      case 5:
        return teamMembers[1]; // SeqSee for pink
      default:
        return teamMembers[2]; // Default to Vanikoro
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
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      id="team"
      position={"relative"}
      width={1}
      left={0}
      sx={{
        padding: { md: "4", xs: "1" },
        backgroundColor: "custom.secondaryBackground",
        paddingTop: { md: "7.5rem", xs: "2.5rem" },
        paddingBottom: { md: "7.5rem", xs: "2.5rem" },
      }}
    >
      <MainBorder containerId="teams-particles" />

      <Container
        sx={{
          justifyContent: { sm: "center", xs: "left" },
          marginX: "auto",
        }}
      >
        <Box position={"relative"} zIndex={2}>
          <Typography variant="h4" align="center" gutterBottom>
            CryptechTest Team
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Meet the creative minds and skilled players who brought our game to
            life, each contributing their unique talents to create an
            unforgettable experience.
          </Typography>
        </Box>

        <Box position={"relative"}>
          {/* Expanded Details Section */}
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
                <Typography
                  variant="h1"
                  sx={(theme) => ({
                    position: "absolute",
                    display: { md: "block", xs: "none" },
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)", // Centers the image
                    zIndex: "1",
                    textWrap: "nowrap",
                    color: theme.palette.custom.primaryText,
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
                    maxWidth: "100%", // Ensure the image does not exceed the container width
                    maxHeight: "100%", // Optional: limit the height of the image if needed
                    zIndex: "2",
                    top: "5%",
                  }}
                />
              </Box>

              <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                sx={{
                  marginBottom: 2,
                  "& .MuiTabs-flexContainer": {
                    color: "custom.secondaryText", // Set the default color for the tabs
                  },
                  "& .MuiTab-root": {
                    color: "custom.primaryTextGrayed", // Set the default color for unselected tabs
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "custom.secondaryText", // Set the color for the selected tab
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "custom.secondaryText", // Change the underline color for the active tab
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
              {teamMembers.map((member) => (
                <Grid
                  item
                  xs={6}
                  md={2.4}
                  key={member.name}
                  sx={{ marginBottom: "1.5rem", marginTop: ".5rem" }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 2,
                      textAlign: "center",
                      transition: "transform 0.2s, background-color 0.3s",
                      cursor: expandedMember === member ? "pointer" : "pointer", // Disable pointer cursor for active card
                      backgroundColor:
                        expandedMember === member
                          ? "custom.secondaryComponents"
                          : "custom.secondaryBackground",
                      borderWidth: "10px", // Adjust the border width as per your preference
                      borderStyle: "solid",
                      borderImage: `url('${imageBgBorderSrc}') 30 round`, // Use an image as the border
                      "&:hover": {
                        transform:
                          expandedMember === member ? "none" : "scale(1.05)", // Disable hover effect for active card
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
                      }}
                    />
                    <Typography
                      variant="body1"
                      fontSize={{ md: "1.10rem", xs: "1rem" }}
                      sx={{ marginTop: 2 }}
                    >
                      {member.name}
                    </Typography>
                    <Typography variant="h5">{member.role}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 1 && (
            <Box position={"relative"} zIndex={2}>
              <Swiper
                spaceBetween={32} // Space between slides
                slidesPerView={"auto"} // Show 5 slides at a time
                loop={false} // Enable looping of the slides
                autoplay={{
                  delay: 2500, // Autoplay delay (in ms)
                  disableOnInteraction: false, // Keep autoplay on after interaction
                }}
                scrollbar={{
                  hide: false, // Keep scrollbar visible
                  draggable: true, // Make the scrollbar draggable
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
                {teamModerators.map((member) => (
                  <SwiperSlide
                    key={member.name}
                    style={{ paddingBottom: "1.5rem", paddingTop: ".5rem" }}
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
                        component={"img"}
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        sx={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography
                        variant="body1"
                        fontSize={"1.10rem"}
                        sx={{ marginTop: 2 }}
                      >
                        {member.name}
                      </Typography>
                      <Typography variant="h5">{member.role}</Typography>
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

export default TeamSection;

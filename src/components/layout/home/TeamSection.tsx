import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, Button, Tab, Tabs } from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Default Swiper CSS
import "swiper/css/navigation"; // If you're using navigation
import "swiper/css/pagination"; // If you're using pagination
import "swiper/css/scrollbar";
import SwiperCore from "swiper"; // Import Scrollbar from SwiperCore
import { Scrollbar } from "swiper/modules";
import { useTheme } from "@mui/material/styles";

// Install the module in SwiperCore

type CustomTheme = {
  activeSet: number; // Adjust this based on your actual structure
};

interface TeamMember {
  name: string;
  role: string;
  image: string;
  land: string;
  details: string; // Additional details for the member
  dcdetails: string; // Additional details for the
}

const teamMembers: TeamMember[] = [
  {
    name: "Squidicuz",
    role: "Leads",
    image: "/static/images/yellow-head.webp",
    land: "/static/images/yellow-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : squidicuz",
  },
  {
    name: "SeqSee",
    role: "Leads",
    image: "/static/images/pink-head.webp",
    land: "/static/images/pink-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : SeqSee",
  },
  {
    name: "Vanikoro",
    role: "Leads",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : vanikoro",
  },
  {
    name: "Kyuhi",
    role: "Leads",
    image: "/static/images/blue-head.webp",
    land: "/static/images/blue-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : Kyuhi",
  },
  {
    name: "Shikoku",
    role: "Leads",
    image: "/static/images/orange-head.webp",
    land: "/static/images/orange-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : shikoku",
  },
];

const teamModerators: TeamMember[] = [
  {
    name: "ANormalStick",
    role: "Moderator",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : anormalstick",
  },
  {
    name: "Ferbog05",
    role: "Moderator",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : ferbog05",
  },
  {
    name: "Matador",
    role: "Moderator",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : matador",
  },
  {
    name: "Demil",
    role: "Moderator",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : demil",
  },
  {
    name: "DeathSmack",
    role: "Moderator",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : deathsmack",
  },
  {
    name: "ANormalTonic",
    role: "Contributor",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : anormaltonic",
  },
  {
    name: "Ercknard",
    role: "Contributor",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : ercknard",
  },
];

const TeamSection: React.FC = () => {
  const { activeSet } = useThemeContext() as CustomTheme;
  const [activeTab, setActiveTab] = useState<number>(0); // 0 for Team Members, 1 for Moderators
  const theme = useTheme();

  // Ensure activeSet is a number for comparison purposes
  const activeSetNumber =
    typeof activeSet === "number"
      ? activeSet
      : parseInt(activeSet as string, 10);

  // Log the activeSet value and type for debugging
  console.log(
    "Active Set:",
    activeSet,
    "Active Set (parsed):",
    activeSetNumber
  );

  // Function to determine default member based on active theme
  const getDefaultMember = (activeSet: number) => {
    console.log("Evaluating activeSet:", activeSet);
    switch (activeSet) {
      case 1:
        return teamMembers[3]; // Kyuhi for blue
      case 2:
        return teamMembers[2]; // Vanikoro for green
      case 3:
        return teamMembers[0]; // Squidicuz for yellow
      case 4:
        return teamMembers[4]; // Shikoku for orange
      case 5:
        return teamMembers[1]; // SeqSee for pink
      default:
        return teamMembers[2]; // Default to Vanikoro if no valid set is found
    }
  };

  const [expandedMember, setExpandedMember] = useState<TeamMember | null>(
    getDefaultMember(activeSetNumber)
  );

  const [showModerators, setShowModerators] = useState(false);

  // Whenever activeSet changes, update expandedMember to the corresponding team member
  useEffect(() => {
    setExpandedMember(getDefaultMember(activeSetNumber));
  }, [activeSetNumber]);

  const handleCardClick = (member: TeamMember) => {
    // Only toggle the expanded member if it is not the currently expanded member
    if (expandedMember === member) {
      return; // Disable click action if the card is already active
    }
    setExpandedMember(expandedMember === member ? null : member); // Toggle the expanded member
  };

  const colorSetBgBannerRight: { [key: string]: string } = {
    1: "/static/images/blue-banner.png",
    2: "/static/images/green-banner.png",
    3: "/static/images/yellow-banner.png",
    4: "/static/images/orange-banner.png",
    5: "/static/images/pink-banner.png",
  };

  const imageBgBannerSrc =
    colorSetBgBannerRight[activeSet.toString()] || colorSetBgBannerRight[1];

  SwiperCore.use([Scrollbar]);

  return (
    <Box
      position={"absolute"}
      width={1}
      left={0}
      sx={{
        padding: 4,
        backgroundColor: "custom.secondaryComponents",
        paddingTop: "10rem",
      }}
    >
      <Box
        component={"img"}
        src="/static/images/BG-B.webp"
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.55,
        })}
      />

      <Box
        component={"img"}
        src={imageBgBannerSrc}
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.75,
        })}
      />

      <Box
        sx={{
          maxWidth: "1280px !important",
          justifyContent: { sm: "center", xs: "left" },
          marginX: "auto",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Meet Our Team
        </Typography>

        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          centered
          sx={{
            marginTop: 2,
            "& .MuiTabs-flexContainer": {
              color: "custom.primaryText", // Set the color of the active Tab
            },
            "& .Mui-selected": {
              color: "custom.primaryText", // Customize the selected tab font color
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "custom.primaryText", // Change the underline color for the active tab
            },
          }}
        >
          <Tab label="Leads" sx={{ color: "custom.secondaryBorders" }} />
          <Tab label="Moderators" sx={{ color: "custom.secondaryBorders" }} />
        </Tabs>

        <Box position={"relative"}>
          {/* Expanded Details Section */}
          {expandedMember && (
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                minHeight: "40vh",
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
                }}
              />

              <Typography
                fontSize={"1.25rem"}
                color="textSecondary"
                sx={(theme) => ({
                  position: "absolute",
                  left: "50%",
                  bottom: "15%",
                  transform: "translate(-50%, -50%)", // Centers the image
                  zIndex: "3",
                  color: theme.palette.custom.secondaryText,
                  background: `linear-gradient(to right, transparent, ${theme.palette.custom.secondaryComponents}, ${theme.palette.custom.secondaryComponents} , ${theme.palette.custom.secondaryComponents}, ${theme.palette.custom.secondaryComponents}, transparent)`, // Linear gradient
                  paddingY: 1,
                  paddingX: 3,
                })}
              >
                {expandedMember.details}
              </Typography>

              <Typography
                fontSize={"1rem"}
                color="textSecondary"
                sx={(theme) => ({
                  position: "absolute",
                  left: "50%",
                  bottom: "10%",
                  transform: "translate(-50%, -50%)", // Centers the image
                  zIndex: "3",
                  color: theme.palette.custom.secondaryText,
                  paddingY: 1,
                  paddingX: 3,
                })}
              >
                {expandedMember.dcdetails}
              </Typography>
            </Box>
          )}
          {activeTab === 0 && (
            <Grid
              position={"relative"}
              zIndex={2}
              container
              spacing={3}
              justifyContent="center"
            >
              {teamMembers.map((member) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={2.4}
                  key={member.name}
                  sx={{ paddingBottom: "1.5rem", paddingTop: ".5rem" }}
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
                          ? "custom.secondarySolidColors"
                          : "custom.secondaryBackgroundGrayed", // Change color when active
                      borderWidth: "2.5px",
                      borderStyle: "solid",
                      borderColor:
                        expandedMember === member
                          ? "custom.primaryText"
                          : "custom.mainColor",
                      "&:hover": {
                        transform:
                          expandedMember === member ? "none" : "scale(1.05)", // Disable hover effect for active card
                        backgroundColor:
                          expandedMember === member
                            ? "custom.secondarySolidColors"
                            : "custom.primaryComponents", // Optional hover effect
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
                      fontSize={"1.25rem"}
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
            <Box>
              <Swiper
                spaceBetween={23} // Space between slides
                slidesPerView={5} // Show 5 slides at a time
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
                            ? "custom.secondarySolidColors"
                            : "custom.secondaryBackgroundGrayed",
                        transition: "transform 0.2s, background-color 0.3s",
                        cursor: "pointer",
                        borderWidth: "2.5px",
                        borderStyle: "solid",
                        borderColor:
                          expandedMember === member
                            ? "custom.primaryText"
                            : "custom.mainColor",
                        "&:hover": {
                          transform: "scale(1.05)",
                          backgroundColor:
                            expandedMember === member
                              ? "custom.secondarySolidColors"
                              : "custom.primaryComponents",
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
                        fontSize={"1.25rem"}
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
      </Box>

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

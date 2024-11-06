import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, Collapse, Button } from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";

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
    name: "Squidicuz",
    role: "Leads",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details:
      "John has over 10 years of experience in the industry and leads our team with vision and strategy.",
    dcdetails: "Discord : squidicuz",
  },
  {
    name: "SeqSee",
    role: "Leads",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details:
      "Jane is the brain behind our technology and oversees all tech developments.",
    dcdetails: "Discord : squidicuz",
  },
  {
    name: "Vanikoro",
    role: "Leads",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details:
      "Alice brings creativity and innovation to our projects, ensuring a great user experience.",
    dcdetails: "Discord : squidicuz",
  },
  {
    name: "Kyuhi",
    role: "Leads",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details:
      "Bob is a full-stack developer who loves turning ideas into reality through code.",
    dcdetails: "Discord : squidicuz",
  },
  {
    name: "Shikoku",
    role: "Leads",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details:
      "Bob is a full-stack developer who loves turning ideas into reality through code.",
    dcdetails: "Discord : squidicuz",
  },
  {
    name: "Shikoku",
    role: "Leads",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details:
      "Bob is a full-stack developer who loves turning ideas into reality through code.",
    dcdetails: "Discord : squidicuz",
  },
];

const TeamSection: React.FC = () => {
  const { activeSet } = useThemeContext() as CustomTheme;

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

          <Grid
            position={"relative"}
            zIndex={2}
            container
            spacing={3}
            justifyContent="center"
          >
            {teamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={2.4} key={member.name}>
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

          {/* Button to toggle collapse of moderators */}
          {/* <Button
            onClick={() => setShowModerators((prev) => !prev)}
            sx={{ marginTop: 2 }}
            variant="contained"
            color="primary"
          >
            {showModerators ? "Hide Moderators" : "Show Moderators"}
          </Button> */}

          {/* Collapsing section for moderators */}
          {/* <Collapse in={showModerators}>
            <Grid
              position={"relative"}
              zIndex={2}
              container
              spacing={3}
              justifyContent="center"
              marginTop={0.25}
            >
              {teamModerators.map((member) => (
                <Grid item xs={12} sm={6} md={2} key={member.name}>
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
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {member.role}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Collapse> */}
        </Box>
      </Box>
    </Box>
  );
};

export default TeamSection;

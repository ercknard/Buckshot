import React, { useEffect, useState } from "react";
import { Typography, Box, Container, Grid, Paper } from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type CustomTheme = {
  activeSet: number;
};

interface Modes {
  name: string;
  ip: string;
  image: string;
  port: string;
  intro: string; // Additional details for the member
  bgs: string;
}

const modes: Modes[] = [
  {
    name: "Main",
    ip: "cryptechtest.xyz",
    image: "/static/images/main-icon.png",
    port: "30000",
    intro:
      "Embark on a journey of creativity, collaboration, and adventure in our immersive world.",
    bgs: "/static/images/BG-B.webp",
  },
  {
    name: "Buckshot",
    ip: "cryptechtest.xyz",
    image: "/static/images/buckshot-icon.png",
    port: "n/a",
    intro: "coming soon!",
    bgs: "/static/images/earth.webp",
  },
  {
    name: "Minigames",
    ip: "cryptechtest.xyz",
    image: "/static/images/minigames-icon.png",
    port: "n/a",
    intro: "coming soon!",
    bgs: "/static/images/seq-house.webp",
  },
];

const GameModeSection: React.FC = () => {
  const theme = useTheme();
  const { activeSet } = useThemeContext();
  const [expandedMember, setExpandedMember] = useState<Modes | null>();

  useEffect(() => {
    // Set the first item as the default selected mode
    setExpandedMember(modes[0]);
  }, []);

  const handleCardClick = (member: Modes) => {
    // Only toggle the expanded member if it is not the currently expanded member
    if (expandedMember === member) {
      return; // Disable click action if the card is already active
    }
    setExpandedMember(expandedMember === member ? null : member); // Toggle the expanded member
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
        paddingTop: { md: "5rem", xs: "2.5rem" },
        paddingBottom: { md: "5rem", xs: "2.5rem" },
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
          filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))", // Drop shadow applied
          zIndex: 1,
        })}
      />

      {/* Container for Mods List */}
      <Container
        sx={{
          justifyContent: { sm: "center", xs: "left" },
          marginX: "auto",
        }}
      >
        <Box position={"relative"} zIndex={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Game Servers
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Explore a variety of exciting game modes on our servers, offering
            endless fun and diverse experiences for every type of gamer, from
            competitive challenges to casual adventures.
          </Typography>
        </Box>

        {expandedMember && (
          <>
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
                filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))", // Drop shadow applied
              })}
            />
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                display: "flex", // Enable flexbox
                flexDirection: "column", // Stack children vertically
                justifyContent: "center", // Vertically center the content
                alignItems: "center", // Horizontally center the content
                marginTop: 5,
                marginBottom: 5,
                padding: 5,
                transition: "transform 0.2s, background-color 0.3s",
                backgroundColor: "custom.secondaryBackground",
                borderWidth: "10px", // Adjust the border width as per your preference
                borderStyle: "solid",
                borderImage: `url('${imageBgBorderSrc}') 30 round`, // Use an image as the border
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
                  objectFit: "cover",
                  opacity: 0.5,
                })}
              />

              <Box position="relative" zIndex={2} justifyItems="center">
                <Box
                  component="img"
                  alt="Logo"
                  src={expandedMember.image}
                  sx={{
                    maxWidth: "100%", // Ensure the image does not exceed the container width
                    maxHeight: "100%", // Optional: limit the height of the image if needed
                  }}
                />
                <Typography
                  fontSize={"1.5rem"}
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  {expandedMember.name}
                </Typography>

                <Typography
                  variant="h5"
                  fontSize={"1.5rem"}
                  sx={{ marginBottom: 2 }}
                >
                  {expandedMember.intro}
                </Typography>

                <Box
                  sx={{
                    padding: 1,
                    backgroundColor: "custom.secondaryComponents",
                    borderRadius: "4px",
                  }}
                >
                  <Typography variant="h5" fontSize={"1.75rem"}>
                    IP address: {expandedMember.ip}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    padding: 1,
                    backgroundColor: "custom.secondaryComponents",
                    borderRadius: "4px",
                    marginTop: 1,
                  }}
                >
                  <Typography variant="h5" fontSize={"1.75rem"}>
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
          spacing={4}
          justifyContent="left"
        >
          {modes.map((member) => (
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
                  justifyItems: "center",
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
                  alt={`${member.name} - ${member.name}`}
                  sx={{
                    width: "65%",
                    height: "auto",
                  }}
                />
                <Typography
                  variant="body1"
                  fontSize={"1.10rem"}
                  sx={{ marginTop: 2 }}
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

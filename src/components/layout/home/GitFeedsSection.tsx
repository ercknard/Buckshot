import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import { fetchGitHubEvents, Event } from "@/pages/api/CryptechEventsApi";
import DefaultDialog from "../DefaultDialog";
import MainBorder from "../MainBorder";
import { Alert } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

type CustomTheme = {
  activeSet: number;
};

const GitFeedsSection: React.FC = () => {
  const theme = useTheme();
  const { activeSet } = useThemeContext();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isFeedsVisible, setIsFeedsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsFeedsVisible(true); // "Team" section is in view
        } else {
          setIsFeedsVisible(false); // "Team" section is out of view
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is in view
      }
    );

    const gitSection = document.getElementById("git");
    if (gitSection) {
      observer.observe(gitSection);
    }

    return () => {
      if (gitSection) {
        observer.unobserve(gitSection);
      }
    };
  }, []);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const eventsData = await fetchGitHubEvents();
        setEvents(eventsData);
      } catch (err) {
        setError("Failed to load events");
      }
      setLoading(false);
    };

    loadEvents();
  }, []);

  if (loading) {
    return (
      <Box
        id="git"
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
        <MainBorder containerId="github-particles" isVisible={isFeedsVisible} />

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
              Git Events
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              color="custom.primaryTextGrayed"
            >
              Stay updated with the latest Git events, including commits,
              merges, and branch updates of CryptechTest
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
        id="git"
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
        <MainBorder containerId="github-particles" isVisible={isFeedsVisible} />

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
              Git Events
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              color="custom.primaryTextGrayed"
            >
              Stay updated with the latest Git events, including commits,
              merges, and branch updates of CryptechTest
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

  const limitedEvents = events.slice(0, 6);
  const remainingEvents = events.slice(6);

  const colorSetBgBorderRight: { [key: string]: string } = {
    1: "/static/images/blue-border.png",
    2: "/static/images/green-border.png",
    3: "/static/images/yellow-border.png",
    4: "/static/images/orange-border.png",
    5: "/static/images/pink-border.png",
  };

  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  return (
    <Box
      id="git"
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
      <MainBorder containerId="github-particles" isVisible={isFeedsVisible} />

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
            Git Events
          </Typography>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            color="custom.primaryTextGrayed"
          >
            Stay updated with the latest Git events, including commits, merges,
            and branch updates of CryptechTest
          </Typography>
        </Box>

        <Grid container spacing={3} marginTop={"2.5rem"}>
          {limitedEvents.map((event) => (
            <Grid position={"relative"} item xs={12} sm={6} key={event.id}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  textAlign: "center",
                  transition: "transform 0.2s, background-color 0.3s",
                  backgroundColor: "custom.secondaryBackground",
                  borderWidth: "10px",
                  borderStyle: "solid",
                  borderImage: `url('${imageBgBorderSrc}') 30 round`,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  marginBottom={2}
                >
                  <Stack
                    direction={{ sm: "row", xs: "column" }}
                    spacing={1}
                    alignItems={"center"}
                    marginBottom={2}
                  >
                    <Box
                      component="img"
                      width={{ xs: 55 }}
                      alt="Logo"
                      src={event.actor.avatar_url}
                    />
                    <Typography variant="h5" color="custom.primaryTextGrayed">
                      {event.actor.display_login}
                    </Typography>
                  </Stack>
                  <Link
                    href={`https://github.com/${event.repo.name}/commit/${event.payload.commits[0].sha}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="h5"
                    color="custom.mainColor"
                  >
                    <ArrowOutwardIcon />
                  </Link>
                </Stack>

                <Stack
                  direction={{ md: "row", xs: "column" }}
                  spacing={1}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="custom.primaryText"
                  >
                    Event Type:
                  </Typography>
                  <Typography variant="h5" color="custom.primaryTextGrayed">
                    {event.type}
                  </Typography>
                </Stack>

                <Stack
                  direction={{ md: "row", xs: "column" }}
                  spacing={1}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="custom.primaryText"
                  >
                    Repository:
                  </Typography>
                  <Link
                    href={`https://github.com/${event.repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="h5"
                  >
                    {event.repo.name}
                  </Link>
                </Stack>

                {event.payload.commits && event.payload.commits.length > 0 ? (
                  <Stack
                    direction={{ md: "row", xs: "column" }}
                    spacing={1}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="custom.primaryText"
                    >
                      Commit Message:
                    </Typography>
                    <Typography variant="h5" color="custom.primaryTextGrayed">
                      {event.payload.commits[0].message.substring(0, 32)}
                      {event.payload.commits[0].message.length > 20 && "..."}
                    </Typography>
                  </Stack>
                ) : (
                  <Stack
                    direction={{ md: "row", xs: "column" }}
                    spacing={1}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="textSecondary"
                    >
                      No commit message
                    </Typography>
                    <Typography variant="h5" color="custom.primaryTextGrayed">
                      .
                    </Typography>
                  </Stack>
                )}

                <Stack
                  direction={{ md: "row", xs: "column" }}
                  spacing={1}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="custom.primaryText"
                  >
                    Created At:
                  </Typography>
                  <Typography variant="h5" color="custom.primaryTextGrayed">
                    {new Date(event.created_at).toLocaleString()}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {remainingEvents.length > 0 && (
          <Box display="flex" justifyContent="right" marginTop={3}>
            <Button variant="outlined" onClick={handleDialogOpen}>
              View More Events
            </Button>
          </Box>
        )}

        <DefaultDialog
          maxWidth="md"
          open={openDialog}
          handleOnClose={handleDialogClose}
          title="CryptechTest Git Events"
        >
          <Grid container spacing={4} padding={1} paddingTop={5}>
            {remainingEvents.map((event) => (
              <Grid item xs={12} key={event.id}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    textAlign: "center",
                    transition: "transform 0.2s, background-color 0.3s",
                    backgroundColor: "custom.secondaryBackground",
                    backgroundImage: "unset",
                    borderWidth: "10px",
                    borderStyle: "solid",
                    borderImage: `url('${imageBgBorderSrc}') 30 round`,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    marginBottom={2}
                  >
                    <Stack
                      direction={{ sm: "row", xs: "column" }}
                      spacing={1}
                      alignItems={"center"}
                      marginBottom={2}
                    >
                      <Box
                        component="img"
                        width={{ xs: 55 }}
                        alt="Logo"
                        src={event.actor.avatar_url}
                      />
                      <Typography variant="h5" color="custom.primaryTextGrayed">
                        {event.actor.display_login}
                      </Typography>
                    </Stack>
                    <Link
                      href={`https://github.com/${event.repo.name}/commit/${event.payload.commits[0].sha}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="h5"
                      color="custom.mainColor"
                    >
                      <ArrowOutwardIcon />
                    </Link>
                  </Stack>

                  <Stack
                    direction={{ sm: "row", xs: "column" }}
                    spacing={1}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="custom.primaryText"
                    >
                      Event Type:
                    </Typography>
                    <Typography variant="h5" color="custom.primaryTextGrayed">
                      {event.type}
                    </Typography>
                  </Stack>

                  <Stack
                    direction={{ sm: "row", xs: "column" }}
                    spacing={1}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="custom.primaryText"
                    >
                      Repository:
                    </Typography>
                    <Link
                      href={event.repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="h5"
                    >
                      {event.repo.name}
                    </Link>
                  </Stack>

                  {event.payload.commits && event.payload.commits.length > 0 ? (
                    <Stack
                      direction={{ sm: "row", xs: "column" }}
                      spacing={1}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="custom.primaryText"
                      >
                        Commit Message:
                      </Typography>
                      <Typography variant="h5" color="custom.primaryTextGrayed">
                        {event.payload.commits[0].message.substring(0, 32)}
                        {event.payload.commits[0].message.length > 20 && "..."}
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack
                      direction={{ sm: "row", xs: "column" }}
                      spacing={1}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="textSecondary"
                      >
                        No commit message
                      </Typography>
                      <Typography variant="h5" color="custom.primaryTextGrayed">
                        .
                      </Typography>
                    </Stack>
                  )}

                  <Stack
                    direction={{ sm: "row", xs: "column" }}
                    spacing={1}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="custom.primaryText"
                    >
                      Created At:
                    </Typography>
                    <Typography variant="h5" color="custom.primaryTextGrayed">
                      {new Date(event.created_at).toLocaleString()}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </DefaultDialog>
      </Container>
    </Box>
  );
};

export default GitFeedsSection;

import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  Container,
  Grid,
  Link,
  Stack,
  Button,
  DialogActions,
} from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import { fetchGitHubEvents, Event } from "@/pages/api/CryptechEventsApi";
import DefaultDialog from "../DefaultDialog";
import Particlesview from "../Particles";
import MainBorder from "../MainBorder";

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
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const limitedEvents = events.slice(0, 4);
  const remainingEvents = events.slice(4);

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
        backgroundColor: "custom.secondaryBackground",
        paddingTop: { md: "10rem", xs: "2.5rem" },
        paddingBottom: { md: "10rem", xs: "2.5rem" },
      }}
    >
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 1,
          pointerEvents: "none",
        })}
      >
        <Particlesview containerId="github-particles" />
      </Box>

      <MainBorder />

      <Container
        sx={{
          justifyContent: { sm: "center", xs: "left" },
          marginX: "auto",
        }}
      >
        <Box position={"relative"} zIndex={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Git Events
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Stay updated with the latest Git events, including commits, merges,
            and branch updates of CryptechTest
          </Typography>
        </Box>

        <Grid container spacing={3} marginTop={"2.5rem"}>
          {limitedEvents.map((event) => (
            <Grid position={"relative"} item xs={12} md={6} key={event.id}>
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
                  direction={{ md: "row", xs: "column" }}
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
                      {event.payload.commits[0].message}
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
                    direction={{ md: "row", xs: "column" }}
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
                        {event.payload.commits[0].message}
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

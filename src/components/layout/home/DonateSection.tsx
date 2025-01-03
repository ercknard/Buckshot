import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import MainBorder from "../MainBorder";
import supabase from "@/lib/supabase";
import { keyframes } from "@emotion/react";

const jumpAnimation = keyframes`
  0%, 100% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

type CustomTheme = {
  activeSet: number;
  soundsMode: boolean;
};

interface Coin {
  id: number;
  name: string;
  image: string;
  address: string;
  isshow: string;
}

const DonateSection: React.FC = () => {
  const { activeSet, soundsMode } = useThemeContext() as CustomTheme;
  const theme = useTheme();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [coin, setCoin] = useState<Coin[]>([]);
  const [expandedcoin, setExpandedcoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDonateVisible, setIsDonateVisible] = useState<boolean>(false);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only load the sound when the component is mounted on the client side
    if (typeof window !== "undefined") {
      const sound = new Audio("/static/sounds/sounds_scifi_nodes_switch.ogg");
      setClickSound(sound);
    }
  }, []); // This useEffect will only run on the client side

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsDonateVisible(true); // "Team" section is in view
        } else {
          setIsDonateVisible(false); // "Team" section is out of view
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is in view
      }
    );

    const donateSection = document.getElementById("donate");
    if (donateSection) {
      observer.observe(donateSection);
    }

    return () => {
      if (donateSection) {
        observer.unobserve(donateSection);
      }
    };
  }, []);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data, error } = await supabase.from("team_coins").select("*");

        if (error) throw error;

        setCoin(data);
        setExpandedcoin(data[0]);
      } catch (err) {
        setError("Error loading coins");
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, []);

  if (loading) {
    return (
      <Box
        id="donate"
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
        <MainBorder
          containerId="donate-particles"
          isVisible={isDonateVisible}
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
              Donate
            </Typography>

            <Typography
              variant="h5"
              align="center"
              gutterBottom
              color="custom.primaryTextGrayed"
            >
              If you enjoy our server, or the plugin we make, and want to help
              contribute financially, we happily accept cryptocurrency
              donations!
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
        id="donate"
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
        <MainBorder
          containerId="donate-particles"
          isVisible={isDonateVisible}
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
              Donate
            </Typography>

            <Typography
              variant="h5"
              align="center"
              gutterBottom
              color="custom.primaryTextGrayed"
            >
              If you enjoy our server, or the plugin we make, and want to help
              contribute financially, we happily accept cryptocurrency
              donations!
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

  const handleCardClick = (coin: Coin) => {
    if (expandedcoin === coin) {
      return;
    }
    setExpandedcoin(expandedcoin === coin ? null : coin);
    copyToClipboard(coin);
    // Play the sound if it's loaded
    if (clickSound && soundsMode) {
      clickSound.play();
    }
  };

  const copyToClipboard = (coin: Coin) => {
    navigator.clipboard
      .writeText(coin.address)
      .then(() => {
        setSnackbarMessage(`${coin.name} address copied to clipboard!`);
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy address: ", err);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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

  return (
    <Box
      id="donate"
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
      <MainBorder containerId="donate-particles" isVisible={isDonateVisible} />

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
            Donate
          </Typography>

          <Typography
            variant="h5"
            align="center"
            gutterBottom
            color="custom.primaryTextGrayed"
          >
            If you enjoy our server, or the plugin we make, and want to help
            contribute financially, we happily accept cryptocurrency donations!
          </Typography>
        </Box>

        <Box position={"relative"}>
          {expandedcoin && (
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                minHeight: "10vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                fontSize={"1.25rem"}
                color="textSecondary"
                sx={(theme) => ({
                  zIndex: "3",
                  color: theme.palette.custom.secondaryText,
                  paddingY: 1,
                  paddingX: 3,
                })}
              >
                {expandedcoin.name} Address
              </Typography>

              <Typography
                variant="h5"
                fontSize={"1.75rem"}
                color="textSecondary"
                sx={(theme) => ({
                  zIndex: "3",
                  color: theme.palette.custom.primaryTextGrayed,
                  paddingY: 1,
                  paddingX: 3,
                })}
              >
                {expandedcoin.address}
              </Typography>
            </Box>
          )}
          <Grid
            position={"relative"}
            zIndex={2}
            container
            spacing={3}
            rowSpacing={1}
            justifyContent="center"
          >
            {coin
              .sort((a, b) => a.id - b.id)
              .map((coin) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={2.4}
                  key={coin.name}
                  sx={{
                    marginBottom: "1.5rem",
                    marginTop: ".5rem",
                    display: `${coin.isshow}`,
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 2,
                      paddingY: 3.5,
                      textAlign: "center",
                      transition: "transform 0.2s, background-color 0.3s",
                      cursor: expandedcoin === coin ? "pointer" : "pointer",
                      backgroundColor:
                        expandedcoin === coin
                          ? "custom.secondaryComponents"
                          : "custom.secondaryBackground",
                      borderWidth: "10px",
                      borderStyle: "solid",
                      borderImage: `url('${imageBgBorderSrc}') 30 round`,
                      "&:hover": {
                        transform:
                          expandedcoin === coin ? "none" : "scale(1.05)",
                        backgroundColor:
                          expandedcoin === coin
                            ? "custom.secondaryComponents"
                            : "custom.secondaryBackground",
                      },
                    }}
                    onClick={() => handleCardClick(coin)}
                  >
                    <Box
                      component={"img"}
                      src={coin.image}
                      alt={`${coin.name} - ${coin.name}`}
                      sx={{
                        width: "25%",
                        height: "auto",
                        borderRadius: "50%",
                        display: "block",
                        margin: "0 auto",
                        animation:
                          expandedcoin === coin
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
                      {coin.name}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography variant="h5" color="custom.primaryText">
            {snackbarMessage}
          </Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DonateSection;

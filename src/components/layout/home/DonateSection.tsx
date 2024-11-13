import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import Particlesview from "../Particles";
import MainBorder from "../MainBorder";

type CustomTheme = {
  activeSet: number;
};

interface Coin {
  name: string;
  image: string;
  address: string;
}

const teamcoins: Coin[] = [
  {
    name: "BTC",
    image: "/static/images/bitcoin.webp",
    address: "36UHvrS9jX226kads9tdjgta3sq3RFGjZz",
  },
  {
    name: "Dash",
    image: "/static/images/dash-logo.webp",
    address: "XkS9v246S4U4mYo7RhVpyxQfv6G6o5kUfr",
  },
  {
    name: "Doge",
    image: "/static/images/dogecoin.webp",
    address: "DBFKW511txib9237kBeFt5GcSYPKWcnoGc",
  },
  {
    name: "ETC",
    image: "/static/images/etc.webp",
    address: "0x122e3F3877fEDEC646A7891cB779c9F8583cE237",
  },
  {
    name: "ETH",
    image: "/static/images/ethereum.webp",
    address: "0x1914062c4e5aFe8B4Aaa2b9e46ef4F99F61606C0",
  },
  {
    name: "LTC",
    image: "/static/images/litecoin.webp",
    address: "MUxtfEzoHeqVf7EwjdzEVoCbnWPRwk9NSd",
  },
  {
    name: "MRX",
    image: "/static/images/metrix-coin.webp",
    address: "MRAZUn5azvVBTVCSFi6y7xyWAhMCcNN3AB",
  },
  {
    name: "NameCoin",
    image: "/static/images/namecoin.webp",
    address: "NB5rTVYfApfe7GfdaMmUra8PpusJqkoyuu",
  },
  {
    name: "OHM",
    image: "/static/images/ohm.webp",
    address: "ZK3WpPRBsoboHoemJeiGbnJEuCwQYUqB4q",
  },
  {
    name: "Zcash",
    image: "/static/images/zcash.webp",
    address: "t1RCU5Sbaj15EiA2sVVZQZLAsffGW1m1WAt",
  },
  {
    name: "SCC",
    image: "/static/images/scc.webp",
    address: "sMZ8CXDDkPqFrm8W7A1rXhsW1zRrfekJMY",
  },
];

const DonateSection: React.FC = () => {
  const { activeSet } = useThemeContext() as CustomTheme;
  const theme = useTheme();

  const [expandedcoin, setExpandedcoin] = useState<Coin | null>(teamcoins[0]); // Set the first coin as default
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message content

  const handleCardClick = (coin: Coin) => {
    // Only toggle the expanded coin if it is not the currently expanded coin
    if (expandedcoin === coin) {
      return; // Disable click action if the card is already active
    }
    setExpandedcoin(expandedcoin === coin ? null : coin); // Toggle the expanded coin
    copyToClipboard(coin); // Pass the whole coin object to copy the address and name
  };

  const copyToClipboard = (coin: Coin) => {
    // Use the clipboard API to copy the text
    navigator.clipboard
      .writeText(coin.address)
      .then(() => {
        setSnackbarMessage(`${coin.name} address copied to clipboard!`); // Include coin name in the Snackbar message
        setSnackbarOpen(true); // Open Snackbar
      })
      .catch((err) => {
        console.error("Failed to copy address: ", err);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); // Close Snackbar when it times out or is manually closed
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
        backgroundColor: "custom.secondaryBackground",
        paddingTop: { md: "7.5rem", xs: "2.5rem" },
        paddingBottom: { md: "7.5rem", xs: "2.5rem" },
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
        <Particlesview containerId="donate-particles" />
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
            Donate
          </Typography>

          <Typography variant="h5" align="center" gutterBottom>
            If you enjoy our server, or the plugin we make, and want to help
            contribute financially, we happily accept cryptocurrency donations!
          </Typography>
        </Box>

        <Box position={"relative"}>
          {/* Expanded Details Section */}
          {expandedcoin && (
            <>
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  minHeight: "10vh",
                  display: "flex", // Enable flexbox
                  flexDirection: "column", // Stack children vertically
                  justifyContent: "center", // Vertically center the content
                  alignItems: "center", // Horizontally center the content
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
            </>
          )}
          <Grid
            position={"relative"}
            zIndex={2}
            container
            spacing={3}
            rowSpacing={1}
            justifyContent="center"
          >
            {teamcoins.map((coin) => (
              <Grid
                item
                xs={6}
                md={2.4}
                key={coin.name}
                sx={{ marginBottom: "1.5rem", marginTop: ".5rem" }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    paddingY: 3.5,
                    textAlign: "center",
                    transition: "transform 0.2s, background-color 0.3s",
                    cursor: expandedcoin === coin ? "pointer" : "pointer", // Disable pointer cursor for active card
                    backgroundColor:
                      expandedcoin === coin
                        ? "custom.secondaryComponents"
                        : "custom.secondaryBackground",
                    borderWidth: "10px", // Adjust the border width as per your preference
                    borderStyle: "solid",
                    borderImage: `url('${imageBgBorderSrc}') 30 round`, // Use an image as the border
                    "&:hover": {
                      transform: expandedcoin === coin ? "none" : "scale(1.05)", // Disable hover effect for active card
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
                      display: "block", // Ensures the element behaves as a block-level element
                      margin: "0 auto", // Horizontally centers the image
                    }}
                  />
                  <Typography
                    variant="body1"
                    fontSize={"1.10rem"}
                    sx={{ marginTop: 2 }}
                  >
                    {coin.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Snackbar for copied address message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // The Snackbar will disappear after 3 seconds
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage} {/* The message now includes the coin name */}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DonateSection;

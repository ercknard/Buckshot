import React from "react";
import { Typography, Box, Container } from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import Particlesview from "../Particles";
import MainBorder from "../MainBorder";

type CustomTheme = {
  activeSet: number;
};

const ShipsSection: React.FC = () => {
  const theme = useTheme();
  const { activeSet } = useThemeContext();

  return (
    <Box
      id={"ships"}
      position={"relative"}
      width={1}
      left={0}
      sx={{
        padding: { md: "4", xs: "1" },
        backgroundColor: "custom.secondaryBackground",
        paddingTop: { md: "7.5rem", xs: "2.5rem" },
        paddingBottom: { md: "7.5rem", xs: "2.5rem" },
        minHeight: "75vh",
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
        <Particlesview containerId="ships-particles" />
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
            Starships
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Stay updated with the latest Git events, including commits, merges,
            and branch updates of CryptechTest
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ShipsSection;

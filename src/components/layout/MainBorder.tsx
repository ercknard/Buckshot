import React from "react";
import { Box } from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import Particlesview from "./Particles";
import { keyframes } from "@emotion/react";

// Define the type for props
interface MainBorderProps {
  containerId: string;
}

type CustomTheme = {
  activeSet: number;
  fancyMode: boolean; // Add fancyMode here
};

const throwIntoSpace = keyframes`
  0% {
    left: -30vw;
    transform: rotate(0deg) translateY(-100px);
    opacity: 0;
  }

  15% {
    opacity: 0;
  }

  25% {
    opacity: 100%;
  }

  50% {
    transform: rotate(360deg) translateY(75px);
  }

  75%{
    opacity: 100%;
  }

  100% {
    left: 100vw;
    transform: rotate(0deg) translateY(35px);
        opacity: 0;
  }
`;

const MainBorder: React.FC<MainBorderProps> = ({ containerId }) => {
  const { activeSet, fancyMode } = useThemeContext() as CustomTheme;
  const theme = useTheme();

  const colorSetBgMap: { [key: string]: string } = {
    1: "/static/images/blue-gate.webp",
    2: "/static/images/green-gate.webp",
    3: "/static/images/yellow-gate.webp",
    4: "/static/images/orange-gate.webp",
    5: "/static/images/pink-gate.webp",
  };

  const colorSetBgBorderRight: { [key: string]: string } = {
    1: "/static/images/blue-border.png",
    2: "/static/images/green-border.png",
    3: "/static/images/yellow-border.png",
    4: "/static/images/orange-border.png",
    5: "/static/images/pink-border.png",
  };

  const colorSetBgBorderDark: { [key: string]: string } = {
    1: "/static/images/blue-border-dark.png",
    2: "/static/images/green-border-dark.png",
    3: "/static/images/yellow-border-dark.png",
    4: "/static/images/orange-border-dark.png",
    5: "/static/images/pink-border-dark.png",
  };

  const colorSetBgMapland: { [key: string]: string } = {
    1: "/static/images/blue-land.webp",
    2: "/static/images/green-land.webp",
    3: "/static/images/yellow-land.webp",
    4: "/static/images/orange-land.webp",
    5: "/static/images/pink-land.webp",
  };

  const imageBgSrc = colorSetBgMap[activeSet.toString()] || colorSetBgMap[1];
  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];
  const imageBgBorderDarkSrc =
    colorSetBgBorderDark[activeSet.toString()] || colorSetBgBorderDark[1];
  const imageBgSrcland =
    colorSetBgMapland[activeSet.toString()] || colorSetBgMapland[1];

  if (!fancyMode) {
    return null; // Or return an empty Box or null if you don't want to render anything
  }

  return (
    <Box>
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.5,
          pointerEvents: "none",
        })}
      >
        {/* Pass the containerId prop to Particlesview */}
        <Particlesview containerId={containerId} />
      </Box>
      <Box
        component={"img"}
        alt="Logo"
        src={imageBgSrc}
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.05,
          objectFit: "cover",
        })}
      />

      <Box
        component={"img"}
        alt="Logo"
        src={imageBgBorderDarkSrc}
        sx={(theme) => ({
          position: "absolute",
          display: { md: "block", xs: "none" },
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        })}
      />

      <Box
        component={"img"}
        alt="Logo"
        src={imageBgSrcland}
        sx={(theme) => ({
          position: "absolute",
          display: { md: "block", xs: "none" },
          left: 0,
          top: "30%", // Vertically center
          transform: "translateY(-50%)", // Adjust to make sure it’s perfectly centered
          width: "10rem",
          animation: `${throwIntoSpace} 5s ease-out infinite` /* Apply the animation */,
        })}
      />

      <Box
        component={"img"}
        alt="Logo"
        src={imageBgBorderSrc}
        sx={(theme) => ({
          position: "absolute",
          display: { md: "block", xs: "none" },
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: ".5",
        })}
      />
    </Box>
  );
};

export default MainBorder;

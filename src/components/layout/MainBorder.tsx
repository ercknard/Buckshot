import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { useTheme } from "@mui/material/styles";
import Particlesview from "./Particles";
import { keyframes } from "@emotion/react";
import supabase from "@/lib/supabase";

// Define the type for props
interface MainBorderProps {
  containerId: string;
}

type CustomTheme = {
  activeSet: number;
  fancyMode: boolean; // Add fancyMode here
};

type UiBoolean = {
  image_background: string;
  image_doll: string;
  image_banner: string;
  image_darkborder: string;
  image_lightborder: string;
  particles_view: string;
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
  const [uiBoolean, setUiBoolean] = useState<UiBoolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [leftVisible, setLeftVisible] = useState<boolean>(true); // Track left section visibility
  const [rightVisible, setRightVisible] = useState<boolean>(true); // Track right section visibility
  const theme = useTheme();

  useEffect(() => {
    const fetchUiBoolean = async () => {
      try {
        const { data, error } = await supabase
          .from("ui_boolean")
          .select("*")
          .single(); // Assuming you only need a single object

        if (error) throw error;

        setUiBoolean(data);
      } catch (err) {
        setError("Error loading UI settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchUiBoolean();
  }, []);

  if (!fancyMode || loading || error || !uiBoolean) {
    return null; // Do not render anything if fancyMode is off or data is not loaded
  }

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

  const colorSetBgBanner: { [key: string]: string } = {
    1: "/static/images/blue-banner.png",
    2: "/static/images/green-banner.png",
    3: "/static/images/yellow-banner.png",
    4: "/static/images/orange-banner.png",
    5: "/static/images/pink-banner.png",
  };

  const colorSetFrameMap: { [key: string]: string } = {
    1: "/static/images/blue-frame.png",
    2: "/static/images/green-frame.png",
    3: "/static/images/yellow-frame.png",
    4: "/static/images/orange-frame.png",
    5: "/static/images/pink-frame.png",
  };

  const colorSetBgMapLeft: { [key: string]: string } = {
    1: "/static/images/blue-gate-l.webp",
    2: "/static/images/green-gate-l.webp",
    3: "/static/images/yellow-gate-l.webp",
    4: "/static/images/orange-gate-l.webp",
    5: "/static/images/pink-gate-l.webp",
  };

  const colorSetBgMapRight: { [key: string]: string } = {
    1: "/static/images/blue-gate-r.webp",
    2: "/static/images/green-gate-r.webp",
    3: "/static/images/yellow-gate-r.webp",
    4: "/static/images/orange-gate-r.webp",
    5: "/static/images/pink-gate-r.webp",
  };

  const imageBgSrc = colorSetBgMap[activeSet.toString()] || colorSetBgMap[1];
  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];
  const imageBgBorderDarkSrc =
    colorSetBgBorderDark[activeSet.toString()] || colorSetBgBorderDark[1];
  const imageBgSrcland =
    colorSetBgMapland[activeSet.toString()] || colorSetBgMapland[1];
  const imageBgBannerSrc =
    colorSetBgBanner[activeSet.toString()] || colorSetBgBanner[1];

  const imageFrameSrc =
    colorSetFrameMap[activeSet.toString()] || colorSetFrameMap[1];

  const imageBgLeftSrc =
    colorSetBgMapLeft[activeSet.toString()] || colorSetBgMapLeft[1];

  const imageBgRightSrc =
    colorSetBgMapRight[activeSet.toString()] || colorSetBgMapRight[1];

  const handleLeftClick = () => setLeftVisible((prev) => !prev); // Toggle visibility of left section
  const handleRightClick = () => setRightVisible((prev) => !prev); // Toggle visibility of right section

  return (
    <Box>
      {/* Left Section */}
      {fancyMode && (
        <Box
          onClick={handleLeftClick}
          sx={(theme) => ({
            position: "absolute",
            display: { md: `${uiBoolean.image_banner}`, xs: "none" },
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            zIndex: "5",
            overflow: "hidden",
            transform: leftVisible ? "translateX(-98%)" : "translateX(0)", // Slide in/out
            transition: "transform 1s ease", // Apply smooth sliding animation
            cursor: "pointer",
          })}
        >
          <Box
            component="img"
            alt="Logo"
            src={imageFrameSrc}
            sx={(theme) => ({
              position: "absolute",
              width: "100%",
              height: "100%",
              border: `.5rem solid ${theme.palette.custom.primaryBorders}`,
              zIndex: "3",
            })}
          />

          <Box
            component="img"
            alt="Logo"
            src={imageBgLeftSrc}
            sx={(theme) => ({
              position: "absolute",
              width: "100%",
              height: "100%",
              border: `.5rem solid ${theme.palette.custom.primaryBorders}`,
              zIndex: "1",
              objectFit: "cover",
            })}
          />

          <Box
            bgcolor={"#121212"}
            sx={(theme) => ({
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: "2",
              opacity: ".5",
              border: `.5rem solid ${theme.palette.custom.primaryBorders}`,
            })}
          />

          {/* <Box
            component="img"
            alt="Banner"
            src={imageBgBannerSrc}
            sx={{
              position: "absolute",
              display: { md: `${uiBoolean.image_banner}`, xs: "none" },
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.5,
              objectFit: "cover",
              zIndex: "2",
              transform: "scaleX(-1)",
            }}
          /> */}
        </Box>
      )}

      {/* Right Section */}
      {fancyMode && (
        <Box
          onClick={handleRightClick}
          sx={(theme) => ({
            position: "absolute",
            display: { md: `${uiBoolean.image_banner}`, xs: "none" },
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            zIndex: "5",
            overflow: "hidden",
            transform: rightVisible ? "translateX(98%)" : "translateX(0)", // Slide in/out
            transition: "transform 1s ease", // Apply smooth sliding animation
            cursor: "pointer",
          })}
        >
          <Box
            component="img"
            alt="Logo"
            src={imageFrameSrc}
            sx={(theme) => ({
              position: "absolute",
              width: "100%",
              height: "100%",
              border: `.5rem solid ${theme.palette.custom.primaryBorders}`,
              zIndex: "3",
            })}
          />

          <Box
            component="img"
            alt="Logo"
            src={imageBgRightSrc}
            sx={(theme) => ({
              position: "absolute",
              width: "100%",
              height: "100%",
              border: `.5rem solid ${theme.palette.custom.primaryBorders}`,
              zIndex: "1",
              objectFit: "cover",
            })}
          />

          <Box
            bgcolor={"#121212"}
            sx={(theme) => ({
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: "2",
              opacity: ".5",
              border: `.5rem solid ${theme.palette.custom.primaryBorders}`,
            })}
          />
          {/* 
          <Box
            component="img"
            alt="Banner"
            src={imageBgBannerSrc}
            sx={{
              position: "absolute",
              display: { md: `${uiBoolean.image_banner}`, xs: "none" },
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.5,
              objectFit: "cover",
              zIndex: "2",
            }}
          /> */}
        </Box>
      )}

      {/* Particles and other content */}
      <Box
        sx={{
          position: "absolute",
          display: `${uiBoolean.particles_view}`,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      >
        {/* Pass the containerId prop to Particlesview */}
        <Particlesview containerId={containerId} />
      </Box>

      <Box
        component="img"
        alt="Background"
        src={imageBgSrc}
        sx={{
          position: "absolute",
          display: `${uiBoolean.image_background}`,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.05,
          objectFit: "cover",
        }}
      />

      <Box
        component="img"
        alt="Dark border"
        src={imageBgBorderDarkSrc}
        sx={{
          position: "absolute",
          display: { md: `${uiBoolean.image_darkborder}`, xs: "none" },
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: "5",
          pointerEvents: "none",
        }}
      />

      {/* <Box
        component="img"
        alt="Banner"
        src={imageBgBannerSrc}
        sx={{
          position: "absolute",
          display: { md: `${uiBoolean.image_banner}`, xs: "none" },
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.05,
          objectFit: "cover",
        }}
      /> */}

      <Box
        component="img"
        alt="Land"
        src={imageBgSrcland}
        sx={{
          position: "absolute",
          display: { md: `${uiBoolean.image_doll}`, xs: "none" },
          left: 0,
          top: "30%",
          transform: "translateY(-50%)",
          width: "10rem",
          animation: `${throwIntoSpace} 10s ease-out infinite`,
        }}
      />

      <Box
        component="img"
        alt="Border"
        src={imageBgBorderSrc}
        sx={{
          position: "absolute",
          display: { md: `${uiBoolean.image_lightborder}`, xs: "none" },
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.5,
          zIndex: "5",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default MainBorder;

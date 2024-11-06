import React, { useEffect, useState } from "react";
import { Backdrop, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@emotion/react";

interface ChangeLoaderProps {
  loading: boolean;
  colorSetId: number; // Add this prop to track color set changes
}

const jumpAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const toOpacityAnimation = keyframes`
  0% {
   opacity: 1;
  }
  100% {
    opacity: .25;
  }
`;

const zoomAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
    100%{
    transform: scale(0);
    }
`;

const ChangeLoader: React.FC<ChangeLoaderProps> = ({ loading, colorSetId }) => {
  const theme = useTheme();

  const colorKey = colorSetId.toString();

  const colorSetImageMap: { [key: string]: string } = {
    1: "/static/images/blue-head.webp",
    2: "/static/images/green-head.webp",
    3: "/static/images/yellow-head.webp",
    4: "/static/images/orange-head.webp",
    5: "/static/images/pink-head.webp",
  };

  const colorSetBgMap: { [key: string]: string } = {
    1: "/static/images/blue-gate.webp",
    2: "/static/images/green-gate.webp",
    3: "/static/images/yellow-gate.webp",
    4: "/static/images/orange-gate.webp",
    5: "/static/images/pink-gate.webp",
  };

  const imageBgSrc = colorSetBgMap[colorKey] || colorSetBgMap[1];
  const imageSrc = colorSetImageMap[colorKey] || colorSetImageMap[1];

  console.log(
    "Current colorSetId:",
    colorKey,
    "Image BG:",
    imageBgSrc,
    "Image:",
    imageSrc
  );

  return (
    <Backdrop
      open={loading}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        // backgroundColor: (theme) => `${theme.palette.custom.mainColor}50`,
        backgroundImage: `url(${imageBgSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        animation: `${zoomAnimation} 3.25s infinite ease-in-out`,
      }}
    >
      <Box
        bgcolor={"#121212"}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          animation: `${toOpacityAnimation} 3.25s ease-in-out 1`,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          background:
            "radial-gradient(circle, rgba(0, 0, 0, .5), rgba(0, 0, 0, 1))",
          pointerEvents: "none",
        }}
      />

      <Box
        key={colorSetId}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          animation: `${jumpAnimation} 1s ease-in-out infinite`,
          pointerEvents: "none",
        }}
      >
        <Box
          minWidth={250}
          maxWidth={250}
          component={"img"}
          src={imageSrc}
          alt="Loader Image"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 2,
          }}
        />
        <Typography
          variant="h2"
          color={"custom.primaryText"}
          sx={{
            marginTop: 2,
            textShadow: "6px 6px 8px rgba(0, 0, 0, .5)",
          }}
        >
          CryptechTest
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default ChangeLoader;

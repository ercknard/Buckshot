import React, { useEffect, useState } from "react";
import { Backdrop, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@emotion/react";

interface FullscreenLoaderProps {
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

const closeLeftGateAnimation = keyframes`
  0% {
    transform: translateX(0vw);
  }
  100% {
    transform: translateX(-50vw);
  }
`;

const closeRightGateAnimation = keyframes`
  0% {
    transform: translateX(0vw);
  }
  100% {
    transform: translateX(50vw);
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

const ChangeLoader: React.FC<FullscreenLoaderProps> = ({
  loading,
  colorSetId,
}) => {
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

  const imageBgSrc = colorSetBgMap[colorKey] || colorSetBgMap[1];
  const imageBgLeftSrc = colorSetBgMapLeft[colorKey] || colorSetBgMapLeft[1];
  const imageBgRightSrc = colorSetBgMapRight[colorKey] || colorSetBgMapRight[1];
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
        backgroundImage: `url(${imageBgSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
            boxShadow: "6px 6px 8px rgba(0, 0, 0, 1)",
          }}
        />
        <Typography
          variant="h3"
          color={"custom.primaryText"}
          sx={{
            marginTop: 2,
            textShadow: "6px 6px 8px rgba(0, 0, 0, 1)",
          }}
        >
          CryptechTest
        </Typography>
      </Box>

      <Box
        component={"img"}
        src={imageBgLeftSrc}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          opacity: 1,
          pointerEvents: "none",
          animation: `${closeLeftGateAnimation} 3.25s ease-in-out 1`,
          border: `.5rem solid ${theme.palette.custom.primaryBorders}`,
        }}
      />

      <Box
        bgcolor={"#121212"}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          pointerEvents: "none",
          animation: `${closeLeftGateAnimation} 3.25s ease-in-out 1, ${toOpacityAnimation} 3.25s ease-in-out 1`,
        }}
      />

      <Box
        component={"img"}
        src={imageBgRightSrc}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          opacity: 1,
          pointerEvents: "none",
          animation: `${closeRightGateAnimation} 3.25s ease-in-out 1`,
          border: `.5rem solid ${theme.palette.custom.primaryBorders}`,
        }}
      />

      <Box
        bgcolor={"#121212"}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          pointerEvents: "none",
          animation: `${closeRightGateAnimation} 3.25s ease-in-out 1, ${toOpacityAnimation} 3.25s ease-in-out 1`,
        }}
      />
    </Backdrop>
  );
};

export default ChangeLoader;

import React from "react";
import { Backdrop, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@emotion/react"; // Import keyframes from emotion

interface FullscreenLoaderProps {
  loading: boolean;
}

const jumpAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const ChangeLoader: React.FC<FullscreenLoaderProps> = ({ loading }) => {
  const theme = useTheme();

  const colorSetId = theme.palette.custom.mainColor;

  const colorSetImageMap: { [key: string]: string } = {
    "#6169cf": "/static/images/blue-head.webp",
    "#456545": "/static/images/green-head.webp",
    "#868645": "/static/images/yellow-head.webp",
    "#a16c4f": "/static/images/orange-head.webp",
    "#b770ad": "/static/images/pink-head.webp",
  };

  const colorSetBgMap: { [key: string]: string } = {
    "#6169cf": "/static/images/blue-gate.webp",
    "#456545": "/static/images/green-gate.webp",
    "#868645": "/static/images/yellow-gate.webp",
    "#a16c4f": "/static/images/orange-gate.webp",
    "#b770ad": "/static/images/pink-gate.webp",
  };

  const imageBgSrc = colorSetBgMap[colorSetId] || colorSetImageMap["#6169cf"];
  const imageSrc = colorSetImageMap[colorSetId] || colorSetImageMap["#6169cf"];

  return (
    <Backdrop
      open={loading}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, .8)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          minWidth={250}
          maxWidth={250}
          component={"img"}
          src={imageSrc}
          alt="Loader Image"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 2,
            animation: `${jumpAnimation} 1s ease-in-out infinite`,
          }}
        />
        <Typography
          variant="h3"
          sx={{
            marginTop: 2,
            animation: `${jumpAnimation} 1s ease-in-out infinite`,
          }}
        >
          CryptechTest
        </Typography>
      </Box>

      <Box
        bgcolor={"custom.mainColor"}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />
    </Backdrop>
  );
};

export default ChangeLoader;

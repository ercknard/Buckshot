import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"; // Import Button
import { styled } from "@mui/material/styles";
import { useThemeContext } from "@/theme/themeProvider";
import Particlesview from "../Particles";
import { keyframes } from "@emotion/react";

const typingText = "CryptechTest";

type CustomTheme = {
  activeSet: number; // Adjust this based on your actual structure
};

const jumpAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const Cursor = styled("span")(({ theme }) => ({
  display: "inline-block",
  width: "1rem",
  height: "1em",
  backgroundColor: theme.palette.custom.mainColor,
  marginTop: "1rem",
  marginLeft: "1.5rem",
  animation: "blink 1s step-end infinite",
  "@keyframes blink": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
}));

export default function HeroSection(): JSX.Element {
  const { activeSet } = useThemeContext() as CustomTheme; // Get the active color set ID from context
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 1000;

    const typingInterval = setInterval(
      () => {
        if (!isDeleting) {
          if (index < typingText.length) {
            setDisplayedText((prev) => prev + typingText[index]);
            setIndex((prev) => prev + 1);
          } else {
            setIsDeleting(true);
          }
        } else {
          if (index > 0) {
            setDisplayedText((prev) => prev.slice(0, -1));
            setIndex((prev) => prev - 1);
          } else {
            setIsDeleting(false);
            setIndex(0);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearInterval(typingInterval);
  }, [isDeleting, index]);

  const colorSetBgMap: { [key: string]: string } = {
    1: "/static/images/blue-gate.webp",
    2: "/static/images/green-gate.webp",
    3: "/static/images/yellow-gate.webp",
    4: "/static/images/orange-gate.webp",
    5: "/static/images/pink-gate.webp",
  };

  const imageBgSrc = colorSetBgMap[activeSet.toString()] || colorSetBgMap[1];

  // Calculate the scale based on scroll position
  const scale = 1 + scrollY * 0.001; // Adjust 0.001 to control zoom intensity

  return (
    <Box
      display={"flex"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"left"}
    >
      <Stack marginTop={-15}>
        <Stack spacing={1} direction={"row"}>
          <Typography variant={"body1"} color={"custom.primaryText"}>
            Play,
          </Typography>
          <Typography variant={"body1"} color={"custom.primaryTextGrayed"}>
            Enjoy,
          </Typography>
          <Typography variant={"body1"} color={"custom.secondaryTextGrayed"}>
            Earn!,
          </Typography>
        </Stack>
        <Stack
          display={"flex"}
          direction={"row"}
          alignItems={"center"}
          marginTop={1}
        >
          <Box
            component="img"
            width={{ xs: 180, sm: 180, md: 55 }}
            alt="Logo"
            src="/static/images/mug.png"
          />
          <Typography variant={"h3"} color={"custom.primaryText"}>
            Welcome to
          </Typography>
        </Stack>
        <Typography variant={"h1"} color={"custom.secondaryText"}>
          <Stack display={"flex"} direction={"row"} alignItems={"center"}>
            {displayedText} <Cursor />
          </Stack>
        </Typography>
        <Stack sx={{ marginTop: "1rem" }}>
          <Typography
            variant={"h5"}
            fontWeight={"600"}
            color={"custom.secondaryTextGrayed"}
          >
            Community-driven Minetest Game with endless possibilities. Join us
            and embark on a journey of creativity, collaboration, and adventure
            in our immersive world.
          </Typography>
        </Stack>

        {/* Buttons */}
        <Stack spacing={2} direction={"row"} sx={{ marginTop: "1rem" }}>
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
          <Button variant="outlined" color="primary" size="large">
            Learn More
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={(theme) => ({
          bgcolor: "transparent",
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.custom.primaryBackgroundGrayed}95, ${theme.palette.custom.secondaryBackground})`,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: "-1",
        })}
      />

      <Box
        sx={{
          backgroundImage: `url(${imageBgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          pointerEvents: "none",
          zIndex: "-2",
        }}
      />

      <Box
        sx={(theme) => ({
          backgroundImage: `url(/static/images/station-5.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: "45%",
          left: 0,
          width: "100%",
          height: "100vh",
          pointerEvents: "none",
          zIndex: "1",
          animation: `${jumpAnimation} 3s ease-in-out infinite`,
        })}
      />

      <Particlesview />
    </Box>
  );
}

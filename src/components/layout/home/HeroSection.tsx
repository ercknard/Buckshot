import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";
import { useThemeContext } from "@/theme/themeProvider";
import Particlesview from "../Particles";
import { keyframes } from "@emotion/react";
import DefaultDialog from "../DefaultDialog";

const typingText = "CryptechTest";

type CustomTheme = {
  activeSet: number; // Adjust this based on your actual structure
};

const jumpAnimation = keyframes`
  0%, 100% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const zoomAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  90% {
    transform: scale(2);
  }
    100%{
    transform: scale(1);
    }
`;

const toOpacityAnimation = keyframes`
  0%, 100% {
   opacity: 1;
  }
  90% {
    opacity: 0;
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
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog
  const [dialogOpenTrailer, setDialogOpenTrailer] = useState(false); // State for dialog

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

  const colorSetFrameMap: { [key: string]: string } = {
    1: "/static/images/blue-frame.png",
    2: "/static/images/green-frame.png",
    3: "/static/images/yellow-frame.png",
    4: "/static/images/orange-frame.png",
    5: "/static/images/pink-frame.png",
  };

  const imageBgSrc = colorSetBgMap[activeSet.toString()] || colorSetBgMap[1];

  const imageFrameSrc =
    colorSetFrameMap[activeSet.toString()] || colorSetFrameMap[1];

  // Calculate the scale based on scroll position
  const scale = 1 + scrollY * 0.001; // Adjust 0.001 to control zoom intensity

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogOpenTrailer = () => {
    setDialogOpenTrailer(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogCloseTrailer = () => {
    setDialogOpenTrailer(false);
  };

  return (
    <Box
      display={"flex"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"left"}
      overflow={"hidden"}
    >
      <Stack marginTop={-20}>
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
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleDialogOpen}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleDialogOpenTrailer}
          >
            Watch Trailer
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={(theme) => ({
          bgcolor: "transparent",
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.custom.primaryBackgroundGrayed}25, ${theme.palette.custom.secondaryBackground})`,
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
        sx={(theme) => ({
          bgcolor: "transparent",
          backgroundImage: `radial-gradient(circle, ${theme.palette.custom.primaryBackgroundGrayed}90, ${theme.palette.custom.primaryBackground})`,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: "-1",
          animation: `${toOpacityAnimation} 20s ease-in-out infinite`,
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
          height: "100%",
          pointerEvents: "none",
          zIndex: "-2",
          animation: `${zoomAnimation} 20s ease-in-out infinite`,
          overflow: "hidden", // Prevents horizontal overflow
          transformOrigin: "center center", // Scales from the center
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
          height: "100%",
          pointerEvents: "none",
          zIndex: "1",
          animation: `${jumpAnimation} 3s ease-in-out infinite`,
        })}
      />

      <Box
        component="img"
        width={{ xs: 180, sm: 180, md: 35 }}
        alt="Logo"
        src={imageFrameSrc}
        sx={(theme) => ({
          position: "absolute",
          top: "1rem",
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: "-1",
          pointerEvents: "none",
        })}
      />

      <Particlesview />

      {/* Dialog Component */}
      <DefaultDialog
        maxWidth="sm"
        open={dialogOpen}
        handleOnClose={handleDialogClose}
        title="Join CryptechTest Now!"
      >
        <Stack spacing={3} padding={2}>
          <Typography
            variant={"h5"}
            fontSize={"1.5rem"}
            color={"custom.primaryTextGrayed"}
          >
            ¹ Its simple, to join our server first download the client which is
            free on their page: MINETEST .
          </Typography>

          <Typography
            variant={"h5"}
            fontSize={"1.5rem"}
            color={"custom.primaryTextGrayed"}
          >
            ² Open Minetest client, choose the join game tab. Put CryptectTest
            Credentials:
          </Typography>

          <Box padding={1} bgcolor={"custom.primaryComponents"}>
            <Typography variant={"h5"} fontSize={"1.5rem"} align={"center"}>
              IP: cryptechcraft.xyz / us.cryptechcraft.xyz / cryptechtest.xyz
            </Typography>
          </Box>

          <Box padding={1} bgcolor={"custom.primaryComponents"}>
            <Typography variant={"h5"} fontSize={"1.5rem"} align={"center"}>
              Port: 30000
            </Typography>
          </Box>

          <Typography
            variant={"h5"}
            fontSize={"1.5rem"}
            color={"custom.primaryTextGrayed"}
          >
            ³ Press the Register option. Once you have done that, the client
            will proceed to download the necessary files and thats it.
          </Typography>

          <Typography
            variant={"h5"}
            fontSize={"1.5rem"}
            align={"center"}
            color={"custom.primaryText"}
          >
            &quot;Welcome to our server and good luck landing.&quot; -Karen
          </Typography>
        </Stack>

        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </DefaultDialog>

      <DefaultDialog
        maxWidth="lg"
        open={dialogOpenTrailer}
        handleOnClose={handleDialogCloseTrailer}
        title="CryptechTest Trailer"
      >
        <Stack>
          <video width="100%" controls autoPlay>
            <source
              src="https://firebasestorage.googleapis.com/v0/b/cryptech-3c327.appspot.com/o/CryptechTest_Teaser_final%20(1).mp4?alt=media&token=466d45d1-f730-4e0f-9b23-a24cc7dccc96"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Stack>
        <DialogActions>
          <Button onClick={handleDialogCloseTrailer} color="primary">
            Close
          </Button>
        </DialogActions>
      </DefaultDialog>
    </Box>
  );
}

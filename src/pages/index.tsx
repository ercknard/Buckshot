import { Container, Box, Typography, Stack } from "@mui/material";
import { DefaultHead } from "@/components/layout/Head";
import { useThemeContext } from "@/theme/themeProvider";
import HeroSection from "@/components/layout/home/HeroSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TeamSection from "@/components/layout/home/TeamSection";
import { keyframes } from "@emotion/react";
import ModsSection from "@/components/layout/home/ModsSection";
import ColorSection from "@/components/layout/home/ColorSection";

export default function Home(): JSX.Element {
  const theme = useThemeContext();

  const jumpAnimation = keyframes`
  0%, 100% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

  return (
    <Box>
      <DefaultHead />
      <Box position={"absolute"} width={1} left={0}>
        <Navbar />
      </Box>
      <HeroSection />
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
          zIndex: "5",
          animation: `${jumpAnimation} 3s ease-in-out infinite`,
        })}
      />
      <ModsSection />
      <TeamSection />
      <ColorSection />
      <Footer />
    </Box>
  );
}

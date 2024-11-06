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
import DonateSection from "@/components/layout/home/DonateSection";

export default function Home(): JSX.Element {
  return (
    <Box>
      <DefaultHead />
      <Box position={"absolute"} width={1} left={0}>
        <Navbar />
      </Box>
      <HeroSection />
      <ModsSection />
      <TeamSection />
      <DonateSection />
      <ColorSection />
      <Footer />
    </Box>
  );
}

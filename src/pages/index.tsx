import { Box } from "@mui/material";
import { DefaultHead } from "@/components/layout/Head";
import HeroSection from "@/components/layout/home/HeroSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TeamSection from "@/components/layout/home/TeamSection";
import ModsSection from "@/components/layout/home/ModsSection";
import ColorSection from "@/components/layout/home/ColorSection";
import DonateSection from "@/components/layout/home/DonateSection";
import MediaSection from "@/components/layout/home/MediaSection";
import PartnersSection from "@/components/layout/home/Partners";
import GitFeedsSection from "@/components/layout/home/GitFeedsSection";

export default function Home(): JSX.Element {
  return (
    <Box>
      <DefaultHead />
      <Box position={"absolute"} width={1} left={0}>
        <Navbar />
      </Box>
      <HeroSection />
      {/* <Box
        position={"relative"}
        width={1}
        left={0}
        sx={{
          padding: 4,
          backgroundColor: "custom.secondaryBackground",
          paddingTop: "10rem",
          paddingBottom: "10rem",
        }}
      ></Box> */}
      <ModsSection />
      <TeamSection />
      <MediaSection />
      <DonateSection />
      <PartnersSection />
      <GitFeedsSection />
      <ColorSection />
      <Footer />
    </Box>
  );
}

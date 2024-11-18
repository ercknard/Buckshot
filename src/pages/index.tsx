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
import NewsSection from "@/components/layout/home/NewsSection";
import GameModeSection from "@/components/layout/home/GameModeSection";
import ShipsSection from "@/components/layout/home/ShipsSection";
import AOScall from "@/components/layout/AOS";

export default function Home(): JSX.Element {
  return (
    <Box>
      <DefaultHead />
      <Box position={"fixed"} width={1} left={0} zIndex={100}>
        <Navbar />
      </Box>
      <HeroSection />
      <NewsSection />
      <GameModeSection />
      <ShipsSection />
      <ModsSection />
      <TeamSection />
      <MediaSection />
      <DonateSection />
      <PartnersSection />
      <GitFeedsSection />
      {/* <ColorSection /> */}
      <Footer />
      <AOScall />
    </Box>
  );
}

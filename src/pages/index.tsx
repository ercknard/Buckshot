import { Box, DialogActions, Button, Stack } from "@mui/material";
import { DefaultHead } from "@/components/layout/Head";
import HeroSection from "@/components/layout/home/HeroSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TeamSection from "@/components/layout/home/TeamSection";
import ModsSection from "@/components/layout/home/ModsSection";
import DonateSection from "@/components/layout/home/DonateSection";
import MediaSection from "@/components/layout/home/MediaSection";
import PartnersSection from "@/components/layout/home/Partners";
import GitFeedsSection from "@/components/layout/home/GitFeedsSection";
import NewsSection from "@/components/layout/home/NewsSection";
import GameModeSection from "@/components/layout/home/GameModeSection";
import ShipsSection from "@/components/layout/home/ShipsSection";
import AOScall from "@/components/layout/AOS";
import { useState, useEffect } from "react";
import DefaultDialog from "@/components/layout/DefaultDialog";

export default function Home(): JSX.Element {
  const [dialogOpenTrailer, setDialogOpenTrailer] = useState(true); // State for dialog

  const handleDialogCloseTrailer = () => {
    setDialogOpenTrailer(false);
  };

  // Disable scroll when the dialog is open
  useEffect(() => {
    if (dialogOpenTrailer) {
      // Disable scrolling on the body and html
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Enable scrolling again
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    // Clean up when the component unmounts or dialog state changes
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [dialogOpenTrailer]);

  return (
    <Box>
      <DefaultHead />
      <Box position={"fixed"} width={1} left={0} zIndex={100}>
        <Navbar />
      </Box>

      <DefaultDialog
        maxWidth="lg"
        open={dialogOpenTrailer}
        handleOnClose={handleDialogCloseTrailer}
        title="Welcome to Cryptechtest"
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
      {/* <AOScall /> */}
    </Box>
  );
}

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Tab,
  Tabs,
  Container,
} from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Default Swiper CSS
import "swiper/css/navigation"; // If you're using navigation
import "swiper/css/pagination"; // If you're using pagination
import "swiper/css/scrollbar";
import SwiperCore from "swiper"; // Import Scrollbar from SwiperCore
import { Scrollbar } from "swiper/modules";
import { useTheme } from "@mui/material/styles";

// Install the module in SwiperCore

type CustomTheme = {
  activeSet: number; // Adjust this based on your actual structure
};

interface TeamMember {
  name: string;
  role: string;
  image: string;
  land: string;
  details: string; // Additional details for the member
  dcdetails: string; // Additional details for the
}

const teamMembers: TeamMember[] = [
  {
    name: "Squidicuz",
    role: "Leads",
    image: "/static/images/yellow-head.webp",
    land: "/static/images/yellow-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : squidicuz",
  },
  {
    name: "SeqSee",
    role: "Leads",
    image: "/static/images/pink-head.webp",
    land: "/static/images/pink-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : SeqSee",
  },
  {
    name: "Vanikoro",
    role: "Leads",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : vanikoro",
  },
  {
    name: "Kyuhi",
    role: "Leads",
    image: "/static/images/blue-head.webp",
    land: "/static/images/blue-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : Kyuhi",
  },
  {
    name: "Shikoku",
    role: "Leads",
    image: "/static/images/orange-head.webp",
    land: "/static/images/orange-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : shikoku",
  },
];

const teamModerators: TeamMember[] = [
  {
    name: "Stick",
    role: "Moderator",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : anormalstick",
  },
  {
    name: "Ferbog05",
    role: "Moderator",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : ferbog05",
  },
  {
    name: "Matador",
    role: "Moderator",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : matador",
  },
  {
    name: "Demil",
    role: "Moderator",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : demil",
  },
  {
    name: "DeathSmack",
    role: "Moderator",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : deathsmack",
  },
  {
    name: "Tonic",
    role: "Contributor",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : anormaltonic",
  },
  {
    name: "Ercknard",
    role: "Contributor",
    image: "/static/images/green-head.webp",
    land: "/static/images/green-land.webp",
    details: "Welcome to CryptechTest",
    dcdetails: "Discord : ercknard",
  },
];

const ModsSection: React.FC = () => {
  const { activeSet } = useThemeContext() as CustomTheme;
  const [activeTab, setActiveTab] = useState<number>(0); // 0 for Team Members, 1 for Moderators
  const theme = useTheme();

  // Ensure activeSet is a number for comparison purposes
  const activeSetNumber =
    typeof activeSet === "number"
      ? activeSet
      : parseInt(activeSet as string, 10);

  // Log the activeSet value and type for debugging
  console.log(
    "Active Set:",
    activeSet,
    "Active Set (parsed):",
    activeSetNumber
  );

  // Function to determine default member based on active theme
  const getDefaultMember = (activeSet: number) => {
    console.log("Evaluating activeSet:", activeSet);
    switch (activeSet) {
      case 1:
        return teamMembers[3]; // Kyuhi for blue
      case 2:
        return teamMembers[2]; // Vanikoro for green
      case 3:
        return teamMembers[0]; // Squidicuz for yellow
      case 4:
        return teamMembers[4]; // Shikoku for orange
      case 5:
        return teamMembers[1]; // SeqSee for pink
      default:
        return teamMembers[2]; // Default to Vanikoro if no valid set is found
    }
  };

  const [expandedMember, setExpandedMember] = useState<TeamMember | null>(
    getDefaultMember(activeSetNumber)
  );

  // Whenever activeSet changes, update expandedMember to the corresponding team member
  useEffect(() => {
    setExpandedMember(getDefaultMember(activeSetNumber));
  }, [activeSetNumber]);

  const handleCardClick = (member: TeamMember) => {
    // Only toggle the expanded member if it is not the currently expanded member
    if (expandedMember === member) {
      return; // Disable click action if the card is already active
    }
    setExpandedMember(expandedMember === member ? null : member); // Toggle the expanded member
  };

  const colorSetBgBannerRight: { [key: string]: string } = {
    1: "/static/images/blue-banner.png",
    2: "/static/images/green-banner.png",
    3: "/static/images/yellow-banner.png",
    4: "/static/images/orange-banner.png",
    5: "/static/images/pink-banner.png",
  };

  const colorSetBgBorderRight: { [key: string]: string } = {
    1: "/static/images/blue-border.png",
    2: "/static/images/green-border.png",
    3: "/static/images/yellow-border.png",
    4: "/static/images/orange-border.png",
    5: "/static/images/pink-border.png",
  };

  const colorSetBgBorderDark: { [key: string]: string } = {
    1: "/static/images/blue-border-dark.png",
    2: "/static/images/green-border-dark.png",
    3: "/static/images/yellow-border-dark.png",
    4: "/static/images/orange-border-dark.png",
    5: "/static/images/pink-border-dark.png",
  };

  const imageBgBannerSrc =
    colorSetBgBannerRight[activeSet.toString()] || colorSetBgBannerRight[1];

  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];

  const imageBgBorderDarkSrc =
    colorSetBgBorderDark[activeSet.toString()] || colorSetBgBorderDark[1];

  SwiperCore.use([Scrollbar]);

  return (
    <Box
      position={"relative"}
      width={1}
      left={0}
      sx={{
        padding: 4,
        backgroundColor: "custom.secondaryBackground",
        paddingTop: "10rem",
        paddingBottom: "10rem",
        minHeight: "100vh",
      }}
    >
      <Box
        component={"img"}
        src="/static/images/BG-B.webp"
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.35,
        })}
      />

      {/* <Box
        component={"img"}
        src={imageBgBannerSrc}
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.75,
        })}
      /> */}

      <Box
        component={"img"}
        src={imageBgBorderDarkSrc}
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        })}
      />

      <Box
        component={"img"}
        src={imageBgBorderSrc}
        sx={(theme) => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        })}
      />

      <Container
        sx={{
          justifyContent: { sm: "center", xs: "left" },
          marginX: "auto",
        }}
      >
        <Box position={"relative"} zIndex={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Featured Mods
          </Typography>
        </Box>

        <Box position={"relative"}></Box>
      </Container>
    </Box>
  );
};

export default ModsSection;
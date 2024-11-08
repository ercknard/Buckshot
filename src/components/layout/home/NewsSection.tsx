import { Box, Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useThemeContext } from "@/theme/themeProvider";
import { styled } from "@mui/system";

const NewsSection = () => {
  const [content, setContent] = useState<string | null>(null);
  const { activeSet } = useThemeContext();

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

  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];

  const imageBgBorderDarkSrc =
    colorSetBgBorderDark[activeSet.toString()] || colorSetBgBorderDark[1];

  useEffect(() => {
    const fetchReadme = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/CryptechTest/announcement/main/README.md"
      );
      const text = await response.text();
      setContent(text);
    };
    fetchReadme();
  }, []);

  // Custom Markdown styling using MUI's styled API
  const StyledMarkdown = styled(ReactMarkdown)(({ theme }) => ({
    "& h1, & h2, & h3": {
      color: theme.palette.custom.primaryText,
      fontFamily: "Vetregular, serif", // Apply to headings
      fontSize: "2rem",
    },
    "& h4, & h5, & h6": {
      color: theme.palette.custom.primaryText,
      marginBottom: "1rem",
      fontFamily: "Vetregular, serif", // Apply to headings
      fontSize: "1.5rem",
    },
    "& p": {
      fontSize: "1.25rem",
      lineHeight: "1.8",
      color: theme.palette.custom.secondaryTextGrayed,
      fontFamily: "Vetregular, serif", // Apply to paragraphs
    },
    "& ul, & ol": {
      paddingLeft: "2rem",
      marginBottom: "1rem",
      fontFamily: "Vetregular, serif", // Apply to lists
    },
    "& li": {
      marginBottom: "0.5rem",
      color: theme.palette.custom.secondaryTextGrayed,
      fontFamily: "Vetregular, serif", // Apply to list items
    },
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
      fontFamily: "Vetregular, serif", // Apply to links
      "&:hover": {
        color: theme.palette.primary.dark,
      },
    },
    "& code": {
      backgroundColor: theme.palette.background.paper,
      padding: "0.2rem 0.4rem",
      borderRadius: "4px",
      fontFamily: "'Courier New', monospace", // Optionally use monospace for code
      fontSize: "1rem",
    },
  }));

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
      }}
    >
      <Box
        component={"img"}
        src={imageBgBorderDarkSrc}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <Box
        component={"img"}
        src={imageBgBorderSrc}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <Container
        sx={{
          justifyContent: { sm: "center", xs: "left" },
          marginX: "auto",
        }}
      >
        <Box position={"relative"} zIndex={2}>
          <Typography variant="h4" align="center" gutterBottom>
            News and Updates
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Get in touch with us!
          </Typography>
        </Box>
        <Box
          marginTop={"2.5rem"}
          bgcolor={"custom.primaryComponents"}
          padding={3}
          sx={{
            borderWidth: "10px", // Adjust the border width as per your preference
            borderStyle: "solid",
            borderImage: `url('${imageBgBorderSrc}') 30 round`, // Use an image as the border
          }}
        >
          {content ? (
            <StyledMarkdown>{content}</StyledMarkdown>
          ) : (
            <p>Loading...</p>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default NewsSection;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import ReactMarkdown from "react-markdown";
import { useThemeContext } from "@/theme/themeProvider";
import rehypeRaw from "rehype-raw"; // Import rehype-raw for raw HTML parsing
import { styled } from "@mui/system";
import MainBorder from "../MainBorder";

// Define the type for the GitHub repository content file
interface GitHubFile {
  name: string;
  download_url: string;
}

const NewsSection = () => {
  const [files, setFiles] = useState<{ name: string; content: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filesPerPage] = useState<number>(1); // Only 1 file per page
  const { activeSet, soundsMode } = useThemeContext();
  const [isNewsVisible, setIsNewsVisible] = useState<boolean>(false);
  const [clickSound2, setClickSound2] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only load the sound when the component is mounted on the client side
    if (typeof window !== "undefined") {
      const sound2 = new Audio(
        "/static/sounds/sounds_scifi_nodes_palm_scanner.ogg"
      );
      setClickSound2(sound2);
    }
  }, []); // This useEffect will only run on the client side

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsNewsVisible(true); // "Team" section is in view
        } else {
          setIsNewsVisible(false); // "Team" section is out of view
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is in view
      }
    );

    const newsSection = document.getElementById("news");
    if (newsSection) {
      observer.observe(newsSection);
    }

    return () => {
      if (newsSection) {
        observer.unobserve(newsSection);
      }
    };
  }, []);

  const colorSetBgBorderRight: { [key: string]: string } = {
    1: "/static/images/blue-border.png",
    2: "/static/images/green-border.png",
    3: "/static/images/yellow-border.png",
    4: "/static/images/orange-border.png",
    5: "/static/images/pink-border.png",
  };

  const imageBgBorderSrc =
    colorSetBgBorderRight[activeSet.toString()] || colorSetBgBorderRight[1];

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/CryptechTest/announcement/contents/"
        );
        const data: GitHubFile[] = await response.json(); // Type the response as GitHubFile[]

        // Filter to get only Markdown files
        const markdownFiles = data.filter((file) => file.name.endsWith(".md"));

        // Sort the markdown files in descending order based on the name (or any other sorting logic)
        const sortedFiles = markdownFiles.sort((a, b) => {
          return b.name.localeCompare(a.name); // Lexicographically, descending
        });

        // Fetch content for each Markdown file
        const allMarkdownContent = await Promise.all(
          sortedFiles.map(async (file) => {
            const fileResponse = await fetch(file.download_url);
            const fileContent = await fileResponse.text();
            return { name: file.name, content: fileContent };
          })
        );

        // Set the fetched files and their content in state
        setFiles(allMarkdownContent);
      } catch (err) {
        setError("Error fetching data from GitHub.");
        console.error(err);
      }
    };

    fetchReadme();
  }, []);

  // Get the file for the current page
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFile = files.slice(indexOfFirstFile, indexOfLastFile)[0]; // Only one file per page

  // Remove .md from the filename
  const displayFileName = currentFile
    ? currentFile.name.replace(/\.md$/, "")
    : "";

  // Pagination control logic
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Play the sound if it's loaded
    if (clickSound2 && soundsMode) {
      clickSound2.play();
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(files.length / filesPerPage);

  // Custom Markdown styling using MUI's styled API
  const StyledMarkdown = styled(ReactMarkdown)(({ theme }) => ({
    "& h1, & h2, & h3": {
      color: theme.palette.custom.primaryText,
      fontFamily: "Vetregular, serif", // Apply to headings
      fontSize: "1.75rem",
    },
    "& h4, & h5, & h6": {
      color: theme.palette.custom.primaryText,
      marginBottom: "1.5rem",
      fontFamily: "Vetregular, serif", // Apply to headings
      fontSize: "1.25rem",
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
      fontSize: "1.1rem",
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
    "& img": {
      maxWidth: "25%",
      height: "auto",
      borderRadius: "8px",
      marginTop: "2rem",
      marginBottom: "1rem",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      "@media (max-width: 768px)": {
        maxWidth: "80%", // Change the maxWidth on small devices
      },
    },
  }));

  return (
    <Box
      id="news"
      position={"relative"}
      width={1}
      left={0}
      sx={{
        padding: { md: "4", xs: "1" },
        backgroundColor: "custom.primaryBackground",
        paddingTop: { md: "10rem", xs: "5rem" },
        paddingBottom: { md: "7.5rem", xs: "3rem" },
        minHeight: "50vh",
      }}
    >
      <MainBorder containerId="news-particles" isVisible={isNewsVisible} />

      <Container
        sx={{
          position: "relative",
          zIndex: "2",
          justifyContent: { sm: "center", xs: "left" },
          marginX: "auto",
        }}
      >
        <Box position={"relative"} zIndex={2}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            color="custom.secondaryTextGrayed"
          >
            News and Updates
          </Typography>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            color="custom.primaryTextGrayed"
          >
            Get in touch with us!
          </Typography>
        </Box>
        <Box sx={{ paddingBottom: 4 }}>
          {error && (
            <Typography variant="body1" color="error" align="center">
              {error}
            </Typography>
          )}
          {files.length === 0 ? (
            <Typography variant="body1" align="center">
              Loading...
            </Typography>
          ) : (
            <>
              <Paper
                sx={{
                  marginTop: "2.5rem",
                  padding: { md: "2rem", xs: "1rem" },
                  paddingBottom: "0",
                  borderWidth: "10px",
                  borderStyle: "solid",
                  borderImage: `url('${imageBgBorderSrc}') 20 round`,
                  maxHeight: "100vh",
                  overflow: "scroll",
                }}
              >
                {currentFile && (
                  <Box sx={{ marginBottom: 3 }}>
                    <Typography
                      variant="body1"
                      fontSize={"1.5rem"}
                      color="custom.primaryText"
                      gutterBottom
                      align="left"
                    >
                      {displayFileName}
                    </Typography>
                    <StyledMarkdown rehypePlugins={[rehypeRaw]}>
                      {currentFile.content}
                    </StyledMarkdown>
                  </Box>
                )}

                {/* Pagination controls */}
              </Paper>
              <Grid
                container
                justifyContent="space-between"
                alignContent="center"
                marginTop="1rem"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <Typography color="custom.primaryText">Previous</Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="h5" component="span">
                    Page {currentPage} of {totalPages}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <Typography color="custom.primaryText">Next</Typography>
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default NewsSection;

// React
import { useEffect, useState } from "react";

//MUI
import { Button, Typography, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70, // 2rem offset (32px)
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  //Toggle Drawer (Mobile)
  const [selectedDrawer, setSelectedDrawer] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null); // Track the active section

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "news",
        "servers",
        "ships",
        "mods",
        "team",
        "gameplay",
        "donate",
        "partners",
        "git",
      ];
      let currentSection: string | null = null;
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionOffsetTop = section.offsetTop;
          // Add a 70px offset to check when the section is in view
          if (window.scrollY + 100 >= sectionOffsetTop) {
            currentSection = sections[i];
          }
        }
      }

      setActiveSection(currentSection); // Update active section based on scroll position
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isMobileView) {
    return (
      <>
        <AppBar
          position="fixed"
          sx={{
            height: 60,
            zIndex: 10,
            px: 3,
            mb: { xs: 2.5, sm: 8 },
            boxShadow: 1,
            bgcolor: "custom.a1",
            backgroundImage: "none",
          }}
        >
          <Toolbar disableGutters>
            <Stack
              width={1}
              direction={"row"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box mr={{ xs: 1, sm: 3, md: 5 }} pt={1}>
                <Stack direction={"row"} spacing={1}>
                  {/* <Box
                    component="img"
                    width={{ xs: 30, sm: 55 }}
                    height={1}
                    alt="Logo"
                    src="/static/images/mug.png"
                  /> */}
                  <Typography
                    variant={"h4"}
                    fontSize={"1.5rem"}
                    color={"custom.primaryText"}
                  >
                    CryptechTest
                  </Typography>
                </Stack>
              </Box>

              <Stack marginTop={1}>
                <IconButton onClick={() => setSelectedDrawer(0)}>
                  <MenuIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* MOBILE DRAWER */}
        <Drawer
          transitionDuration={400}
          anchor={"bottom"}
          open={selectedDrawer !== null}
          onClose={() => setSelectedDrawer(null)}
          PaperProps={{
            sx: {
              p: 3,
              height: "100vh",
              bgcolor: "custom.a1",
              backgroundImage: "none",
            },
          }}
        >
          <Stack spacing={2} height={1}>
            <Stack
              width={1}
              direction={"row"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box mr={{ xs: 1, sm: 3, md: 5 }}>
                <Stack direction={"row"} spacing={1}>
                  {/* <Box
                    component="img"
                    width={{ xs: 30, sm: 55 }}
                    height={1}
                    alt="Logo"
                    src="/static/images/mug.png"
                  /> */}
                  <Typography
                    variant={"h4"}
                    fontSize={"1.5rem"}
                    color={"custom.primaryText"}
                  >
                    CryptechTest
                  </Typography>
                </Stack>
              </Box>

              <IconButton onClick={() => setSelectedDrawer(null)}>
                <ClearIcon sx={{ fontSize: "1.5rem" }} />
              </IconButton>
            </Stack>

            <Box>
              <Stack
                direction={"column"}
                spacing={{ xs: 1, sm: 0, md: 5 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Button component="a" href="#news" color="inherit">
                  <Typography
                    variant={"h5"}
                    fontWeight={"600"}
                    color={"custom.secondaryTextGrayed"}
                  >
                    News
                  </Typography>
                </Button>
                <Button component="a" href="#mods" color="inherit">
                  <Typography
                    variant={"h5"}
                    fontWeight={"600"}
                    color={"custom.secondaryTextGrayed"}
                  >
                    Mods
                  </Typography>
                </Button>
                <Button component="a" href="#team" color="inherit">
                  <Typography
                    variant={"h5"}
                    fontWeight={"600"}
                    color={"custom.secondaryTextGrayed"}
                  >
                    Team
                  </Typography>
                </Button>
                <Button component="a" href="#gameplay" color="inherit">
                  <Typography
                    variant={"h5"}
                    fontWeight={"600"}
                    color={"custom.secondaryTextGrayed"}
                  >
                    Gameplay
                  </Typography>
                </Button>
                <Button component="a" href="#donate" color="inherit">
                  <Typography
                    variant={"h5"}
                    fontWeight={"600"}
                    color={"custom.secondaryTextGrayed"}
                  >
                    Donate
                  </Typography>
                </Button>
                <Button
                  component="a"
                  href="#servers"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Play
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Drawer>
      </>
    );
  }

  return (
    <Box display={{ xs: "none", sm: "flex" }}>
      <AppBar
        position="sticky"
        sx={{
          height: 65,
          zIndex: 10,
          px: 3,
          mb: 8,
          boxShadow: 1,
          bgcolor: "custom.secondaryBackground",
          backgroundImage: "none",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Stack
            width={1}
            direction={"row"}
            display={"flex"}
            justifyContent={"space-between"}
            sx={{
              maxWidth: "1600px !important",
            }}
          >
            <Box display={"flex"}>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                {/* <Box mr={{ xs: 1, sm: 3, md: 5 }}>
                  <Box
                    component="img"
                    width={{ xs: 40, sm: 55 }}
                    alt="Logo"
                    src="/static/images/mug.png"
                  />
                </Box> */}

                <Typography
                  variant="body1"
                  fontSize={"1.75rem"}
                  color={"custom.primaryText"}
                >
                  CryptechTest
                </Typography>
              </Stack>
            </Box>

            {/* RIGHT MENU */}
            <Box marginTop={1}>
              <Stack
                direction={"row"}
                spacing={{ xs: 0, sm: 0, md: 4 }}
                display={"flex"}
                alignItems={"center"}
              >
                {["news", "ships", "mods", "team", "gameplay", "donate"].map(
                  (section) => (
                    <Button
                      key={section}
                      onClick={() => handleScrollTo(section)}
                      sx={{
                        textDecoration:
                          activeSection === section ? "underline" : "none", // Underline active link
                        textDecorationColor:
                          activeSection === section
                            ? "custom.primaryText"
                            : "transparent", // Set underline
                        textDecorationThickness:
                          activeSection === section ? 4 : 0, // Adjust underline thickness (height)
                        fontWeight: "600",
                      }}
                    >
                      <Typography
                        variant={"h5"}
                        color={
                          activeSection === section
                            ? "custom.primaryText"
                            : "custom.primaryTextGrayed"
                        }
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </Typography>
                    </Button>
                  )
                )}
                <Button
                  component="a"
                  onClick={() => handleScrollTo("servers")}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Play
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

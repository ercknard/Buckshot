// React
import { useState } from "react";

//MUI
import { Button, Typography, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Navbar() {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  //Toggle Drawer (Mobile)
  const [selectedDrawer, setSelectedDrawer] = useState<number | null>(null);

  if (isMobileView) {
    return (
      <>
        <AppBar
          position="sticky"
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
                <Box
                  component="img"
                  width={{ xs: 180, sm: 180, md: 200 }}
                  height={1}
                  alt="Logo"
                  src="/static/images/mug.png"
                />
              </Box>

              <Stack direction={"row"} spacing={1.5}>
                <IconButton onClick={() => setSelectedDrawer(0)}>
                  {/* <BellIcon sx={{ fontSize: "1.25rem" }} /> */}
                </IconButton>

                <IconButton onClick={() => setSelectedDrawer(1)}>
                  {/* <UserIcon sx={{ fontSize: "1.25rem" }} /> */}
                </IconButton>

                <IconButton onClick={() => setSelectedDrawer(2)}>
                  {/* <MenuBarIcon sx={{ fontSize: "1.25rem" }} /> */}
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
                <Box
                  component="img"
                  width={{ xs: 180, sm: 180, md: 200 }}
                  height={1}
                  alt="Logo"
                  src="/static/images/mug.png"
                />
              </Box>

              <IconButton onClick={() => setSelectedDrawer(null)}>
                {/* <TimesIcon sx={{ fontSize: "1rem" }} /> */}
              </IconButton>
            </Stack>

            <Divider />

            {/* {selectedDrawer === 0 && <NotificationMenu />}
            {selectedDrawer === 1 && <ProfileMenu />}
            {selectedDrawer === 2 && (
              <>
                <MenuContainer title="Assets" content={assetArray} />
                <MenuContainer title="Earn" content={earnArray} />
                <MenuContainer title="Trade" content={tradeArray} />
                <MenuContainer title="Build" content={buildArray} />
                <MenuContainer title="More" content={moreArray} />
              </>
            )} */}
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
                <Box mr={{ xs: 1, sm: 3, md: 5 }}>
                  <Box
                    component="img"
                    width={{ xs: 180, sm: 180, md: 40 }}
                    alt="Logo"
                    src="/static/images/mug.png"
                  />
                </Box>

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
            <Box>
              <Stack
                direction={"row"}
                spacing={{ xs: 0, sm: 0, md: 5 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Button color="inherit">
                  <Typography
                    variant={"h5"}
                    fontWeight={"600"}
                    color={"custom.secondaryTextGrayed"}
                  >
                    News
                  </Typography>
                </Button>
                <Button color="inherit">
                  <Typography
                    variant={"h5"}
                    fontWeight={"600"}
                    color={"custom.secondaryTextGrayed"}
                  >
                    Ships
                  </Typography>
                </Button>
                <Button color="inherit">
                  <Typography
                    variant={"h5"}
                    fontWeight={"600"}
                    color={"custom.secondaryTextGrayed"}
                  >
                    Team
                  </Typography>
                </Button>
                <Button color="inherit">
                  <Typography
                    variant={"h5"}
                    fontWeight={"600"}
                    color={"custom.secondaryTextGrayed"}
                  >
                    Donate
                  </Typography>
                </Button>
                <Button color="inherit">
                  <Typography
                    variant={"h5"}
                    fontWeight={"600"}
                    color={"custom.secondaryTextGrayed"}
                  >
                    Feeds
                  </Typography>
                </Button>
                <Button variant="contained" color="primary" size="large">
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

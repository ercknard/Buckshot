import { Container, Box, Typography, Stack } from "@mui/material";
import { useThemeContext } from "@/theme/themeProvider";

type CustomTheme = {
  activeSet: number;
};

export default function ColorSection(): JSX.Element {
  const { activeSet } = useThemeContext() as CustomTheme;
  const theme = useThemeContext();

  const boxesmain = [
    { color: theme.palette.custom.mainColor, label: "Main Color" },
  ];

  const boxes = [
    //colored
    {
      color: theme.palette.custom.primaryBackground,
      label: "Primary Background",
    },
    {
      color: theme.palette.custom.secondaryBackground,
      label: "Secondary Background",
    },
    {
      color: theme.palette.custom.primaryComponents,
      label: "Primary Components",
    },
    {
      color: theme.palette.custom.secondaryComponents,
      label: "Secondary Components",
    },
    {
      color: theme.palette.custom.tertiaryComponents,
      label: "Tertiary Components",
    },
    { color: theme.palette.custom.primaryBorders, label: "Primary Borders" },
    {
      color: theme.palette.custom.secondaryBorders,
      label: "Secondary Borders",
    },
    { color: theme.palette.custom.tertiaryBorders, label: "Tertiary Borders" },
    {
      color: theme.palette.custom.primarySolidColors,
      label: "Primary Solid Colors",
    },
    {
      color: theme.palette.custom.secondarySolidColors,
      label: "Secondary Solid Colors",
    },
    { color: theme.palette.custom.primaryText, label: "Primary Text" },
    { color: theme.palette.custom.secondaryText, label: "Secondary Text" },
  ];

  const boxesgrayed = [
    // Grayed colors
    {
      color: theme.palette.custom.primaryBackgroundGrayed,
      label: "Primary Background ",
    },
    {
      color: theme.palette.custom.secondaryBackgroundGrayed,
      label: "Secondary Background ",
    },
    {
      color: theme.palette.custom.primaryComponentsGrayed,
      label: "Primary Components ",
    },
    {
      color: theme.palette.custom.secondaryComponentsGrayed,
      label: "Secondary Components ",
    },
    {
      color: theme.palette.custom.tertiaryComponentsGrayed,
      label: "Tertiary Components ",
    },
    {
      color: theme.palette.custom.primaryBordersGrayed,
      label: "Primary Borders ",
    },
    {
      color: theme.palette.custom.secondaryBordersGrayed,
      label: "Secondary Borders ",
    },
    {
      color: theme.palette.custom.tertiaryBordersGrayed,
      label: "Tertiary Borders ",
    },
    {
      color: theme.palette.custom.primarySolidColorsGrayed,
      label: "Primary Solid Colors ",
    },
    {
      color: theme.palette.custom.secondarySolidColorsGrayed,
      label: "Secondary Solid Colors",
    },
    {
      color: theme.palette.custom.primaryTextGrayed,
      label: "Primary Text",
    },
    {
      color: theme.palette.custom.secondaryTextGrayed,
      label: "Secondary Text",
    },
  ];

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

  return (
    <Box position={"relative"} padding={"10rem"}>
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

      <Container>
        <Box
          display={"flex"}
          gap={"1rem"}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          {boxesmain.map((box, index) => (
            <Box
              key={index}
              bgcolor={box.color}
              width={"100%"}
              height={"7.5rem"}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant={"h6"}>{box.label}</Typography>
            </Box>
          ))}
        </Box>
        <Box
          display={"flex"}
          gap={"1rem"}
          flexWrap={"wrap"}
          marginTop={"5rem"}
          justifyContent={"center"}
        >
          {boxes.map((box, index) => (
            <Box
              key={index}
              bgcolor={box.color}
              width={"11.45rem"}
              height={"7.5rem"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              padding={"1rem"}
            >
              <Typography variant={"subtitle2"}>{box.label}</Typography>
            </Box>
          ))}
        </Box>
        <Box
          display={"flex"}
          gap={"1rem"}
          flexWrap={"wrap"}
          marginTop={"10rem"}
          justifyContent={"center"}
        >
          {boxesgrayed.map((box, index) => (
            <Box
              key={index}
              bgcolor={box.color}
              width={"11.45rem"}
              height={"7.5rem"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              padding={"1rem"}
            >
              <Typography variant={"subtitle2"}>{box.label}</Typography>
            </Box>
          ))}
        </Box>
        <Stack marginTop={10}>
          <Typography variant={"h1"} color={"custom.primaryText"}>
            CryptechTest
          </Typography>
          <Typography variant={"h2"} color={"custom.primaryText"}>
            CryptechTest
          </Typography>
          <Typography variant={"h3"} color={"custom.primaryText"}>
            caption
          </Typography>
          <Typography variant={"h4"} color={"custom.primaryText"}>
            Pagetitle
          </Typography>
          <Typography variant={"h5"} color={"custom.primaryText"}>
            sectiontitle
          </Typography>
          <Typography variant={"h6"} color={"custom.primaryText"}>
            title
          </Typography>
          <Typography variant={"h6"} color={"custom.primaryText"}>
            h6
          </Typography>
          <Typography variant={"highlight"} color={"custom.primaryText"}>
            highlight
          </Typography>
          <Typography variant={"highlightMuted"} color={"custom.primaryText"}>
            highlightMuted
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

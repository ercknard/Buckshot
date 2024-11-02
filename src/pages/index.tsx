import { Container, Box, Typography } from "@mui/material";
import { DefaultHead } from "@/components/layout/Head";
import { useThemeContext } from "@/theme/themeProvider";

export default function Home(): JSX.Element {
  const theme = useThemeContext();

  const boxes = [
    { color: theme.palette.custom.mainColor, label: "Main Color" },
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
    // Grayed colors
    {
      color: theme.palette.custom.primaryBackgroundGrayed,
      label: "Primary Background Grayed",
    },
    {
      color: theme.palette.custom.secondaryBackgroundGrayed,
      label: "Secondary Background Grayed",
    },
    {
      color: theme.palette.custom.primaryComponentsGrayed,
      label: "Primary Components Grayed",
    },
    {
      color: theme.palette.custom.secondaryComponentsGrayed,
      label: "Secondary Components Grayed",
    },
    {
      color: theme.palette.custom.tertiaryComponentsGrayed,
      label: "Tertiary Components Grayed",
    },
    {
      color: theme.palette.custom.primaryBordersGrayed,
      label: "Primary Borders Grayed",
    },
    {
      color: theme.palette.custom.secondaryBordersGrayed,
      label: "Secondary Borders Grayed",
    },
    {
      color: theme.palette.custom.tertiaryBordersGrayed,
      label: "Tertiary Borders Grayed",
    },
    {
      color: theme.palette.custom.primarySolidColorsGrayed,
      label: "Primary Solid Colors Grayed",
    },
    {
      color: theme.palette.custom.secondarySolidColorsGrayed,
      label: "Secondary Solid Colors Grayed",
    },
    {
      color: theme.palette.custom.primaryTextGrayed,
      label: "Primary Text Grayed",
    },
    {
      color: theme.palette.custom.secondaryTextGrayed,
      label: "Secondary Text Grayed",
    },
  ];

  return (
    <Container>
      <DefaultHead />
      <Box
        display={"flex"}
        gap={"1rem"}
        flexWrap={"wrap"}
        marginTop={"10rem"}
        justifyContent={"center"}
      >
        {boxes.map((box, index) => (
          <Box
            key={index}
            bgcolor={box.color}
            width={"10rem"}
            height={"10rem"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>{box.label}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

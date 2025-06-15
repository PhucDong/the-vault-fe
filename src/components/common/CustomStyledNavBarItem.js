import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const CustomStyledNavBarItem = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "isNavBarItemActive" && prop !== "navBarItem",
})(({ navBarItem, isNavBarItemActive, theme }) => ({
  color: isNavBarItemActive
    ? theme.palette.primary.main
    : theme.palette.primary.light,
  display: "flex",
  alignItems: "center",
  "& .MuiTypography-root": {
    fontWeight: 550,
  },
  [theme.breakpoints.up("xs")]: {
    flexDirection: "column",
    gap: "4px",
    "& .MuiSvgIcon-root": { fontSize: "2rem" },
    "& .MuiTypography-root": {
      fontSize: "1rem",
    },
  },
  [theme.breakpoints.up("sm")]: {
    gap: 0,
    "& .MuiSvgIcon-root": { fontSize: "2.2rem" },
    "& .MuiTypography-root": {
      fontSize: "1.1rem",
    },
  },
  [theme.breakpoints.up("md")]: {
    gap: "8px",
    flexDirection: "row",
    cursor: "pointer",
    "& .MuiTypography-root": {
      fontSize: navBarItem ? "2rem" : "1.1rem",
    },
  },
  [theme.breakpoints.up("lg")]: {
    "& .MuiTypography-root": {
      fontSize: navBarItem ? "2rem" : "1.275rem",
    },
  },
}));

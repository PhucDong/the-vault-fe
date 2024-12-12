import MenuBookIcon from "@mui/icons-material/MenuBook";
import MovieIcon from "@mui/icons-material/Movie";
import HomeIcon from "@mui/icons-material/Home";
// import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import CustomPaddingLayout from "./CustomPaddingLayout";
import { Box, Typography, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CustomStyledNavBarItem = styled(Box, {
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
    flexDirection: "row",
    cursor: "pointer",
    "& .MuiTypography-root": {
      fontSize: navBarItem ? "2rem" : "1.2rem",
    },
  },
  [theme.breakpoints.up("lg")]: {
    "& .MuiTypography-root": {
      fontSize: navBarItem ? "2rem" : "1.2rem",
    },
  },
}));

const navBarItemList = [
  { icon: <HomeIcon />, label: "Home" },
  { icon: <MovieIcon />, label: "Anime" },
  { icon: <MenuBookIcon />, label: "Manga" },
  { icon: <LoginIcon />, label: "Log In" },
];

function MainHeader(props) {
  const { setNavHeight } = props;
  const [navBarItem, setNavBarItem] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();
  const isMediumScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );

  const handleChangeIsNavBarItemActive = (navBarItem) => {
    if (navBarItem === "Home") navigate("/");
    else if (navBarItem === "Anime") navigate("/animes");
    else if (navBarItem === "Manga") navigate("/mangas");
    else if (navBarItem === "Log In") navigate("/login");
    setNavBarItem(navBarItem);
  };

  useEffect(() => {
    if (location.pathname.startsWith("/animes")) setNavBarItem("Anime");
    else if (location.pathname.startsWith("/mangas")) setNavBarItem("Manga");
    else if (location.pathname.startsWith("/login")) setNavBarItem("Log In");
    else if (location.pathname.startsWith("/register")) setNavBarItem("");
    else if (location.pathname.startsWith("/")) setNavBarItem("Home");
  }, [location.pathname]);

  return (
    <CustomPaddingLayout
      setNavHeight={setNavHeight}
      sx={{
        padding: {
          xs: "12px 32px",
          sm: "16px 56px",
          md: "20px 152px",
          lg: "28px 192px",
        },
        boxShadow: {
          xs: "0 -2px 4px 0 rgba(0, 0, 0, .2)",
          md: "0 2px 4px 0 rgba(0, 0, 0, .2)",
        },
        position: "fixed",
        bottom: { xs: 0, md: "unset" },
        top: { xs: "unset", md: 0 },
        width: "100%",
        backgroundColor: "#fff",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!isMediumScreenWidthAndAbove ? (
          navBarItemList.map((item) => (
            <CustomStyledNavBarItem
              key={item.label}
              isNavBarItemActive={navBarItem === item.label}
              onClick={() => handleChangeIsNavBarItemActive(item.label)}
            >
              {item.icon}
              <Typography>{item.label}</Typography>
            </CustomStyledNavBarItem>
          ))
        ) : (
          <>
            <Box sx={{ display: "flex", gap: { md: "80px" } }}>
              {/* Home */}
              <CustomStyledNavBarItem
                navBarItem={navBarItem}
                isNavBarItemActive={navBarItem === "Home"}
                onClick={() => handleChangeIsNavBarItemActive("Home")}
              >
                <Typography>The Vault</Typography>
              </CustomStyledNavBarItem>

              {/* Anime & Manga */}
              <Box sx={{ display: "flex", gap: { xs: "8px", md: "32px" } }}>
                <CustomStyledNavBarItem
                  isNavBarItemActive={navBarItem === "Anime"}
                  onClick={() => handleChangeIsNavBarItemActive("Anime")}
                >
                  <Typography>Anime</Typography>
                </CustomStyledNavBarItem>
                <CustomStyledNavBarItem
                  isNavBarItemActive={navBarItem === "Manga"}
                  onClick={() => handleChangeIsNavBarItemActive("Manga")}
                >
                  <Typography>Manga</Typography>
                </CustomStyledNavBarItem>
              </Box>
            </Box>

            {/* Login & register */}
            <CustomStyledNavBarItem
              isNavBarItemActive={navBarItem === "Log In"}
              onClick={() => handleChangeIsNavBarItemActive("Log In")}
            >
              <Typography>Log In</Typography>
            </CustomStyledNavBarItem>
          </>
        )}
      </Box>
    </CustomPaddingLayout>
  );
}

export default MainHeader;

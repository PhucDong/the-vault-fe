import {
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MovieIcon from "@mui/icons-material/Movie";
import HomeIcon from "@mui/icons-material/Home";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import { useLocation, useNavigate } from "react-router-dom";

function MainHeader({ setNavHeight }) {
  const location = useLocation();
  const [bottomNavItemValue, setBottomNavItemValue] = useState(() => {
    if (location.pathname === "/") return 0;
    else if (location.pathname.includes("/animes")) return 1;
    else if (location.pathname.includes("/mangas")) return 2;
    else if (location.pathname === "/register") return 3;
    else if (location.pathname === "/login") return 4;
  });

  const isTabletScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const navigate = useNavigate();
  const navRef = useRef(null);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, [setNavHeight]);

  useEffect(() => {
    if (location.pathname.includes("/animes")) setBottomNavItemValue(1);
    else if (location.pathname.includes("/mangas")) setBottomNavItemValue(2);
  }, [location.pathname]);

  return (
    <BottomNavigation
      ref={navRef}
      showLabels
      value={bottomNavItemValue}
      onChange={(event, value) => setBottomNavItemValue(value)}
      sx={{
        gap: { xs: "8px", md: 0 },
        padding: {
          xs: "8px 0",
          sm: "12px 0",
          md: "16px 60px",
          lg: "24px 80px",
        },
        maxHeight: "unset", // Remove any max height restriction
        height: "auto", // Allow height to wrap around content
        position: "fixed",
        bottom: { xs: 0, md: "unset" },
        top: { xs: "unset", md: 0 },
        left: 0,
        right: 0,
        zIndex: 1,
        boxShadow: {
          xs: "0 -2px 4px 0 rgba(0, 0, 0, .2)",
          md: "0 2px 4px 0 rgba(0, 0, 0, .2)",
        },
        justifyContent: { xs: "center", md: "flex-start" },
        "& .MuiButtonBase-root": {
          color: "primary.light",
          padding: 0,
          gap: { xs: "4px", sm: 0 },
          maxWidth: "auto",
          minWidth: "auto",
          flexDirection: { xs: "column", md: "row" },
          flex: { xs: 1, md: "none" },
          "& .MuiSvgIcon-root": { fontSize: { xs: "2rem", sm: "2.2rem" } },
          "& .MuiBottomNavigationAction-label": {
            fontWeight: 550,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.3rem" },
            lineHeight: "100%",
          },
          "&.Mui-selected": {
            color: "primary.main",
          },
        },
        "& .marginRight-NavItem": {
          marginRight: { md: "32px" },
        },
        "& .top-brand-logo": { marginRight: { md: "140px", lg: "160px" } },
        "& .top-brand-logo .MuiBottomNavigationAction-label": {
          fontSize: { md: "2rem", lg: "2.1rem" },
          color: "primary.main",
        },
      }}
    >
      <BottomNavigationAction
        className="top-brand-logo"
        value={0}
        label={isTabletScreenWidthAndAbove ? "The Vault" : "Home"}
        icon={isTabletScreenWidthAndAbove ? null : <HomeIcon />}
        onClick={() => navigate("/")}
      />

      <BottomNavigationAction
        className="marginRight-NavItem"
        value={1}
        label="Anime"
        icon={isTabletScreenWidthAndAbove ? null : <MovieIcon />}
        onClick={() => navigate("/animes")}
      />
      <BottomNavigationAction
        className="marginRight-NavItem"
        value={2}
        label="Manga"
        icon={isTabletScreenWidthAndAbove ? null : <MenuBookIcon />}
        onClick={() => navigate("/mangas")}
      />
      <BottomNavigationAction
        className="marginRight-NavItem"
        value={3}
        label="Register"
        icon={isTabletScreenWidthAndAbove ? null : <AppRegistrationIcon />}
        onClick={() => navigate("/register")}
      />
      <BottomNavigationAction
        value={4}
        label="Log In"
        icon={isTabletScreenWidthAndAbove ? null : <LoginIcon />}
        onClick={() => navigate("/login")}
      />
    </BottomNavigation>
  );
}

export default MainHeader;

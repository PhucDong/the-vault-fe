import MenuBookIcon from "@mui/icons-material/MenuBook";
import MovieIcon from "@mui/icons-material/Movie";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import CustomPaddingLayout from "./CustomPaddingLayout";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";
import { selectIsUserLoggedIn } from "../../store/slices/authentication/authenticationSlice";
import { selectIsUserRegistered } from "../../store/slices/user/userSlice";
import { CustomStyledNavBarItem } from "./CustomStyledNavBarItem";
import ProfileNavBarItem from "../HomePage/ProfileNavBarItem";

function MainHeader(props) {
  const { setNavHeight } = props;
  const [navBarItem, setNavBarItem] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();
  const isMediumScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const isUserRegistered = useAppSelector(selectIsUserRegistered);

  const handleChangeIsNavBarItemActive = (navBarItem) => {
    if (navBarItem === "Home") {
      if (isUserLoggedIn || isUserRegistered) {
        navigate("/home", { state: { prevPathName: location.pathname } });
      } else {
        navigate("/", { state: { prevPathName: location.pathname } });
      }
    } else if (navBarItem === "Anime") {
      navigate("/animes", { state: { prevPathName: location.pathname } });
    } else if (navBarItem === "Manga") {
      navigate("/mangas", { state: { prevPathName: location.pathname } });
    } else if (navBarItem === "Log In") {
      navigate("/login", { state: { prevPathName: location.pathname } });
    }
    setNavBarItem(navBarItem);
  };

  const getNavBarItemList = () => {
    if (isUserLoggedIn || isUserRegistered) {
      return [
        { icon: <HomeIcon />, label: "Home" },
        { icon: <MovieIcon />, label: "Anime" },
        { icon: <MenuBookIcon />, label: "Manga" },
        { icon: <PersonIcon />, label: "Profile" },
      ];
    } else {
      return [
        { icon: <HomeIcon />, label: "Home" },
        { icon: <MovieIcon />, label: "Anime" },
        { icon: <MenuBookIcon />, label: "Manga" },
        { icon: <LoginIcon />, label: "Log In" },
      ];
    }
  };

  useEffect(() => {
    if (
      location.pathname.startsWith("/animes") ||
      location.pathname.startsWith("/search/animes")
    )
      setNavBarItem("Anime");
    else if (
      location.pathname.startsWith("/mangas") ||
      location.pathname.startsWith("/search/mangas")
    )
      setNavBarItem("Manga");
    else if (location.pathname.startsWith("/login")) setNavBarItem("Log In");
    else if (
      location.pathname.startsWith("/") ||
      location.pathname.startsWith("/home")
    )
      setNavBarItem("Home");
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
          getNavBarItemList().map((item) => (
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
                {["Anime", "Manga"].map((item) => (
                  <CustomStyledNavBarItem
                    key={item}
                    isNavBarItemActive={navBarItem === item}
                    onClick={() => handleChangeIsNavBarItemActive(item)}
                  >
                    <Typography>{item}</Typography>
                  </CustomStyledNavBarItem>
                ))}
              </Box>
            </Box>

            {isUserLoggedIn || isUserRegistered ? (
              // Profile
              <ProfileNavBarItem navBarItem={navBarItem} />
            ) : (
              // Log in
              <CustomStyledNavBarItem
                isNavBarItemActive={navBarItem === "Log In"}
                onClick={() => handleChangeIsNavBarItemActive("Log In")}
              >
                <Typography>Log In</Typography>
              </CustomStyledNavBarItem>
            )}
          </>
        )}
      </Box>
    </CustomPaddingLayout>
  );
}

export default MainHeader;

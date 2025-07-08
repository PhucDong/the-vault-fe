import MenuBookIcon from "@mui/icons-material/MenuBook";
import MovieIcon from "@mui/icons-material/Movie";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import CustomPaddingLayout from "./CustomPaddingLayout";
import { Box, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomStyledNavBarItem } from "./CustomStyledNavBarItem";
import ProfileNavBarItem from "../HomePage/ProfileNavBarItem";
import useUser from "../../hooks/useUser";
import { useSelector } from "react-redux";
import profileDropdownMenuList from "../../utils/profileDropdownMenuList";
import useLogout from "../../hooks/useLogout";

function MainHeader(props) {
  const { setNavHeight } = props;
  const [navBarItem, setNavBarItem] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();
  const isMediumScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const { isTokenExpired } = useUser();
  const userProfilePic = useSelector(
    (state) => state.authentication.profilePic
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { logout } = useLogout();

  const handleCloseProfileDropdownMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenProfileDropdownMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeIsNavBarItemActive = (navBarItem, event) => {
    if (navBarItem === "Home") {
      if (isTokenExpired.tokenExpiryStatus === false) {
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
    } else if (navBarItem === "Profile") {
      handleOpenProfileDropdownMenu(event);
    }
    setNavBarItem(navBarItem);
  };

  const getNavBarItemList = () => {
    if (isTokenExpired.tokenExpiryStatus === false) {
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

  const handleClickProfileDropdownMenuItem = (item) => {
    if (item === "Profile") {
      navigate("/home/me");
      handleCloseProfileDropdownMenu();
    } else if (item === "Log out") {
      handleCloseProfileDropdownMenu();
      logout();
      navigate("/");
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
    else if (location.pathname === "/" || location.pathname === "/home") {
      setNavBarItem("Home");
    } else if (location.pathname === "/home/me") {
      setNavBarItem("Profile");
    }
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
              onClick={(event) =>
                handleChangeIsNavBarItemActive(item.label, event)
              }
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
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: "8px", md: "20px", lg: "32px" },
                }}
              >
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

            {isTokenExpired.tokenExpiryStatus === false ? (
              // Profile
              <ProfileNavBarItem userProfilePic={userProfilePic} />
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

        <Menu
          id="mobile-profile-dropdown-menu"
          aria-labelledby="mobile-profile-dropdown-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseProfileDropdownMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          disableScrollLock
          sx={{
            "& .MuiMenu-list": {
              display: "flex",
              flexDirection: "column",
              padding: 0,
            },
            "& .MuiMenuItem-root": {
              color: "primary.light",
              backgroundColor: "transparent",

              "&:hover": {
                color: "primary.main",
                backgroundColor: "transparent",
              },

              "&.Mui-selected": {
                color: "info.main",
              },
            },
          }}
        >
          {profileDropdownMenuList.map((item) => (
            <MenuItem
              key={item.label}
              sx={{
                padding: "8px 16px",
                display: "flex",
                gap: "4px",
                alignItems: "center",

                "& .MuiSvgIcon-root": {
                  fontSize: { md: "1.6rem", lg: "1.8rem" },
                },
                "& .MuiTypography-root": {
                  fontWeight: 550,
                  fontSize: { md: "1.1rem" },
                },
              }}
              onClick={() => handleClickProfileDropdownMenuItem(item.label)}
            >
              {item.icon}
              <Typography>{item.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </CustomPaddingLayout>
  );
}

export default MainHeader;

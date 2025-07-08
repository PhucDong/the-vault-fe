import { CustomStyledNavBarItem } from "../common/CustomStyledNavBarItem";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { useAppSelector } from "../../services/hooks";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../../store/slices/authentication/authenticationSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import profileDropdownMenuList from "../../utils/profileDropdownMenuList";
// import useUser from "../../hooks/useUser";

function ProfileNavBarItem(props) {
  const { userProfilePic } = props;
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const loggedInUsername = useSelector(
    (state) => state.authentication.username
  );
  const registeredUsername = useSelector((state) => state.user.username);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { logout } = useLogout();
  // const { isTokenExpired } = useUser();

  const handleCloseProfileDropdownMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenProfileDropdownMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickProfileDropdownMenuItem = (item) => {
    if (item === "Profile") {
      navigate("/home/me");
      handleCloseProfileDropdownMenu();
      // console.log("Current user id: ", isTokenExpired.currentUserId);
      // navigate(`/users/${isTokenExpired.currentUserId}`);
    } else if (item === "Log out") {
      handleCloseProfileDropdownMenu();
      logout();
      navigate("/");
    }
  };

  return (
    <Box>
      <CustomStyledNavBarItem onClick={handleOpenProfileDropdownMenu}>
        <Box
          sx={{
            width: { md: "44px", lg: "48px", xl: "52px" },
            height: { md: "44px", lg: "48px", xl: "52px" },
            borderRadius: "50%",
            backgroundColor: userProfilePic ? "" : "#ABABAB",
          }}
        >
          {userProfilePic && (
            <img
              src={userProfilePic}
              alt={isUserLoggedIn ? loggedInUsername : registeredUsername}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            />
          )}
        </Box>
        <Typography>
          {isUserLoggedIn ? loggedInUsername : registeredUsername}
        </Typography>
      </CustomStyledNavBarItem>

      <Menu
        id="profile-dropdown-menu"
        aria-labelledby="profile-dropdown-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseProfileDropdownMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
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
  );
}

export default ProfileNavBarItem;

import { CustomStyledNavBarItem } from "../common/CustomStyledNavBarItem";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { useAppSelector } from "../../services/hooks";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../../store/slices/authentication/authenticationSlice";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const profileDropdownMenuList = [
  {
    icon: <PersonIcon />,
    label: "Profile",
  },
  { icon: <LogoutIcon />, label: "Log out" },
];

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

  const handleCloseProfileDropdownMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenProfileDropdownMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickProfileDropdownMenuItem = (item) => {
    if (item === "Profile") {
      navigate("/home/me");
    } else if (item === "Log out") {
      logout();
      navigate("/");
    }
  };

  console.log("User Profile Pic:", userProfilePic);

  return (
    <Box>
      <CustomStyledNavBarItem onClick={handleOpenProfileDropdownMenu}>
        <Box
          sx={{
            width: "44px",
            height: "44px",
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
        id="profile-positioned-menu"
        aria-labelledby="profile-positioned-button"
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

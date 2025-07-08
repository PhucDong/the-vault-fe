import { Box, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ProfileFriendDialog from "./ProfileFriendDialog";
import { useState } from "react";

function ProfileFriendsTabPanel(props) {
  const { value, index, item } = props;
  const [openProfileUserDialog, setOpenProfileUserDialog] = useState(null);

  const handleClickOpen = (userId) => {
    setOpenProfileUserDialog(userId);
  };

  const handleCloseProfileUserDialog = () => {
    setOpenProfileUserDialog(null);
  };

  return (
    <Box
      hidden={value !== index}
      sx={{
        display: value !== index ? "none" : "grid",
        gap: { xs: "12px" },
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(5, 1fr)",
          md: "repeat(3, 1fr)",
        },
      }}
    >
      {item?.friendList.map((friend) => (
        <Box
          key={friend.username}
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "8px" },
            }}
          >
            {/* User profile pic */}
            <Box
              sx={{
                height: { xs: "60px" },
                width: { xs: "60px" },
              }}
            >
              <img
                src={friend.profilePic}
                alt={friend.username}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                }}
              />
            </Box>

            {/* Username and mutual friends */}
            <Box>
              <Typography
                sx={{
                  lineHeight: 1.25,
                  fontSize: "1rem",
                  fontWeight: 550,
                  wordBreak: "break-word",
                  marginBottom: { xs: "4px" },
                }}
              >
                {friend.username}
              </Typography>

              {/* <Typography sx={{ color: "#ABABAB", fontSize: "0.85rem" }}>
                mutual friends
              </Typography> */}
            </Box>
          </Box>

          {/* More options icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover": { cursor: "pointer" },
              "& .MuiSvgIcon-root": {
                fontSize: { xs: "1.6rem" },
                color: "primary.dark",
              },
            }}
            onClick={() => handleClickOpen(friend._id)}
          >
            <MoreHorizIcon />
          </Box>
          {openProfileUserDialog === friend._id && (
            <ProfileFriendDialog
              open={openProfileUserDialog === friend._id}
              onClose={handleCloseProfileUserDialog}
              friend={friend}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}

export default ProfileFriendsTabPanel;

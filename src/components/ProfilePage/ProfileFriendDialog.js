import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Slide from "@mui/material/Slide";
import { useEffect } from "react";
import apiService from "../../services/apiService";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProfileFriendDialog(props) {
  const { onClose, open, friend } = props;
  const [openRemoveFriendAlert, setOpenRemoveFriendAlert] = useState(false);

  const handleCloseRemoveFriendDialog = () => {
    console.log("Closing Remove Friend Dialog");
    onClose();
  };

  const handleCloseRemoveFriendAlert = () => {
    setOpenRemoveFriendAlert(false);
    handleCloseRemoveFriendDialog();
  };

  const handleOpenRemoveFriendAlert = () => {
    setOpenRemoveFriendAlert(true);
  };

  const handleRemoveFriend = async () => {
    try {
      await apiService.delete(`/friends/${friend._id}`);
      setOpenRemoveFriendAlert(false);
      handleCloseRemoveFriendDialog();
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  useEffect(() => {
    const html = document.documentElement;

    if (open) {
      html.style.overflowY = "hidden"; // Lock scroll
    } else {
      html.style.overflowY = "overlay"; // Restore scroll
    }

    // Clean up on unmount
    return () => {
      html.style.overflowY = "overlay";
    };
  }, [open]);

  return (
    <>
      <Dialog
        fullWidth
        onClose={handleCloseRemoveFriendDialog}
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        PaperProps={{
          sx: {
            position: "fixed",
            bottom: 0,
            m: 0,
            borderRadius: "12px 12px 0 0",
            width: "100%",
            maxWidth: "600px",
            left: "50%",
            transform: "translateX(-50%)",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: { xs: "8px 16px" },
          }}
          onClick={handleOpenRemoveFriendAlert}
        >
          <PersonRemoveIcon />
          <Typography>Unfriend {friend.username}</Typography>
        </Box>
      </Dialog>

      {openRemoveFriendAlert && (
        <Dialog
          fullWidth
          onClose={handleCloseRemoveFriendAlert}
          open={openRemoveFriendAlert}
          slots={{
            transition: Transition,
          }}
          keepMounted
          PaperProps={{
            sx: {
              padding: "16px",
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              lineHeight: "1.25",
              padding: 0,
              marginBottom: { xs: "16px" },
              fontSize: { xs: "1.2rem" },
            }}
          >
            Remove {friend.username} from your friend list?
          </DialogTitle>
          <DialogActions
            sx={{
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              "& .MuiButtonBase-root": {
                borderRadius: "8px",
                textTransform: "capitalize",
                fontSize: { xs: "1.2rem" },
                fontWeight: 600,
                minWidth: { xs: "86px" },
                padding: 0,
                lineHeight: "100%",
              },
            }}
          >
            <Button onClick={handleCloseRemoveFriendAlert}>Cancel</Button>
            <Button
              onClick={handleRemoveFriend}
              sx={{ marginLeft: 0, color: "#DF2935" }}
            >
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default ProfileFriendDialog;

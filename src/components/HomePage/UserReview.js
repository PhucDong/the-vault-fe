import { Box, Menu, MenuItem, Typography } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteUserReviewAlert from "./DeleteUserReviewAlert";
import { useNavigate } from "react-router-dom";

const userReviewDropdownMenuList = [
  {
    icon: <EditIcon />,
    label: "Edit",
  },
  { icon: <DeleteIcon />, label: "Delete" },
];

function UserReview(props) {
  const { review, setReviewList } = props;
  const currentUserId = useSelector(
    (state) => state.authentication.currentUserId
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const navigate = useNavigate();

  const handleOpenUserReviewDropdownMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserReviewDropdownMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseDeleteAlert = () => {
    setOpenDeleteAlert(false);
  };

  const handleUserReviewDropdownMenuOption = (item) => {
    if (item === "Delete") {
      setOpenDeleteAlert(true);
      handleCloseUserReviewDropdownMenu();
    } else if (item === "Edit") {
      handleCloseUserReviewDropdownMenu();
      navigate(`/home/reviews/editor/${review._id}`);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #A9A9A9",
        borderRadius: "8px",
        padding: { xs: "12px 16px", lg: "16px 20px" },
      }}
    >
      <Box>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          {/* Author name, profile pic, created date */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "8px" },
            }}
          >
            {/* Profile pic */}
            <Box
              sx={{
                width: "44px",
                height: "44px",
                backgroundColor: "#ababab",
                borderRadius: "50%",
              }}
            ></Box>

            {/* Author name & created date */}
            <Box>
              <Typography
                sx={{
                  marginBottom: "6px",
                  fontWeight: 550,
                  fontSize: "1rem",
                  color: "primary.main",
                }}
              >
                {review.author.username}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 550,
                  fontSize: "0.85rem",
                  color: "#b8b8b8",
                }}
              >
                {dayjs(review.createdAt).format("MMMM D, YYYY [at] h:mm A")}
              </Typography>
            </Box>
          </Box>

          {/* More icon */}
          {currentUserId === review.author._id && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { cursor: "pointer" },
                  "& .MuiSvgIcon-root": {
                    fontSize: { xs: "1.8rem", lg: "2rem" },
                    color: "primary.dark",
                  },
                }}
                onClick={handleOpenUserReviewDropdownMenu}
              >
                <MoreHorizIcon />
              </Box>
              <Menu
                id="profile-positioned-menu"
                aria-labelledby="profile-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseUserReviewDropdownMenu}
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
                {userReviewDropdownMenuList.map((item) => (
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
                    onClick={() =>
                      handleUserReviewDropdownMenuOption(item.label)
                    }
                  >
                    {item.icon}
                    <Typography>{item.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <DeleteUserReviewAlert
                reviewId={review._id}
                setReviewList={setReviewList}
                openDeleteAlert={openDeleteAlert}
                handleCloseDeleteAlert={handleCloseDeleteAlert}
              />
            </Box>
          )}
        </Box>

        {/* BDOY: text, image, likes, dislikes, comments */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            marginBottom: "12px",
          }}
        >
          {/* Text & image */}
          <Box>
            {/* Text */}
            <Typography
              sx={{
                lineHeight: 1.25,
                marginBottom: { xs: "12px" },
                wordBreak: "break-word",
              }}
            >
              {review.text}
            </Typography>

            {/* Image */}
            <Box
              sx={{
                width: "100%",
                height: "120px",
                backgroundColor: "#ababab",
              }}
            ></Box>
          </Box>

          {/* Likes, dislikes, & comments */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Likes, & dislikes */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.2rem",
                    color: "primary.dark",
                  },
                  "& .MuiTypography-root": {
                    fontSize: "0.95rem",
                    color: "primary.dark",
                    fontWeight: 550,
                  },
                }}
              >
                <ThumbUpAltIcon />
                <Typography>{review.likes || 0}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.2rem",
                    color: "primary.dark",
                  },
                  "& .MuiTypography-root": {
                    fontSize: "0.95rem",
                    color: "primary.dark",
                    fontWeight: 550,
                  },
                }}
              >
                <ThumbDownAltIcon />
                <Typography>{review.dislikes || 0}</Typography>
              </Box>
            </Box>

            {/* Comments */}
            <Box>
              <Typography sx={{ color: "primary.dark", fontWeight: 550 }}>{`${
                review.comments || 0
              } comments`}</Typography>
            </Box>
          </Box>
        </Box>

        {/* INTERACTIONS: like, dislike, & comment */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Like & dislike */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Box
              onClick={() => setLiked(!liked)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: "1.6rem" },
                  color: "primary.dark",
                },
                "& .MuiTypography-root": {
                  fontSize: "1rem",
                  color: "primary.dark",
                  fontWeight: 550,
                },
              }}
            >
              {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
              <Typography>Like</Typography>
            </Box>

            <Box
              onClick={() => setDisliked(!disliked)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: "1.6rem" },
                  color: "primary.dark",
                },
                "& .MuiTypography-root": {
                  fontSize: "1rem",
                  color: "primary.dark",
                  fontWeight: 550,
                },
              }}
            >
              {disliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
              <Typography>Dislike</Typography>
            </Box>
          </Box>

          {/* Comment */}
          <Box
            onClick={() => console.log("Comment!")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              "& .MuiSvgIcon-root": {
                fontSize: { xs: "1.6rem" },
                color: "primary.dark",
              },
              "& .MuiTypography-root": {
                fontSize: "1rem",
                color: "primary.dark",
                fontWeight: 550,
              },
            }}
          >
            <ChatBubbleOutlineIcon />
            <Typography sx={{ color: "primary.dark", fontWeight: 550 }}>
              Comment
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UserReview;

import { Box, Menu, MenuItem, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useReviewAppDispatch } from "../../services/hooks";
import apiService from "../../services/apiService";
import useUser from "../../hooks/useUser";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import getReviewDropdownMenu from "../../utils/getReviewDropdownMenu";
import DeleteAlert from "./DeleteReviewAlert";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

// Customize locale to use short units
dayjs.updateLocale("en", {
  relativeTime: {
    future: "%s",
    past: "%s ago",
    s: "1s",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy",
  },
});

const customStyledCommentActionContainer = {
  display: "flex",
  alignItems: "center",
  gap: "4px",

  "& .MuiSvgIcon-root": {
    fontSize: { xs: "1rem", sm: "1.1rem" },
    color: "primary.dark",
  },
  "& .MuiTypography-root": {
    fontWeight: 550,
    fontSize: { xs: "0.7rem", md: "0.8rem" },
    color: "#b8b8b8",
  },
};

function UserReviewComment(props) {
  const { comment, review } = props;
  const reviewId = review._id;
  const commentId = comment._id;
  const isCommentLiked = useSelector(
    (state) => state.review.reactions[commentId]?.isLiked
  );
  const isCommentDisliked = useSelector(
    (state) => state.review.reactions[commentId]?.isDisliked
  );
  const { updateCommentReactions } = useReviewAppDispatch();
  const [commentLikes, setCommentLikes] = useState(comment?.likes);
  const [commentDislikes, setCommentDislikes] = useState(comment?.dislikes);
  const { isTokenExpired } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleSaveCommentReaction = async (targetType, targetId, emoji) => {
    updateCommentReactions({ emoji, commentId: targetId });

    await apiService.post("/reactions", {
      targetId,
      targetType,
      emoji,
    });

    const fetchedComment = await apiService.get(`/comments/${targetId}`);
    setCommentLikes(fetchedComment.comment.likes);
    setCommentDislikes(fetchedComment.comment.dislikes);
  };

  const handleOpenReviewCommentDropdownMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseReviewCommentDropdownMenu = () => {
    setAnchorEl(null);
  };

  const handleReviewCommentDropdownMenuOption = (item) => {
    if (item === "Delete") {
      setOpenDeleteAlert(true);
      handleCloseReviewCommentDropdownMenu();
    } else if (item === "Edit") {
      handleCloseReviewCommentDropdownMenu();
    }
  };

  const handleCloseDeleteAlert = () => {
    setOpenDeleteAlert(false);
  };

  useEffect(() => {
    const hasRun = localStorage.getItem(`hasRun-${commentId}`);

    if (!hasRun) {
      if (comment?.likes?.includes(isTokenExpired.currentUserId)) {
        updateCommentReactions({ emoji: "like", commentId });
      } else if (comment?.dislikes?.includes(isTokenExpired.currentUserId)) {
        updateCommentReactions({ emoji: "dislike", commentId });
      }

      localStorage.setItem(`hasRun-${commentId}`, "true");
    }
  }, []);

  return (
    <Box sx={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
      {/* Profile pic */}
      <Box
        sx={{
          width: { xs: "32px", md: "36px" },
          height: { xs: "32px", md: "36px" },
          backgroundColor: "#ababab",
          borderRadius: "50%",
        }}
      ></Box>

      {/* Author name, comment text, likes & dislikes */}
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "6px" }}
        >
          <Box
            sx={{
              maxWidth: "fit-content",
              backgroundColor: "#ebebeb",
              padding: "8px 12px",
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{
                marginBottom: "4px",
                fontWeight: 600,
                fontSize: { xs: "0.75rem", md: "0.85rem" },
                color: "primary.main",
              }}
            >
              {comment.author.username}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "0.9rem", md: "1rem" },
                color: "primary.main",
                lineHeight: 1.25,
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              {comment.text}
            </Typography>
          </Box>

          {isTokenExpired.currentUserId === comment.author._id && (
            <Box>
              <Box
                sx={{ marginLeft: "4px", "&:hover": { cursor: "pointer" } }}
                onClick={handleOpenReviewCommentDropdownMenu}
              >
                <MoreHorizIcon
                  sx={{
                    color: "primary.light",
                    fontSize: { xs: "1.7rem", md: "1.6rem" },
                  }}
                />
              </Box>
              <Menu
                id="comment-dropdown-menu"
                aria-labelledby="comment-dropdown-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseReviewCommentDropdownMenu}
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
                  "& .MuiPaper-root": {
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  },
                  "& .MuiMenu-list": {
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                  },
                  "& .MuiMenuItem-root": {
                    color: "primary.light",
                    backgroundColor: "transparent",
                    padding: { xs: "6px 10px", md: "8px 12px" },
                    minHeight: 0,

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
                {getReviewDropdownMenu().map((item) => (
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
                      handleReviewCommentDropdownMenuOption(item.label)
                    }
                  >
                    {item.icon}
                    <Typography>{item.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <DeleteAlert
                reviewId={reviewId}
                commentId={commentId}
                openDeleteAlert={openDeleteAlert}
                handleCloseDeleteAlert={handleCloseDeleteAlert}
              />
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: "20px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",

              "& .MuiTypography-root": {
                fontWeight: 550,
                fontSize: { xs: "0.7rem", md: "0.8rem" },
                color: "#b8b8b8",
              },
            }}
          >
            <Typography>{dayjs(comment.createdAt).fromNow()}</Typography>

            <Box
              onClick={() =>
                handleSaveCommentReaction("Comments", commentId, "like")
              }
              sx={{
                "& .MuiTypography-root": {
                  color: isCommentLiked ? "info.main" : "#b8b8b8",
                },
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Typography>Like</Typography>
            </Box>

            <Box
              onClick={() =>
                handleSaveCommentReaction("Comments", commentId, "dislike")
              }
              sx={{
                "& .MuiTypography-root": {
                  color: isCommentDisliked ? "info.main" : "#b8b8b8",
                },
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Typography>Dislike</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Box sx={customStyledCommentActionContainer}>
              <ThumbUpAltIcon />
              <Typography>{commentLikes?.length}</Typography>
            </Box>
            <Box sx={customStyledCommentActionContainer}>
              <ThumbDownAltIcon />
              <Typography>{commentDislikes?.length}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UserReviewComment;

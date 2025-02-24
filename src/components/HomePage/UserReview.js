import { Box, Menu, MenuItem, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import DeleteUserReviewAlert from "./DeleteUserReviewAlert";
import { NavLink, useNavigate } from "react-router-dom";
import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "../../hooks/useExtensions";
import truncate from "html-truncate";
import ReviewReactions from "./ReviewReactions";
import CommentSection from "./CommentSection";
import useUser from "../../hooks/useUser";
import getReviewDropdownMenu from "../../utils/getReviewDropdownMenu";
import CommentInput from "./CommentInput";

function UserReview(props) {
  const { review, setReviewList, sx } = props;
  const { isTokenExpired } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const comments = useSelector(
    (state) => state.review?.comments[review._id]?.comments
  );

  const getModifiedContent = () => {
    return truncate(review?.text, 100, {
      ending: "...",
    });
  };

  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });

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
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* HEADER: profile pic, username, created date, more icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
                width: { xs: "36px", md: "40px" },
                height: { xs: "36px", md: "40px" },
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
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  color: "primary.main",
                }}
              >
                {review.author.username}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 550,
                  fontSize: { xs: "0.75rem", md: "0.85rem" },
                  color: "#b8b8b8",
                }}
              >
                {dayjs(review.createdAt).format("MMMM D, YYYY [at] h:mm A")}
              </Typography>
            </Box>
          </Box>

          {/* More icon */}
          {isTokenExpired.currentUserId === review.author._id && (
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

        {/* Target review title & score */}
        <Box
          sx={{
            "& .MuiTypography-root": {
              fontSize: { xs: "0.85rem", lg: "0.875rem" },
              fontWeight: 520,
              color: "#a1a1a1",
            },
          }}
        >
          <Typography
            sx={{ marginBottom: "4px" }}
          >{`${review?.targetType?.substring(
            0,
            review?.targetType?.length - 1
          )}: ${review?.target?.title}`}</Typography>
          <Typography>{`Score: ${review?.score}/10`}</Typography>
        </Box>

        {/* BODY: text */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Text & image */}
          <Box sx={{ marginBottom: { xs: "8px" } }}>
            {/* Text */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                marginBottom: { xs: "16px" },
                width: "100%",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "normal",

                "& p": {
                  lineHeight: 1.25,
                  fontSize: { xs: "1rem" },
                },
                "& a": {
                  textDecoration: "none",
                  fontWeight: 550,
                  fontSize: { xs: "1rem" },
                  alignSelf: "flex-end",
                },
              }}
            >
              <RichTextReadOnly
                className="hello-world"
                content={isExpanded ? review?.text : getModifiedContent()}
                extensions={extensions}
              />

              {getModifiedContent().length < review?.text?.length && (
                <NavLink onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? "See less" : "See more"}
                </NavLink>
              )}
            </Box>

            {/* Image */}
            {/* <Box
              sx={{
                width: "100%",
                height: "120px",
                backgroundColor: "#ababab",
              }}
            ></Box> */}
          </Box>

          {/* REACTION: like, dislike, comment */}
          <ReviewReactions
            review={review}
            setReviewList={setReviewList}
            comments={!comments ? review?.comments : comments}
          />
        </Box>

        {/* FOOTER: comments */}
        <CommentSection
          review={review}
          comments={comments}
          // setComments={setComments}
        />

        {review?.comments.length === 0 && <CommentInput review={review} />}
      </Box>
    </Box>
  );
}

export default UserReview;

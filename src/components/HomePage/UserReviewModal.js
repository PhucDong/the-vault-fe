import { Box, Menu, MenuItem, Modal, Typography } from "@mui/material";
import dayjs from "dayjs";
import useUser from "../../hooks/useUser";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import getReviewDropdownMenu from "../../utils/getReviewDropdownMenu";
import { useNavigate } from "react-router-dom";
import DeleteUserReviewAlert from "./DeleteUserReviewAlert";
import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "../../hooks/useExtensions";
import ReviewReactions from "./ReviewReactions";
import { useSelector } from "react-redux";
import CommentSection from "./CommentSection";
import CommentInput from "./CommentInput";

// const CustomStyledUserReviewModal = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "84%",
//   backgroundColor: "#fff",
//   borderRadius: "12px",
//   padding: "12px 16px",
//   [theme.breakpoints.up("sm")]: {
//     width: "64%",
//   },
//   [theme.breakpoints.up("md")]: {
//     width: "44%",
//   },
//   [theme.breakpoints.up("lg")]: {
//     padding: "16px 20px",
//     width: "28%",
//   },
// }));

function UserReviewModal(props) {
  const {
    review,
    setReviewList,
    openUserReviewModal,
    handleCloseUserReviewModal,
  } = props;
  const { isTokenExpired } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // console.log("Is review modal open? ", openUserReviewModal);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const navigate = useNavigate();
  const comments = useSelector(
    (state) => state.review?.comments[review._id]?.comments
  );
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });

  const [commentInputHeight, setCommentInputHeight] = useState(0);

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
    <Modal open={openUserReviewModal} onClose={handleCloseUserReviewModal}>
      <Box
        sx={{
          borderRadius: "8px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: { xs: "90vh" },
          width: { xs: "76vw", md: "56vw", lg: "48vw" },
          backgroundColor: "#fff",
          overflowY: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflowY: "scroll",
            height: { xs: "90vh" },
            padding: {
              xs: `12px 16px ${commentInputHeight + 12}px 16px`,
              lg: `16px 20px ${commentInputHeight + 16}px 20px`,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
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
                    content={review?.text}
                    extensions={extensions}
                  />
                </Box>
              </Box>

              {/* REACTION: like, dislike, comment */}
              <ReviewReactions
                review={review}
                comments={!comments ? review?.comments : comments}
              />
            </Box>

            {/* Divider between BODY & FOOTER sections */}
            <Box
              sx={{
                height: "1.5px",
                backgroundColor: "primary.light",
                marginBottom: "12px",
                borderRadius: "8px",
              }}
            />

            {/* FOOTER: comments */}
            <CommentSection
              review={review}
              comments={comments}
              openReviewModal={openUserReviewModal}
            />
          </Box>

          {/* Comment input section */}
          <CommentInput
            review={review}
            openUserReviewModal={openUserReviewModal}
            setCommentInputHeight={setCommentInputHeight}
          />
        </Box>
      </Box>
    </Modal>
  );
}

export default UserReviewModal;

import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import apiService from "../../services/apiService";
import { useReviewAppDispatch } from "../../services/hooks";
import SendIcon from "@mui/icons-material/Send";

function CommentInput(props) {
  const { review, openUserReviewModal, setCommentInputHeight } = props;
  const [comment, setComment] = useState("");
  const loggedInUsername = useSelector(
    (state) => state.authentication.username
  );
  const registeredUsername = useSelector((state) => state.user.username);
  const { updateComments } = useReviewAppDispatch();
  const commentInputRef = useRef(null);

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const handlePostComment = async () => {
    try {
      await apiService.post("/comments", {
        targetId: review._id,
        targetType: "Reviews",
        text: comment,
      });

      setComment("");

      const commentListData = await apiService.get(
        `/comments?reviewId=${review._id}`
      );
      updateComments({
        reviewId: review._id,
        comments: commentListData.commentList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (commentInputRef.current && setCommentInputHeight) {
      setCommentInputHeight(commentInputRef.current.offsetHeight);
    }
  }, [setCommentInputHeight]);

  return (
    <Box
      ref={commentInputRef}
      sx={{
        display: "flex",
        alignItems: "stretch",
        gap: "6px",
        position: openUserReviewModal ? "fixed" : "static",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        padding: openUserReviewModal ? { xs: "8px 16px", lg: "12px 20px" } : 0,
        boxShadow: openUserReviewModal
          ? "0px -1px 3px rgba(0, 0, 0, 0.20) "
          : "none",
      }}
    >
      <Box
        sx={{
          width: { xs: "36px", md: "40px" },
          height: { xs: "36px", md: "40px" },
          backgroundColor: "#ababab",
          borderRadius: "50%",
        }}
      ></Box>

      <TextField
        multiline
        value={comment}
        onChange={handleChangeComment}
        placeholder={`Comment as ${loggedInUsername || registeredUsername}`}
        sx={{
          flex: 1,
          "& .MuiOutlinedInput-root": {
            height: "100%",
            padding: "8px 12px",
            borderRadius: "8px",

            "& .MuiOutlinedInput-input": {
              padding: 0,
              color: "primary.main",
              fontSize: { xs: "0.9rem", md: "1rem" },
              lineHeight: 1.25,
            },
          },
        }}
      />

      <Button
        disabled={!comment ? true : false}
        sx={{
          minWidth: 0,
          padding: 0,
          cursor: comment && "pointer",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={handlePostComment}
      >
        <SendIcon
          sx={{
            alignSelf: "flex-end",
            color: comment ? "info.main" : "primary.light",
            fontSize: { xs: "1.6rem", md: "1.8rem" },
          }}
        />
      </Button>
    </Box>
  );
}

export default CommentInput;

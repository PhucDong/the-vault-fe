import { Box, Typography } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useReviewAppDispatch } from "../../services/hooks";
import { useSelector } from "react-redux";
import apiService from "../../services/apiService";
import { useEffect, useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import UserReviewModal from "./UserReviewModal";
import useUser from "../../hooks/useUser";

const customStyledActionDataContainer = {
  display: "flex",
  alignItems: "center",
  gap: "4px",

  "& .MuiSvgIcon-root": {
    fontSize: { xs: "1rem", sm: "1.1rem" },
    color: "primary.dark",
  },
  "& .MuiTypography-root": {
    fontSize: { xs: "0.9rem", sm: "1rem" },
    color: "primary.dark",
    fontWeight: 550,
  },
};

const customStyledActionContainer = {
  display: "flex",
  alignItems: "center",
  gap: "4px",

  "& .MuiSvgIcon-root": {
    fontSize: { xs: "1.4rem", sm: "1.6rem" },
    color: "primary.dark",
  },
  "& .MuiTypography-root": {
    fontSize: { xs: "0.95rem", sm: "1rem" },
    color: "primary.dark",
    fontWeight: 550,
  },
  "&:hover": {
    cursor: "pointer",
  },
};

function ReviewReactions(props) {
  const { review, setReviewList, comments } = props;
  const reviewId = review._id;
  const { updateReviewReactions } = useReviewAppDispatch();
  const [likes, setLikes] = useState(review?.likes);
  const [dislikes, setDislikes] = useState(review?.dislikes);
  const [openUserReviewModal, setOpenUserReviewModal] = useState(false);
  const { isTokenExpired } = useUser();
  const isLiked = useSelector(
    (state) => state.review.reactions[reviewId]?.isLiked
  );
  const isDisliked = useSelector(
    (state) => state.review.reactions[reviewId]?.isDisliked
  );
  const { updateComments } = useReviewAppDispatch();

  const handleCloseUserReviewModal = () => setOpenUserReviewModal(false);

  const handleUserReaction = async (targetType, targetId, emoji) => {
    updateReviewReactions({ emoji, reviewId: targetId });

    await apiService.post("/reactions", {
      targetId,
      targetType,
      emoji,
    });

    const fetchedReview = await apiService.get(`/reviews/${reviewId}`);
    setLikes(fetchedReview.review.likes);
    setDislikes(fetchedReview.review.dislikes);
  };

  const handleFetchCommentList = async () => {
    setOpenUserReviewModal(true);

    try {
      const response = await apiService.get(`/comments?reviewId=${review._id}`);
      // console.log("Comment list: ", response.commentList);
      updateComments({ reviewId, comments: response.commentList });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const hasRun = localStorage.getItem(`hasRun-${reviewId}`);

    if (!hasRun) {
      if (review?.likes?.includes(isTokenExpired.currentUserId)) {
        updateReviewReactions({ emoji: "like", reviewId });
      } else if (review?.dislikes?.includes(isTokenExpired.currentUserId)) {
        updateReviewReactions({ emoji: "dislike", reviewId });
      }

      localStorage.setItem(`hasRun-${reviewId}`, "true");
    }
  }, []);

  return (
    <>
      {/* DATA: likes, dislikes, & comments */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: { xs: "12px", lg: "16px" },
        }}
      >
        {/* Likes, & dislikes */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Box sx={customStyledActionDataContainer}>
            <ThumbUpAltIcon />
            <Typography>{likes?.length}</Typography>
          </Box>
          <Box sx={customStyledActionDataContainer}>
            <ThumbDownAltIcon />
            <Typography>{dislikes?.length}</Typography>
          </Box>
        </Box>

        {/* Comments */}
        <Box sx={customStyledActionDataContainer}>
          <Typography>{comments?.length || 0}</Typography>
          <ChatBubbleIcon />
        </Box>
      </Box>

      {/* INTERACTIONS: like, dislike, comment */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Like & dislike */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Box
            onClick={() => handleUserReaction("Reviews", reviewId, "like")}
            sx={customStyledActionContainer}
          >
            {isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
            <Typography>Like</Typography>
          </Box>

          <Box
            onClick={() => handleUserReaction("Reviews", reviewId, "dislike")}
            sx={customStyledActionContainer}
          >
            {isDisliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
            <Typography>Dislike</Typography>
          </Box>
        </Box>

        {/* Comment */}
        <Box
          onClick={handleFetchCommentList}
          sx={{
            ...customStyledActionContainer,
            "&:hover": { cursor: "pointer" },
          }}
        >
          <ChatBubbleOutlineIcon />
          <Typography sx={{ color: "primary.dark", fontWeight: 550 }}>
            Comment
          </Typography>
        </Box>

        <UserReviewModal
          review={review}
          setReviewList={setReviewList}
          openUserReviewModal={openUserReviewModal}
          handleCloseUserReviewModal={handleCloseUserReviewModal}
        />
      </Box>
    </>
  );
}

export default ReviewReactions;

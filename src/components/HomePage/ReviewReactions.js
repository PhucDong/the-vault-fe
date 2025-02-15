import { Box, Typography } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useReviewAppDispatch } from "../../services/hooks";
import { useSelector } from "react-redux";
import apiService from "../../services/apiService";

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
};

function ReviewReactions(props) {
  const { review, setLikes, setDislikes } = props;
  const reviewId = review._id;
  const { updateReactions } = useReviewAppDispatch();
  const isLiked = useSelector(
    (state) => state.review.reactions[reviewId]?.isLiked || false
  );
  const isDisliked = useSelector(
    (state) => state.review.reactions[reviewId]?.isDisliked || false
  );

  const handleUserReaction = async (targetType, targetId, emoji) => {
    updateReactions({ emoji, reviewId });

    await apiService.post("/reactions", {
      targetId,
      targetType,
      emoji,
    });

    const fetchedReviewData = await apiService.get(`/reviews/${reviewId}`);
    setLikes(fetchedReviewData.review.likes);
    setDislikes(fetchedReviewData.review.dislikes);
  };


  return (
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
        onClick={() => console.log("Comment!")}
        sx={customStyledActionContainer}
      >
        <ChatBubbleOutlineIcon />
        <Typography sx={{ color: "primary.dark", fontWeight: 550 }}>
          Comment
        </Typography>
      </Box>
    </Box>
  );
}

export default ReviewReactions;

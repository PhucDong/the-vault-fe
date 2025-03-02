import { Box } from "@mui/material";
import UserReviewComment from "./UserReviewComment";

function CommentSection(props) {
  const { review, comments, openReviewModal } = props;

  return (
    <>
      {comments?.length > 0 && openReviewModal && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {comments?.map((comment, index) => (
            <UserReviewComment key={index} comment={comment} review={review} />
          ))}
        </Box>
      )}
    </>
  );
}

export default CommentSection;

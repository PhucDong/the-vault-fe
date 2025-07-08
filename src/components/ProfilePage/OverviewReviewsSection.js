import { Box } from "@mui/material";
import UserReview from "../HomePage/UserReview";
import { useState } from "react";

function OverviewReviewsSection(props) {
  const { user } = props;
  const [reviewList, setReviewList] = useState(user?.reviews);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "8px", md: "12px", lg: "16px" },
      }}
    >
      {reviewList.map((review) => (
        <UserReview
          key={review._id}
          review={review}
          setReviewList={setReviewList}
        />
      ))}
    </Box>
  );
}

export default OverviewReviewsSection;

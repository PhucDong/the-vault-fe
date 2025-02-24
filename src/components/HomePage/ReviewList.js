import { Box } from "@mui/material";
import UserReview from "./UserReview";
import { useEffect, useState } from "react";
import apiService from "../../services/apiService";

function ReviewList() {
  const [reviewList, setReviewList] = useState(null);

  useEffect(() => {
    const fetchReviewList = async () => {
      try {
        const response = await apiService.get("/reviews");
        setReviewList(response.reviewList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviewList();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "8px", md: "12px", lg: "16px" },
      }}
    >
      {reviewList?.map((review, index) => (
        <UserReview
          key={review._id}
          review={review}
          setReviewList={setReviewList}
        />
      ))}
    </Box>
  );
}

export default ReviewList;

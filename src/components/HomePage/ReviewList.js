import { Box } from "@mui/material";
import UserReview from "./UserReview";
import { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { useSelector } from "react-redux";
import { selectUserReviewSearchResult } from "../../store/slices/review/reviewSlice";
import { useReviewAppDispatch } from "../../services/hooks";
import NoSearchResultAlert from "../common/NoSearchResultAlert";

function ReviewList() {
  const [reviewList, setReviewList] = useState(null);
  const userReviewSearchResult = useSelector(selectUserReviewSearchResult);
  const searchValue = useSelector((state) => state.review.searchValue);
  const { fetchUserReviewSearchResultList } = useReviewAppDispatch();

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

  useEffect(() => {
    if (searchValue.length > 0) {
      fetchUserReviewSearchResultList({ searchValue });
    } else {
      fetchUserReviewSearchResultList({});
    }
  }, [searchValue]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "8px", md: "12px", lg: "16px" },
      }}
    >
      {!searchValue || searchValue.length === 0 ? (
        reviewList?.map((review) => (
          <UserReview
            key={review._id}
            review={review}
            setReviewList={setReviewList}
          />
        ))
      ) : userReviewSearchResult?.length > 0 ? (
        userReviewSearchResult?.map((review) => (
          <UserReview
            key={review._id}
            review={review}
            setReviewList={setReviewList}
          />
        ))
      ) : (
        <NoSearchResultAlert />
      )}
    </Box>
  );
}

export default ReviewList;

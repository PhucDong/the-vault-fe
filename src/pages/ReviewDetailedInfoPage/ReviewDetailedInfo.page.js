import { useParams } from "react-router-dom";
import DetailedReviewHeader from "../../components/ReviewDetailedInfoPage/DetailedReviewHeader";
import DetailedReviewContent from "../../components/ReviewDetailedInfoPage/DetailedReviewContent";
import { useEffect, useState } from "react";
import apiService from "../../services/apiService";

function ReviewDetailedInfoPage() {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    try {
      const fetchedReview = async () => {
        const response = await apiService.get(`/reviews/${reviewId}`);
        setReview(response.review);
      };

      fetchedReview();
    } catch (error) {
      console.log(error);
    }
  }, [reviewId]);

  return (
    <>
      {review && (
        <>
          <DetailedReviewHeader item={review} />
          <DetailedReviewContent item={review} />
        </>
      )}
    </>
  );
}

export default ReviewDetailedInfoPage;

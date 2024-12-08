import { useLoaderData } from "react-router-dom";
import DetailedReviewHeader from "../../components/ReviewDetailedInfoPage/DetailedReviewHeader";
import DetailedReviewContent from "../../components/ReviewDetailedInfoPage/DetailedReviewContent";

function ReviewDetailedInfoPage() {
  const review = useLoaderData();

  return (
    <>
      <DetailedReviewHeader item={review} />
      <DetailedReviewContent item={review} />
    </>
  );
}

export default ReviewDetailedInfoPage;

export const reviewDetailLoader = async ({ params }) => {
  const { reviewId } = params;

  const res = await fetch(`http://localhost:3800/reviewList/${reviewId}`);

  if (!res.ok) {
    throw Error("Review can't be found.");
  }

  return res.json();
};

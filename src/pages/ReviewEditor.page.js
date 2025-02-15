import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomPaddingLayout from "../components/common/CustomPaddingLayout";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/apiService";
import { useSelector } from "react-redux";
import ReviewFormat from "../components/ReviewEditorPage/ReviewFormat";
import ReviewTitle from "../components/ReviewEditorPage/ReviewTitle";
import ReviewText from "../components/ReviewEditorPage/ReviewText";
import ReviewScore from "../components/ReviewEditorPage/ReviewScore";
import { useAppSelector, useReviewAppDispatch } from "../services/hooks";
import { selectReviewFormat } from "../store/slices/review/reviewSlice";

function ReviewEditorPage() {
  const [errors, setErrors] = useState({});
  const { reviewId } = useParams();
  const format = useAppSelector(selectReviewFormat);
  const {
    fetchTitleListBasedOnFormat,
    updateReview,
    updateText,
    updateScore,
    updateTitle,
    updateTitleId,
    updateFormat,
  } = useReviewAppDispatch();
  const navigate = useNavigate();
  const title = useSelector((state) => state.review.title);
  const titleId = useSelector((state) => state.review.titleId);
  const text = useSelector((state) => state.review.text);
  const score = useSelector((state) => state.review.score);
  const loggedInCurrentUserId = useSelector(
    (state) => state.authentication.currentUserId
  );
  const loggedInAccessToken = useSelector(
    (state) => state.authentication.accessToken
  );
  const registeredCurrentUserId = useSelector(
    (state) => state.user.currentUserId
  );
  const registeredAccessToken = useSelector((state) => state.user.accessToken);

  const handlePostUserReview = async () => {
    apiService.defaults.headers.common.Authorization = `Bearer ${
      loggedInAccessToken || registeredAccessToken
    }`;

    const numericValue = parseFloat(score);
    const errorMessages = {};

    try {
      if (!title) {
        errorMessages.title = "Title is required.";
      }

      if (!text || text.length <= 20) {
        errorMessages.text = "Text must be at least 20 characters long.";
      }

      if (isNaN(numericValue) || numericValue < 0 || numericValue > 10) {
        errorMessages.score =
          "Invalid score. It has to be a float between 0 and 10, inclusively.";
      }

      if (!/^\d+(\.\d{1})?$/.test(numericValue)) {
        errorMessages.score = "Score must have at most 1 decimal place.";
      }

      if (errorMessages.title || errorMessages.text || errorMessages.score) {
        setErrors(errorMessages);
      }

      await apiService.post("/reviews", {
        author: loggedInCurrentUserId || registeredCurrentUserId,
        targetType: `${format}s`,
        targetId: titleId,
        text,
        score,
      });
      navigate(-1);
    } catch (error) {
      errorMessages.duplicate = error.message;
      setErrors(errorMessages);
      console.log("Create review error: ", error);
    }
  };

  const handleUpdateUserReview = async () => {
    const errorMessages = {};
    const numericValue = parseFloat(score);

    try {
      if (!text || text.length <= 20) {
        errorMessages.text = "Text must be at least 20 characters long.";
      }

      if (isNaN(numericValue) || numericValue < 0 || numericValue > 10) {
        errorMessages.score =
          "Invalid score. It has to be a float between 0 and 10, inclusively.";
      }

      if (!/^\d+(\.\d{1})?$/.test(numericValue)) {
        errorMessages.score = "Score must have at most 1 decimal place.";
      }

      setErrors(errorMessages);
      await apiService.put(`/reviews/${reviewId}`, {
        text: text,
        score: score,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!reviewId) {
      updateReview({});
      updateText("");
      updateTitle("");
      updateScore("");
      updateTitleId("");
      updateFormat("Anime");
      return;
    }

    let isMounted = true;
    const fetchReview = async () => {
      try {
        const response = await apiService.get(`/reviews/${reviewId}`);
        if (isMounted) {
          updateReview(response.review);
          updateText(response.review.text);
          updateScore(response.review.score);
          updateTitle(response.review.title);
        } // Prevents state updates after unmount
      } catch (error) {
        console.error(error);
      }
    };

    fetchReview();
    return () => {
      isMounted = false;
    };
  }, [reviewId]);

  useEffect(() => {
    if (!reviewId) {
      fetchTitleListBasedOnFormat({ format });
    }
  }, [format, reviewId]);

  console.log("Errors: ", errors);

  return (
    <CustomPaddingLayout
      sx={{
        width: "100vw", // Force it to take full viewport width
        maxWidth: "100%", // Ensure it doesn't exceed the viewport
        marginTop: { xs: "24px", sm: "32px", md: "52px", lg: "72px" },
        marginBottom: { xs: "28px", md: "44px", lg: "56px" },
        display: "flex",
        flexDirection: "column",
        gap: { xs: "16px", md: "20px" },

        "& .MuiBox-root": {
          display: "flex",
          flexDirection: "column",
          gap: { xs: "4px", md: "6px" },
        },
      }}
    >
      {errors?.duplicate && (
        <Typography
          sx={{
            color: "error.main",
            fontWeight: 550,
            fontSize: { xs: "1rem", md: "1.1rem" },
          }}
        >
          {errors?.duplicate}
        </Typography>
      )}

      {!reviewId && (
        <>
          <ReviewFormat />
          <ReviewTitle errors={errors} setErrors={setErrors} />
        </>
      )}

      <ReviewText errors={errors} setErrors={setErrors} />
      <ReviewScore errors={errors} setErrors={setErrors} />

      <Button
        sx={{
          textTransform: "capitalize",
          backgroundColor: "info.main",
          color: "#fff",
          lineHeight: "100%",
          padding: { xs: "8px", sm: "12px" },
          fontSize: { xs: "1.1rem", sm: "1.2rem" },
          borderRadius: "8px",
        }}
        onClick={reviewId ? handleUpdateUserReview : handlePostUserReview}
      >
        {reviewId ? "Update" : "Post"}
      </Button>
    </CustomPaddingLayout>
  );
}

export default ReviewEditorPage;

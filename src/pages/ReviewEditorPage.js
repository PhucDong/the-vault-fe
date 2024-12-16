import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import CustomPaddingLayout from "../components/common/CustomPaddingLayout";
import { useAppSelector } from "../app/hooks";
import { selectUsername } from "../features/authentication/authenticationSlice";
import { useNavigate } from "react-router-dom";

function ReviewEditorPage() {
  const [reviewText, setReviewText] = useState("");
  const [errors, setErrors] = useState({});

  const handleChangeReviewText = (event) => setReviewText(event.target.value);
  const navigate = useNavigate();
  const username = useAppSelector(selectUsername);

  const submitReview = async () => {
    try {
      if (reviewText.length > 2000) {
        const postResponse = await fetch("http://localhost:3800/reviewList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            author: username,
            text: reviewText,
            likes: 0,
            dislikes: 0,
            score: 0,
          }),
        });

        if (!postResponse.ok) {
          throw new Error("Failed to submit review.");
        }
        setErrors({});
        navigate(-1);
      } else {
        setErrors({
          message: "The review length has to be more than 2000 letters.",
        });
      }
    } catch (error) {}
  };

  return (
    <CustomPaddingLayout
      sx={{
        marginTop: { xs: "24px", sm: "32px", md: "52px", lg: "72px" },
        marginBottom: { xs: "28px", md: "44px", lg: "56px" },
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <TextField
        fullWidth
        multiline
        minRows={6}
        value={reviewText}
        onChange={handleChangeReviewText}
        placeholder="Please write your review here."
        error={!!errors.message}
        helperText={errors.message}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& .MuiOutlinedInput-input": { color: "primary.main" },
          },
          "& .MuiFormHelperText-root": {
            margin: { xs: "4px 0 0 0", sm: "6px 0 0 0" },
            marginBottom: {
              xs: errors.message && "8px",
              sm: errors.message && "12px",
            },
            lineHeight: { xs: 1.25, sm: "100%" },
            fontWeight: 550,
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
          },
        }}
      />
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
        onClick={submitReview}
      >
        Post
      </Button>
    </CustomPaddingLayout>
  );
}

export default ReviewEditorPage;

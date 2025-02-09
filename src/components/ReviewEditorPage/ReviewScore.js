import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useReviewAppDispatch } from "../../services/hooks";

function ReviewScore(props) {
  const { errors, setErrors } = props;
  const score = useSelector((state) => state.review.score);
  const { updateScore } = useReviewAppDispatch();

  const handleChangeReviewScore = (event) => {
    const value = event.target.value;

    if (value) {
      setErrors({ ...errors, score: "" });
      updateScore(value.trim());
    } else {
      updateScore("");
    }
  };

  return (
    <TextField
      fullWidth
      value={score}
      onChange={handleChangeReviewScore}
      placeholder="Give your score here"
      error={!!errors.score}
      helperText={errors.score}
      sx={{
        width: { xs: "100%", sm: "50%", md: "40%", lg: "20%" },
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          padding: { xs: "10px 16px" },
          "& .MuiOutlinedInput-input": {
            padding: 0,
            color: "primary.main",
            fontSize: { xs: "1rem", md: "1.1rem" },
            display: "flex",
            alignItems: "center",
          },
        },
        "& .MuiFormHelperText-root": {
          margin: { xs: "4px 0 0 0", sm: "6px 0 0 0" },
          marginBottom: {
            xs: errors.score && "8px",
            sm: errors.score && "12px",
          },
          lineHeight: { xs: 1.25, sm: "100%" },
          fontWeight: 550,
          fontSize: { xs: "0.8rem", sm: "0.9rem" },
        },
      }}
    />
  );
}

export default ReviewScore;

import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useReviewAppDispatch } from "../../services/hooks";

function ReviewText(props) {
  const { errors, setErrors } = props;
  const text = useSelector((state) => state.review.text);
  const { updateText } = useReviewAppDispatch();

  const handleChangeReviewText = (event) => {
    const value = event.target.value;

    if (value) {
      if (value.length === 20) {
        setErrors({ ...errors, text: "" });
      }

      updateText(value);
    } else {
      updateText("");
    }
  };

  return (
    <TextField
      fullWidth
      multiline
      minRows={6}
      value={text}
      onChange={handleChangeReviewText}
      placeholder="Write your review here"
      error={!!errors.text}
      helperText={errors.text}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          "& .MuiOutlinedInput-input": {
            color: "primary.main",
            fontSize: { xs: "1rem" },
            display: "flex",
            alignItems: "center",
          },
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
  );
}

export default ReviewText;

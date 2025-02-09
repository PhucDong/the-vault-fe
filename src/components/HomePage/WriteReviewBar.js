import { Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function WriteReviewBar() {
  const navigate = useNavigate();

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Write your review here"
        sx={{
          marginTop: "24px",
          height: { xs: "42px", sm: "46px", md: "50px" },
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            padding: { xs: "4px 12px", sm: "6px 14px" },
            height: { xs: "100%" },
            display: "flex",
            alignItems: "center",
            gap: { xs: "6px" },
            "& .MuiOutlinedInput-input": {
              lineHeight: "100%",
              fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
              padding: 0,
              color: "primary.main",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
            },
          },
        }}
        onClick={() => navigate("/home/reviews/editor")}
      />
    </Box>
  );
}

export default WriteReviewBar;

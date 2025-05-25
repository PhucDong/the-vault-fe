import { Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useNavigate } from "react-router-dom";

function Review({ item, review }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "49%", xl: "32%" },
        height: { xs: "112px", md: "120px", lg: "132px" },
        border: "1px solid #A9A9A9",
        borderRadius: "8px",
        display: "flex",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => navigate(`/reviews/${review._id}`)}
    >
      {/* Image */}
      <Box
        sx={{
          borderRadius: "8px 0 0 8px",
          backgroundColor: "#D9D9D9",
          height: { xs: "112px", md: "120px", lg: "132px" },
          aspectRatio: "4/5",
        }}
      ></Box>

      {/* Text, author & likes */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "112px", md: "120px", lg: "132px" },
          textAlign: "left",
          padding: { xs: "12px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "primary.light",
            fontSize: { xs: "0.85rem", lg: "0.95rem" },
            fontWeight: 540,
            textTransform: "capitalize",
            lineHeight: 1.25,
          }}
        >
          {`${review.text.substring(0, 80)}...`}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "primary.main",
              fontSize: { xs: "0.85rem", lg: "0.95rem" },
              fontWeight: 540,
              textTransform: "capitalize",
            }}
          >
            {review.author.username}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              color: "primary.light",
              "& .MuiSvgIcon-root": {
                fontSize: { xs: "1.2rem", lg: "1.3rem" },
              },
            }}
          >
            <ThumbUpIcon />
            <Typography>{review.likes}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Review;

import { Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useNavigate } from "react-router-dom";
import { RichTextReadOnly } from "mui-tiptap";
import truncate from "html-truncate";
import useExtensions from "../../hooks/useExtensions";

function Review({ item, review }) {
  const navigate = useNavigate();

  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "48.95%", lg: "49%", xl: "32%" },
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

          "& .MuiTiptap-RichTextContent-root .ProseMirror p": {
            fontSize: { xs: "0.95rem", md: "1rem" },
            color: "primary.light",
            fontWeight: 550,
            textTransform: "capitalize",
            lineHeight: 1.25,
          },
        }}
      >
        <RichTextReadOnly
          content={truncate(review?.text, 80, {
            ending: "...",
          })}
          extensions={extensions}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
                backgroundColor: "#D9D9D9",
                height: { xs: "32px", md: "36px", lg: "40px", xl: "44px" },
                width: { xs: "32px", md: "36px", lg: "40px", xl: "44px" },
              }}
            >
              <img
                src={review.author.profilePic}
                alt={review.author.username}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                }}
              />
            </Box>

            <Typography
              sx={{
                color: "primary.main",
                fontSize: {
                  xs: "0.8rem",
                  md: "0.85rem",
                  lg: "0.9rem",
                  xl: "0.95rem",
                },
                fontWeight: 540,
                textTransform: "capitalize",
              }}
            >
              {review.author.username}
            </Typography>
          </Box>

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
            <Typography>{review.likes.length}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Review;

import { Box, Button, Typography } from "@mui/material";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { RichTextReadOnly } from "mui-tiptap";
import truncate from "html-truncate";
import useExtensions from "../../hooks/useExtensions";

function DetailedReviewContent(props) {
  const { item } = props;

  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });

  return (
    <CustomPaddingLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",

          "& .MuiTiptap-RichTextContent-root .ProseMirror p": {
            fontSize: { xs: "1rem", md: "1.1rem" },
            color: "primary.main",
            fontWeight: 550,
            lineHeight: 1.5,
          },
        }}
      >
        {/* Review content */}
        <RichTextReadOnly
          content={truncate(item.text)}
          extensions={extensions}
        />

        {/* Score */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: "8px", md: "12px" },
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "info.main",
            borderRadius: "8px",
            padding: { xs: "16px 0" },
            width: { xs: "100%", sm: "200px" },
            margin: { xs: 0, sm: "0 auto" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.2rem", md: "1.3rem" },
              color: "primary.main",
              fontWeight: 520,
            }}
          >
            Final Verdict
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.1rem" },
              fontWeight: 600,
              color: "#fff",
            }}
          >{`${item.score}/10`}</Typography>
        </Box>

        {/* Likes & dislikes buttons */}
        <Box sx={{ margin: "0 auto" }}>
          <Box
            sx={{
              display: "flex",
              gap: "32px",
              alignItems: "center",
              "& .MuiButtonBase-root": {
                padding: 0,
                "& .MuiSvgIcon-root": {
                  marginRight: "4px",
                  fontSize: { xs: "2rem", md: "2.2rem" },
                },
                "& .MuiTypography-root": {
                  fontWeight: 550,
                  fontSize: { xs: "1.4rem", md: "1.6rem" },
                },
              },
            }}
          >
            <Button onClick={() => console.log("Liked!")}>
              <ThumbUpIcon sx={{ color: "info.main" }} />
              <Typography sx={{ color: "info.main" }}>
                {item.likes.length}
              </Typography>
            </Button>
            <Button onClick={() => console.log("Disliked!")}>
              <ThumbDownIcon sx={{ color: "error.main" }} />
              <Typography sx={{ color: "error.main" }}>
                {item.dislikes.length}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </CustomPaddingLayout>
  );
}

export default DetailedReviewContent;

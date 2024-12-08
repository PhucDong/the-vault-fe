import { Box, Typography } from "@mui/material";

function AnimeRecommendation({ item }) {
  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <Box
        sx={{
          backgroundColor: "#D9D9D9",
          aspectRatio: "3/4", // Adjust height relative to width with 3/4 ratio
          marginBottom: "6px",
          borderRadius: "8px",
        }}
      ></Box>

      {/* Title */}
      <Typography
        sx={{
          textAlign: "left",
          color: "primary.dark",
          fontWeight: 550,
          lineHeight: { xs: 1.25, md: 1.35 },
          fontSize: { xs: "1rem" },
        }}
      >
        {item.title}
      </Typography>
    </Box>
  );
}

export default AnimeRecommendation;

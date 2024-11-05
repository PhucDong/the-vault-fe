import { Box, Typography } from "@mui/material";

function AnimeItem({ anime }) {
  return (
    <Box
      sx={{
        width: "100%", // Takes full width of the Grid item
      }}
    >
      {/* Item image */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "5 / 6.5", // Maintains a consistent aspect ratio
          backgroundColor: "#ABABAB",
          marginBottom: "6px",
        }}
      ></Box>

      {/* Item title */}
      <Box sx={{ maxWidth: "100%" }}>
        <Typography
          sx={{
            fontSize: { xs: "0.875rem", md: "0.975rem", lg: "1rem" },
            fontWeight: 600,
            lineHeight: 1.25,
            color: "primary.dark",
            textOverflow: "ellipsis", // Prevents long titles from breaking layout
          }}
        >
          {anime.title}
        </Typography>
      </Box>
    </Box>
  );
}

export default AnimeItem;

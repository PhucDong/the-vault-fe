import { Box, Typography } from "@mui/material";

function AnimeItem({ anime }) {
  return (
    <Box sx={{ flex: 1 }}>
      <Box
        sx={{
          width: "110px",
          height: "174px",
          backgroundColor: "#ABABAB",
          marginBottom: "6px",
        }}
      ></Box>

      <Box>
        <Typography
          sx={{ fontSize: "14px", fontWeight: 600, lineHeight: 1.25 }}
        >
          {anime.title}
        </Typography>
      </Box>
    </Box>
  );
}

export default AnimeItem;

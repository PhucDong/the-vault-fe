import { Box, Typography } from "@mui/material";

function MangaItem({ manga }) {
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
        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
          {manga.title}
        </Typography>
      </Box>
    </Box>
  );
}

export default MangaItem;

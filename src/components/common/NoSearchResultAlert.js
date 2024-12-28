import { Box, Typography } from "@mui/material";

function NoSearchResultAlert() {
  return (
    <Box sx={{ "& .MuiTypography-root": { color: "primary.main" } }}>
      <Typography
        sx={{
          fontSize: { xs: "1.4rem", md: "1.6rem" },
          fontWeight: 550,
          marginBottom: { xs: "8px" },
        }}
      >
        Hmmm...no search results found
      </Typography>
      <Typography
        sx={{
          lineHeight: { xs: 1.25, md: 1.35 },
          fontSize: { md: "1.1rem" },
        }}
      >
        Please check the spelling, try a different search term, or check if you
        forgot to select any advanced filters.
      </Typography>
    </Box>
  );
}

export default NoSearchResultAlert;

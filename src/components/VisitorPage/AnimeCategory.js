import { Box, Typography } from "@mui/material";
// import Grid from "@mui/material/Grid2";
import { Link, useLocation, useParams } from "react-router-dom";
import AnimeItem from "./AnimeItem";

function AnimeCategory({ animeCategory }) {
  const { categoryName } = useParams();
  const location = useLocation();

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: { xs: "8px", sm: "12px", lg: "16px" },
          "& .MuiTypography-root": {
            fontSize: { xs: "1.1rem", sm: "1.2rem" },
            fontWeight: 600,
            color: "primary.main",
            textTransform: "uppercase",
          },
          "& a": {
            textDecoration: "none",
            color: "info.main",
            fontWeight: 550,
            lineHeight: "100%",
            fontSize: { xs: "1rem", sm: "1.125rem" },
          },
        }}
      >
        <Typography>{animeCategory.heading}</Typography>
        {!categoryName && (
          <Link
            to={
              location.pathname === "/"
                ? `animes/${animeCategory.category}`
                : `${animeCategory.category}`
            }
          >
            View All
          </Link>
        )}
      </Box>

      {/* Body */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(3, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(5, 1fr)",
            lg: "repeat(6, 1fr)",
          },
          gap: { xs: "12px 8px", sm: "16px 12px" }, // Sets consistent gap between items
        }}
      >
        {animeCategory.animeList.map((anime, index) => (
          <AnimeItem key={index} anime={anime} />
        ))}
      </Box>
    </Box>
  );
}

export default AnimeCategory;

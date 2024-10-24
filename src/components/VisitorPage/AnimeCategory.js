import { Box, Typography } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import AnimeItem from "./AnimeItem";

function AnimeCategory({ animeCategory }) {
  const { categoryName } = useParams();
  const location = useLocation();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
          "& .MuiTypography-root": {
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "primary.main",
          },
          "& a": {
            textDecoration: "none",
            color: "info.main",
            fontWeight: 550,
            lineHeight: "100%",
            fontSize: "1.125rem",
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

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          gap: "12px 8px",
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

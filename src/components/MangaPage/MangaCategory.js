import { Box, Typography } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import MangaItem from "./MangaItem";
function MangaCategory({ mangaCategory }) {
  const { categoryName } = useParams();

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
          },
        }}
      >
        <Typography>{mangaCategory.category}</Typography>
        {!categoryName && (
          <NavLink to={`animes/${mangaCategory.path}`}>View All</NavLink>
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
        {mangaCategory.mangaList.map((manga, index) => (
          <MangaItem key={index} manga={manga} />
        ))}
      </Box>
    </Box>
  );
}

export default MangaCategory;

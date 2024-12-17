import { Box, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ItemCard from "./ItemCard";

function ItemCategory(props) {
  const { itemCategory } = props;
  const { categoryName } = useParams();

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
        <Typography>{itemCategory.heading}</Typography>

        {!categoryName && (
          <Link
            to={
              itemCategory.format === "anime"
                ? `/search/animes/${itemCategory.category}`
                : `/search/mangas/${itemCategory.category}`
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
        {itemCategory.animeList.map((anime, index) => (
          <ItemCard key={index} item={anime} format={itemCategory.format} />
        ))}
      </Box>
    </Box>
  );
}

export default ItemCategory;

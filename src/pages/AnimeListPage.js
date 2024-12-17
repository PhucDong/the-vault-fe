import { Box } from "@mui/material";
import ItemCategory from "../components/VisitorPage/ItemCategory";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import ItemCard from "../components/VisitorPage/ItemCard";
import { selectAnimeSearchResultList } from "../features/anime/animeSlice";

const animeCategoryList = [
  {
    heading: "Trending Now",
    category: "trending",
    format: "TV",
  },
  {
    heading: "Popular This Season",
    category: "this-season",
    format: "TV",
  },
  {
    heading: "Upcoming Next Season",
    category: "next-season",
    format: "TV",
  },
  {
    heading: "All Time Popular",
    category: "popular",
    format: "TV",
  },
  {
    heading: "Top 100 Animes",
    category: "top-100-animes",
    format: "TV",
  },
];

function AnimeListPage() {
  const animeList = useLoaderData();
  const animeSearchResultList = useSelector(selectAnimeSearchResultList);

  animeCategoryList.forEach((animeCategory) => {
    const filteredAnimeList = animeList.filter((anime) =>
      anime.categoryList.includes(animeCategory.category)
    );

    animeCategory.animeList = filteredAnimeList;
  });

  return (
    <Box
      sx={{
        display: animeSearchResultList ? "block" : "flex",
        flexDirection: "column",
        gap: { xs: "48px", md: "60px" },
      }}
    >
      {!animeSearchResultList ? (
        animeCategoryList.map((animeCategory, index) => (
          <ItemCategory key={index} itemCategory={animeCategory} />
        ))
      ) : (
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
          {animeSearchResultList.map((animeSearchResult, index) => (
            <ItemCard
              key={index}
              item={animeSearchResult}
              format={animeSearchResult.format}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default AnimeListPage;

export const animeListLoader = async () => {
  const response = await fetch("http://localhost:3200/animeList");

  if (!response.ok) {
    throw new Error("Failed to fetch anime list");
  }

  return response.json();
};

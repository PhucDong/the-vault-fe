import { Box } from "@mui/material";
import ItemCategory from "../components/VisitorPage/ItemCategory";
import { useLoaderData } from "react-router-dom";

const animeCategoryList = [
  {
    heading: "Trending Now",
    category: "trending",
    format: "anime",
  },
  {
    heading: "Popular This Season",
    category: "this-season",
    format: "anime",
  },
  {
    heading: "Upcoming Next Season",
    category: "next-season",
    format: "anime",
  },
  {
    heading: "All Time Popular",
    category: "popular",
    format: "anime",
  },
  {
    heading: "Top 100 Animes",
    category: "top-100-animes",
    format: "anime",
  },
];

function AnimeListPage() {
  const animeList = useLoaderData();

  animeCategoryList.forEach((animeCategory) => {
    const filteredAnimeList = animeList.filter((anime) =>
      anime.categoryList.includes(animeCategory.category)
    );

    animeCategory.animeList = filteredAnimeList;
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "48px", md: "60px" },
      }}
    >
      {animeCategoryList.map((animeCategory, index) => (
        <ItemCategory key={index} itemCategory={animeCategory} />
      ))}
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

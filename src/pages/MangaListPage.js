import { Box } from "@mui/material";
import ItemCategory from "../components/VisitorPage/ItemCategory";
import { useLoaderData } from "react-router-dom";

const mangaCategoryList = [
  {
    heading: "Trending Now",
    category: "trending",
    format: "manga",
  },
  {
    heading: "All Time Popular",
    category: "popular",
  },
  {
    heading: "Top 100 Mangas",
    category: "top-100-mangas",
  },
];

function MangaListPage() {
  const mangaList = useLoaderData();

  mangaCategoryList.forEach((mangaCategory) => {
    const filteredMangaList = mangaList.filter((anime) =>
      anime.categoryList.includes(mangaCategory.category)
    );

    mangaCategory.animeList = filteredMangaList;
  });

  localStorage.setItem("mangaCategoryList", JSON.stringify(mangaCategoryList));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "48px", md: "60px" },
      }}
    >
      {mangaCategoryList.map((mangaCategory, index) => (
        <ItemCategory key={index} itemCategory={mangaCategory} />
      ))}
    </Box>
  );
}

export default MangaListPage;

export const mangaListLoader = async () => {
  const response = await fetch("http://localhost:3300/mangaList");

  if (!response.ok) {
    throw new Error("Failed to fetch manga list");
  }

  return response.json();
};

import { Box } from "@mui/material";
import ItemCategory from "../components/VisitorPage/ItemCategory";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMangaSearchResultList } from "../features/manga/mangaSlice";
import ItemCard from "../components/VisitorPage/ItemCard";

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
  const mangaSearchResultList = useSelector(selectMangaSearchResultList);

  mangaCategoryList.forEach((mangaCategory) => {
    const filteredMangaList = mangaList.filter((anime) =>
      anime.categoryList.includes(mangaCategory.category)
    );

    mangaCategory.animeList = filteredMangaList;
  });

  return (
    <Box
      sx={{
        display: mangaSearchResultList ? "block" : "flex",
        flexDirection: "column",
        gap: { xs: "48px", md: "60px" },
      }}
    >
      {!mangaSearchResultList ? (
        mangaCategoryList.map((mangaCategory, index) => (
          <ItemCategory key={index} itemCategory={mangaCategory} />
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
          {mangaSearchResultList.map((mangaSearchResult, index) => (
            <ItemCard
              key={index}
              item={mangaSearchResult}
              format={mangaSearchResult.format}
            />
          ))}
        </Box>
      )}
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

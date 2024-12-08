import { Box } from "@mui/material";
import AnimeCategory from "../components/VisitorPage/ItemCategory";
import { useLoaderData, useParams } from "react-router-dom";
import { useCallback } from "react";

function MangaListByCategoryPage() {
  const { categoryName } = useParams();
  // const mangaCategoryList = useLoaderData();
  const mangaCategoryList = localStorage.getItem("mangaCategoryList");

  const getMangaCategoryList = useCallback(() => {
    const allowedMangaCategoryList = ["trending", "popular", "top-100-mangas"];
    if (categoryName && allowedMangaCategoryList.includes(categoryName)) {
      const filteredAnimeCategory = JSON.parse(mangaCategoryList).filter(
        (category) => category.category === categoryName
      );

      return filteredAnimeCategory;
    } else {
      throw new Error(`Category ${categoryName} doesn't exist`);
    }
  }, [categoryName, mangaCategoryList]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {getMangaCategoryList().map((animeCategory, index) => (
        <AnimeCategory key={index} animeCategory={animeCategory} />
      ))}
    </Box>
  );
}

export default MangaListByCategoryPage;

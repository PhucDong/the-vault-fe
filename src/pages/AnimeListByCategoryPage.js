import { Box } from "@mui/material";
import AnimeCategory from "../components/VisitorPage/AnimeCategory";
import { useLoaderData, useParams } from "react-router-dom";
import { useCallback } from "react";

function AnimeListByCategoryPage() {
  const { categoryName } = useParams();
  const animeCategoryList = useLoaderData();

  const getAnimeCategoryList = useCallback(() => {
    const allowedAnimeCategoryList = [
      "trending",
      "popular",
      "this-season",
      "next-season",
      "top-100-animes",
    ];
    if (categoryName && allowedAnimeCategoryList.includes(categoryName)) {
      const filteredAnimeCategory = animeCategoryList.filter(
        (category) => category.category === categoryName
      );

      return filteredAnimeCategory;
    } else {
      throw new Error("Category doesn't exist");
    }
  }, [categoryName, animeCategoryList]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {getAnimeCategoryList().map((animeCategory, index) => (
        <AnimeCategory key={index} animeCategory={animeCategory} />
      ))}
    </Box>
  );
}

export default AnimeListByCategoryPage;

// export const animeCategoryListLoader = async () => {
//   const response = await fetch("http://localhost:4000/animeCategoryList");

//   if (!response.ok) {
//     throw new Error("Failed to fetch anime category list");
//   }

//   return response.json();
// };

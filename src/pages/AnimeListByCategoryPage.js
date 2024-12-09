import { Box } from "@mui/material";
import ItemCategory from "../components/VisitorPage/ItemCategory";
import { useLocation, useParams } from "react-router-dom";
import { useCallback } from "react";

function AnimeListByCategoryPage() {
  const { categoryName } = useParams();
  const location = useLocation();

  const getAnimeCategoryList = useCallback(() => {
    const allowedAnimeCategoryList = [
      "trending",
      "popular",
      "this-season",
      "next-season",
      "top-100-animes",
    ];
    if (
      location.state.itemCategoryList &&
      allowedAnimeCategoryList.includes(categoryName)
    ) {
      const filteredAnimeCategory = location.state.itemCategoryList.filter(
        (category) => category.category === categoryName
      );

      return filteredAnimeCategory;
    } else {
      throw new Error(`Category ${categoryName} doesn't exist`);
    }
  }, [categoryName, location.state.itemCategoryList]);

  // console.log("Anime category list: ", getAnimeCategoryList());

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {getAnimeCategoryList().map((animeCategory, index) => (
        <ItemCategory key={index} itemCategory={animeCategory} />
      ))}
    </Box>
  );
}

export default AnimeListByCategoryPage;

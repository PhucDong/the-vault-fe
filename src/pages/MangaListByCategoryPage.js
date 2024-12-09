import { Box } from "@mui/material";
import ItemCategory from "../components/VisitorPage/ItemCategory";
import { useLocation, useParams } from "react-router-dom";
import { useCallback } from "react";

function MangaListByCategoryPage() {
  const { categoryName } = useParams();
  const location = useLocation();

  const getMangaCategoryList = useCallback(() => {
    const allowedMangaCategoryList = ["trending", "popular", "top-100-mangas"];
    if (
      location.state.itemCategoryList &&
      allowedMangaCategoryList.includes(categoryName)
    ) {
      const filteredAnimeCategory = location.state.itemCategoryList.filter(
        (category) => category.category === categoryName
      );

      return filteredAnimeCategory;
    } else {
      throw new Error(`Category ${categoryName} doesn't exist`);
    }
  }, [categoryName, location.state.itemCategoryList]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {getMangaCategoryList().map((mangaCategory, index) => (
        <ItemCategory key={index} itemCategory={mangaCategory} />
      ))}
    </Box>
  );
}

export default MangaListByCategoryPage;

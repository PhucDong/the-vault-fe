import { Box } from "@mui/material";
import ItemCategory from "../components/VisitorPage/ItemCategory";
import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectAnimeSearchResultList,
  selectCategorizedAnimeList,
} from "../features/anime/animeSlice";
import { useAnimeAppDispatch } from "../app/hooks";
import NoSearchResultAlert from "../components/common/NoSearchResultAlert";
import ItemCard from "../components/VisitorPage/ItemCard";

function AnimeListByCategoryPage() {
  const { categoryName } = useParams();
  // const animeCategoryList = useLoaderData();
  const categorizedAnimeList = useSelector(selectCategorizedAnimeList);
  const animeSearchResultList = useSelector(selectAnimeSearchResultList);
  const { fetchCategorizedAnimeList } = useAnimeAppDispatch();

  // console.log("Anime search results: ", animeSearchResultList);

  useEffect(() => {
    if (categoryName) {
      // console.log("Category name: ", categoryName);
      // console.log("Categorized anime list: ", categorizedAnimeList);
      fetchCategorizedAnimeList({ categoryName });
    }
  }, [categoryName]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {animeSearchResultList?.length === 0 ? (
        <NoSearchResultAlert />
      ) : animeSearchResultList?.length > 0 ? (
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
          {animeSearchResultList?.map((animeSearchResult, index) => (
            <ItemCard
              key={index}
              item={animeSearchResult}
              format={animeSearchResult.format}
            />
          ))}
        </Box>
      ) : (
        categorizedAnimeList?.map((animeCategory, index) => (
          <ItemCategory key={index} itemCategory={animeCategory} />
        ))
      )}
    </Box>
  );
}

export default AnimeListByCategoryPage;

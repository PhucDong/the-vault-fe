import { Box } from "@mui/material";
import ItemCategory from "../components/VisitorPage/ItemCategory";
import { useSelector } from "react-redux";
import ItemCard from "../components/VisitorPage/ItemCard";
import {
  selectAnimeSearchResultList,
  selectCategorizedAnimeList,
} from "../features/anime/animeSlice";
import { useEffect } from "react";
import { useAnimeAppDispatch } from "../app/hooks";
import NoSearchResultAlert from "../components/common/NoSearchResultAlert";

function AnimeListPage() {
  const { fetchCategorizedAnimeList } = useAnimeAppDispatch();
  const categorizedAnimeList = useSelector(selectCategorizedAnimeList);
  const animeSearchResultList = useSelector(selectAnimeSearchResultList);
  // console.log("Anime search results: ", animeSearchResultList);

  useEffect(() => {
    if (!animeSearchResultList) {
      fetchCategorizedAnimeList({});
    }
  }, [animeSearchResultList]);

  return (
    <Box
      sx={{
        display: animeSearchResultList ? "block" : "flex",
        flexDirection: "column",
        gap: { xs: "48px", md: "60px" },
      }}
    >
      {!animeSearchResultList &&
      categorizedAnimeList &&
      categorizedAnimeList.length > 0 ? (
        categorizedAnimeList?.map((animeCategory, index) => (
          <ItemCategory key={index} itemCategory={animeCategory} />
        ))
      ) : animeSearchResultList?.length === 0 ? (
        <NoSearchResultAlert />
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
          {animeSearchResultList?.map((animeSearchResult, index) => (
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

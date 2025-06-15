import { Box, useMediaQuery } from "@mui/material";
import ItemCategory from "../components/VisitorPage/ItemCategory";
import { useSelector } from "react-redux";
import ItemCard from "../components/VisitorPage/ItemCard";
import { useEffect } from "react";
import NoSearchResultAlert from "../components/common/NoSearchResultAlert";
import storage from "redux-persist/lib/storage";
import {
  selectAnimeSearchResultList,
  selectCategorizedAnimeList,
} from "../store/slices/anime/animeSlice";
import { useAnimeAppDispatch } from "../services/hooks";

function AnimeListPage() {
  const {
    fetchAnimeSearchResultList,
    fetchCategorizedAnimeList,
    clearCategorizedAnimeList,
  } = useAnimeAppDispatch();
  const categorizedAnimeList = useSelector(selectCategorizedAnimeList);
  const animeSearchResultList = useSelector(selectAnimeSearchResultList);
  const yearOption = useSelector((state) => state.anime.yearOption);
  const airingStatusOption = useSelector(
    (state) => state.anime.airingStatusOption
  );
  const seasonOption = useSelector((state) => state.anime.seasonOption);
  const genreOptionList = useSelector((state) => state.anime.genreOptionList);
  const studioOption = useSelector((state) => state.anime.studioOption);
  const searchValue = useSelector((state) => state.anime.searchValue);
  const isMediumScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );

  useEffect(() => {
    if (!animeSearchResultList) {
      return;
    }

    clearCategorizedAnimeList();

    // Clear only categorizedAnimeList from the persisted state
    storage.getItem("persist:anime").then((persistedAnime) => {
      if (persistedAnime) {
        const parsedState = JSON.parse(persistedAnime);
        delete parsedState.categorizedAnimeList;
        storage.setItem("persist:anime", JSON.stringify(parsedState));
      }
    });
  }, [animeSearchResultList]);

  useEffect(() => {
    if (
      searchValue ||
      yearOption ||
      airingStatusOption ||
      seasonOption ||
      genreOptionList?.length > 0 ||
      studioOption
    ) {
      fetchAnimeSearchResultList({
        searchValue,
        yearOption,
        airingStatusOption,
        seasonOption,
        genreOptionList,
        studioOption,
      });
      return;
    }
    fetchCategorizedAnimeList({});
    fetchAnimeSearchResultList({});
  }, [
    searchValue,
    yearOption,
    airingStatusOption,
    seasonOption,
    genreOptionList,
    studioOption,
  ]);

  return (
    <Box
      sx={{
        display: animeSearchResultList ? "block" : "flex",
        flexDirection: "column",
        gap: { xs: "48px", md: "60px" },
        marginBottom: isMediumScreenWidthAndAbove ? 0 : "72px",
      }}
    >
      {categorizedAnimeList?.length > 0 ? (
        categorizedAnimeList?.map((animeCategory, index) => (
          <ItemCategory key={index} itemCategory={animeCategory} />
        ))
      ) : !animeSearchResultList || animeSearchResultList?.length === 0 ? (
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

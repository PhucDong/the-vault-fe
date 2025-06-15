import { Box, useMediaQuery } from "@mui/material";
import ItemCategory from "../components/VisitorPage/ItemCategory";
import { useSelector } from "react-redux";
import ItemCard from "../components/VisitorPage/ItemCard";
import { useEffect } from "react";
import NoSearchResultAlert from "../components/common/NoSearchResultAlert";
import storage from "redux-persist/lib/storage";
import { useMangaAppDispatch } from "../services/hooks";
import {
  selectCategorizedMangaList,
  selectMangaSearchResultList,
} from "../store/slices/manga/mangaSlice";

function MangaListPage() {
  const {
    fetchCategorizedMangaList,
    clearCategorizedMangaList,
    fetchMangaSearchResultList,
  } = useMangaAppDispatch();
  const categorizedMangaList = useSelector(selectCategorizedMangaList);
  const mangaSearchResultList = useSelector(selectMangaSearchResultList);
  const yearOption = useSelector((state) => state.manga.yearOption);
  const publishingStatusOption = useSelector(
    (state) => state.manga.publishingStatusOption
  );
  const genreOptionList = useSelector((state) => state.manga.genreOptionList);
  const searchValue = useSelector((state) => state.manga.searchValue);
  const isMediumScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );

  useEffect(() => {
    if (mangaSearchResultList) {
      clearCategorizedMangaList();

      // Clear only categorizedAnimeList from the persisted state
      storage.getItem("persist:manga").then((persistedManga) => {
        if (persistedManga) {
          const parsedState = JSON.parse(persistedManga);
          delete parsedState.categorizedMangaList;
          storage.setItem("persist:manga", JSON.stringify(parsedState));
        }
      });
    }
  }, [mangaSearchResultList]);

  useEffect(() => {
    if (
      searchValue ||
      yearOption ||
      publishingStatusOption ||
      genreOptionList?.length > 0
    ) {
      fetchMangaSearchResultList({
        searchValue,
        yearOption,
        publishingStatusOption,
        genreOptionList,
      });
    } else {
      fetchCategorizedMangaList({});
      fetchMangaSearchResultList({});
    }
  }, [searchValue, yearOption, publishingStatusOption, genreOptionList]);

  return (
    <Box
      sx={{
        display: mangaSearchResultList ? "block" : "flex",
        flexDirection: "column",
        gap: { xs: "48px", md: "60px" },
        marginBottom: isMediumScreenWidthAndAbove ? 0 : "72px",
      }}
    >
      {categorizedMangaList && categorizedMangaList.length > 0 ? (
        categorizedMangaList?.map((mangaCategory, index) => (
          <ItemCategory key={index} itemCategory={mangaCategory} />
        ))
      ) : !mangaSearchResultList || mangaSearchResultList?.length === 0 ? (
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
          {mangaSearchResultList?.map((mangaSearchResult, index) => (
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

import { Box } from "@mui/material";
import ItemCategory from "../components/VisitorPage/ItemCategory";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NoSearchResultAlert from "../components/common/NoSearchResultAlert";
import ItemCard from "../components/VisitorPage/ItemCard";
import storage from "redux-persist/lib/storage";
import {
  selectCategorizedMangaList,
  selectMangaSearchResultList,
} from "../store/slices/manga/mangaSlice";
import { useMangaAppDispatch } from "../services/hooks";

function MangaListByCategoryPage() {
  const { categoryName } = useParams();
  const categorizedMangaList = useSelector(selectCategorizedMangaList);
  const mangaSearchResultList = useSelector(selectMangaSearchResultList);
  const {
    fetchCategorizedMangaList,
    fetchMangaSearchResultList,
    clearCategorizedMangaList,
  } = useMangaAppDispatch();
  const yearOption = useSelector((state) => state.manga.yearOption);
  const publishingStatusOption = useSelector(
    (state) => state.manga.publishingStatusOption
  );
  const genreOptionList = useSelector((state) => state.manga.genreOptionList);
  const searchValue = useSelector((state) => state.manga.searchValue);

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
      genreOptionList?.length > 0 ||
      publishingStatusOption
    ) {
      fetchMangaSearchResultList({
        searchValue,
        yearOption,
        publishingStatusOption,
        genreOptionList,
      });
    } else {
      fetchCategorizedMangaList({ categoryName });
      fetchMangaSearchResultList({});
    }
  }, [
    searchValue,
    yearOption,
    publishingStatusOption,
    genreOptionList,
    categoryName,
  ]);

  useEffect(() => {
    if (categoryName) {
      fetchCategorizedMangaList({ categoryName });
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
      {mangaSearchResultList?.length === 0 ? (
        <NoSearchResultAlert />
      ) : mangaSearchResultList?.length > 0 ? (
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
      ) : (
        categorizedMangaList?.map((mangaCategory, index) => (
          <ItemCategory key={index} itemCategory={mangaCategory} />
        ))
      )}
    </Box>
  );
}

export default MangaListByCategoryPage;

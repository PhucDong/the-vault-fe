import { Box } from "@mui/material";
import ItemCategory from "../components/VisitorPage/ItemCategory";
import { useSelector } from "react-redux";
import {
  selectCategorizedMangaList,
  selectMangaSearchResultList,
} from "../features/manga/mangaSlice";
import ItemCard from "../components/VisitorPage/ItemCard";
import { useMangaAppDispatch } from "../app/hooks";
import { useEffect } from "react";
import NoSearchResultAlert from "../components/common/NoSearchResultAlert";

function MangaListPage() {
  // const mangaList = useLoaderData();
  const { fetchCategorizedMangaList } = useMangaAppDispatch();
  const categorizedMangaList = useSelector(selectCategorizedMangaList);
  const mangaSearchResultList = useSelector(selectMangaSearchResultList);
  // console.log("Manga search results: ", mangaSearchResultList);

  useEffect(() => {
    if (!mangaSearchResultList) {
      fetchCategorizedMangaList({});
    }
  }, [mangaSearchResultList]);

  return (
    <Box
      sx={{
        display: mangaSearchResultList ? "block" : "flex",
        flexDirection: "column",
        gap: { xs: "48px", md: "60px" },
      }}
    >
      {!mangaSearchResultList &&
      categorizedMangaList &&
      categorizedMangaList.length > 0 ? (
        categorizedMangaList?.map((mangaCategory, index) => (
          <ItemCategory key={index} itemCategory={mangaCategory} />
        ))
      ) : mangaSearchResultList?.length === 0 ? (
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

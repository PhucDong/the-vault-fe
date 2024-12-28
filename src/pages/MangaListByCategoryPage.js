import { Box } from "@mui/material";
import ItemCategory from "../components/VisitorPage/ItemCategory";
import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectCategorizedMangaList,
  selectMangaSearchResultList,
} from "../features/manga/mangaSlice";
import { useMangaAppDispatch } from "../app/hooks";
import NoSearchResultAlert from "../components/common/NoSearchResultAlert";
import ItemCard from "../components/VisitorPage/ItemCard";

function MangaListByCategoryPage() {
  const { categoryName } = useParams();
  // const mangaCategoryList = useLoaderData();
  const categorizedMangaList = useSelector(selectCategorizedMangaList);
  const mangaSearchResultList = useSelector(selectMangaSearchResultList);
  const { fetchCategorizedMangaList } = useMangaAppDispatch();

  console.log("Categorized manga list: ", categorizedMangaList);
  console.log("Manga search results: ", mangaSearchResultList);

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

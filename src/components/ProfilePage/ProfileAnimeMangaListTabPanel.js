import { Box, Pagination, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import CollectionItem from "./CollectionItem";

const animeCollection = [
  "Watching",
  "Completed",
  "On Hold",
  "Dropped",
  "Plan To Watch",
];

const mangaCollection = [
  "Reading",
  "Completed",
  "On Hold",
  "Dropped",
  "Plan To Read",
];

const ITEMS_PER_PAGE = 10;

function ProfileAnimeMangaListTabPanel(props) {
  const { value, index, itemList, panel } = props;
  // const [page, setPage] = useState(1);
  const [pageMap, setPageMap] = useState({}); // key: heading, value: current page

  const handleChangePage = (heading) => (event, newPage) => {
    // setPage(value);
    setPageMap((prev) => ({ ...prev, [heading]: newPage }));
  };

  const filteredItemCollection = useMemo(() => {
    if (panel === "animeList") {
      return animeCollection.map((heading) => {
        return {
          heading,
          itemList: itemList?.filter(
            (collection) => collection.status === heading
          ),
        };
      });
    } else if (panel === "mangaList") {
      return mangaCollection.map((heading) => {
        return {
          heading,
          itemList: itemList?.filter(
            (collection) => collection.status === heading
          ),
        };
      });
    }
  }, [itemList, panel]);

  // console.log("Filtered Item Collection: ", filteredItemCollection);

  return (
    <Box
      hidden={value !== index}
      sx={{
        display: value !== index ? "none" : "flex",
        flexDirection: "column",
        gap: { xs: "32px" },
      }}
    >
      {filteredItemCollection?.map((collection) => {
        const page = pageMap[collection.heading] || 1;
        const totalPages = Math.ceil(
          collection.itemList.length / ITEMS_PER_PAGE
        );
        const paginatedItemList = collection.itemList.slice(
          (page - 1) * ITEMS_PER_PAGE,
          page * ITEMS_PER_PAGE
        );
        // console.log("Paginated Item List: ", paginatedItemList);

        if (paginatedItemList.length > 0) {
          return (
            <Box
              key={collection.heading}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: "8px" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                {collection.heading}
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gap: { xs: "8px" },
                  overflow: "hidden",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  },
                }}
              >
                {paginatedItemList.map((item) => (
                  <CollectionItem key={item.itemId._id} item={item} />
                ))}
              </Box>

              {totalPages > 1 && (
                <Pagination
                  size="large"
                  hidePrevButton
                  hideNextButton
                  count={totalPages}
                  page={page}
                  onChange={handleChangePage(collection.heading)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
              )}
            </Box>
          );
        } else {
          return null;
        }
      })}
    </Box>
  );
}

export default ProfileAnimeMangaListTabPanel;

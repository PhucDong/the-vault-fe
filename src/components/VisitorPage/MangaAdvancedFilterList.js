import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import MangaGenreFilter from "../MangaSearchPage/MangaGenreFilter";
import MangaYearFilter from "../MangaSearchPage/MangaYearFilter";
import MangaStatusFilter from "../MangaSearchPage/MangaStatusFilter";

function MangaAdvancedFilterList() {
  const yearOption = useSelector((state) => state.manga.yearOption);
  const publishingStatusOption = useSelector(
    (state) => state.manga.publishingStatusOption
  );
  const genreOptionList = useSelector((state) => state.manga.genreOptionList);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: "12px", sm: "8px" },
        marginTop: "8px",
      }}
    >
      {/* Genres */}
      <MangaGenreFilter
        sx={{ flex: { xs: 1, sm: 2 } }}
        genreOptionList={genreOptionList}
      />

      {/* Year */}
      <MangaYearFilter sx={{ flex: { xs: 1 } }} yearOption={yearOption} />

      {/* Status */}
      <MangaStatusFilter
        sx={{ flex: { xs: 1 } }}
        statusOption={publishingStatusOption}
      />
    </Box>
  );
}

export default MangaAdvancedFilterList;

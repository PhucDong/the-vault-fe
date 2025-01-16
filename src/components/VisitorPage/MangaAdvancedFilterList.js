import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MangaGenreFilter from "../MangaSearchPage/MangaGenreFilter";
import MangaYearFilter from "../MangaSearchPage/MangaYearFilter";
import MangaStatusFilter from "../MangaSearchPage/MangaStatusFilter";
import { useMangaAppDispatch } from "../../services/hooks";

function MangaAdvancedFilterList() {
  const yearOption = useSelector((state) => state.manga.yearOption);
  const publishingStatusOption = useSelector(
    (state) => state.manga.publishingStatusOption
  );
  const genreOptionList = useSelector((state) => state.manga.genreOptionList);
  const { clearAllMangaFilter } = useMangaAppDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: {  xs: "12px", sm: "12px", md: "16px" },
        marginTop: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "12px", sm: "8px" },
        }}
      >
        <MangaGenreFilter
          sx={{ width: { xs: "100%", sm: "52%", lg: "60%" } }}
          genreOptionList={genreOptionList}
        />

        <MangaYearFilter
          sx={{ width: { xs: "100%", sm: "20%", lg: "20%" } }}
          yearOption={yearOption}
        />

        <MangaStatusFilter
          sx={{ width: { xs: "100%", sm: "28%", lg: "20%" } }}
          statusOption={publishingStatusOption}
        />
      </Box>

      <Typography
        onClick={() => clearAllMangaFilter()}
        sx={{ color: "info.main", cursor: "pointer" }}
      >
        Remove all filters
      </Typography>
    </Box>
  );
}

export default MangaAdvancedFilterList;

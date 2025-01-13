import { Box } from "@mui/material";
import { useEffect } from "react";
import AnimeYearFilter from "../AnimeSearchPage/AnimeYearFilter";
import AnimeStatusFilter from "../AnimeSearchPage/AnimeStatusFilter";
import AnimeSeasonFilter from "../AnimeSearchPage/AnimeSeasonFilter";
import AnimeGenreFilter from "../AnimeSearchPage/AnimeGenreFilter";
import AnimeStudioFilter from "../AnimeSearchPage/AnimeStudioFilter";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AnimeAdvancedFilterList() {
  const yearOption = useSelector((state) => state.anime.yearOption);
  const airingStatusOption = useSelector(
    (state) => state.anime.airingStatusOption
  );
  const seasonOption = useSelector((state) => state.anime.seasonOption);
  const genreOptionList = useSelector((state) => state.anime.genreOptionList);
  const studioOption = useSelector((state) => state.anime.studioOption);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      yearOption ||
      airingStatusOption ||
      seasonOption ||
      genreOptionList?.length > 0 ||
      studioOption
    ) {
      if (location.pathname === "/") {
        navigate("/animes");
      }
    }
  }, [
    yearOption,
    airingStatusOption,
    seasonOption,
    genreOptionList,
    studioOption,
    location.pathname,
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { sm: "12px", md: "16px" },
        marginTop: "8px",
      }}
    >
      {/* Genres & Studios filters */}
      <Box
        sx={{
          width: "100%",
          display: { xs: "flex" },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "12px", sm: "8px" },
        }}
      >
        {/* Genres */}
        <AnimeGenreFilter sx={{ flex: 1 }} genreOptionList={genreOptionList} />

        {/* Studios */}
        <AnimeStudioFilter sx={{ flex: 1 }} studioOption={studioOption} />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: { xs: "flex" },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "12px", sm: "8px" },
        }}
      >
        {/* Year */}
        <AnimeYearFilter sx={{ flex: 1 }} yearOption={yearOption} />

        {/* Status */}
        <AnimeStatusFilter sx={{ flex: 1 }} statusOption={airingStatusOption} />

        {/* Season */}
        <AnimeSeasonFilter sx={{ flex: 1 }} seasonOption={seasonOption} />
      </Box>
    </Box>
  );
}

export default AnimeAdvancedFilterList;

import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import AnimeYearFilter from "../AnimeSearchPage/AnimeYearFilter";
import AnimeStatusFilter from "../AnimeSearchPage/AnimeStatusFilter";
import AnimeSeasonFilter from "../AnimeSearchPage/AnimeSeasonFilter";
import AnimeGenreFilter from "../AnimeSearchPage/AnimeGenreFilter";
import AnimeStudioFilter from "../AnimeSearchPage/AnimeStudioFilter";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAnimeAppDispatch } from "../../services/hooks";

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
  const { clearAllAnimeFilter } = useAnimeAppDispatch();

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
        gap: { xs: "12px", sm: "12px", md: "16px" },
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
        <AnimeGenreFilter
          sx={{ width: { xs: "100%", sm: "65%", md: "75%", lg: "65%" } }}
          genreOptionList={genreOptionList}
        />

        {/* Studios */}
        <AnimeStudioFilter
          sx={{ width: { xs: "100%", sm: "35%", md: "25%", lg: "35%" } }}
          studioOption={studioOption}
        />
      </Box>

      {/* Year, Status & Season filters */}
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

      <Typography
        onClick={() => clearAllAnimeFilter()}
        sx={{ color: "info.main", cursor: "pointer" }}
      >
        Remove all filters
      </Typography>
    </Box>
  );
}

export default AnimeAdvancedFilterList;

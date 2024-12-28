import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import YearFilter from "../common/YearFilter";
import StatusFilter from "../common/StatusFilter";
import SeasonFilter from "../common/SeasonFilter";
import GenreFilter from "../common/GenreFilter";
import StudioFilter from "../common/StudioFilter";
import { useAnimeAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

function AnimeAdvancedFilterList() {
  const [yearOption, setYearOption] = useState(null);
  const [airingStatusOption, setAiringStatusOption] = useState("");
  const [seasonOption, setSeasonOption] = useState("");
  const [genreOptionList, setGenreOptionList] = useState([]);
  const [studioOption, setStudioOption] = useState("");
  const { fetchAnimeSearchResultList } = useAnimeAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      yearOption ||
      airingStatusOption ||
      seasonOption ||
      genreOptionList.length > 0 ||
      studioOption
    ) {
      navigate("/animes");
      fetchAnimeSearchResultList({
        yearOption,
        airingStatusOption,
        seasonOption,
        genreOptionList,
        studioOption,
      });
    } else {
      fetchAnimeSearchResultList({});
    }
  }, [yearOption, airingStatusOption, seasonOption, genreOptionList, studioOption]);

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
        <GenreFilter
          sx={{ flex: 1 }}
          genreOptionList={genreOptionList}
          setGenreOptionList={setGenreOptionList}
        />

        {/* Studios */}
        <StudioFilter
          sx={{ flex: 1 }}
          studioOption={studioOption}
          setStudioOption={setStudioOption}
        />
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
        <YearFilter
          sx={{ flex: 1 }}
          yearOption={yearOption}
          setYearOption={setYearOption}
        />

        {/* Status */}
        <StatusFilter
          sx={{ flex: 1 }}
          statusOption={airingStatusOption}
          setStatusOption={setAiringStatusOption}
        />

        {/* Season */}
        <SeasonFilter
          sx={{ flex: 1 }}
          seasonOption={seasonOption}
          setSeasonOption={setSeasonOption}
        />
      </Box>
    </Box>
  );
}

export default AnimeAdvancedFilterList;

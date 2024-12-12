import { Box } from "@mui/material";
import { useState } from "react";
import YearFilter from "../common/YearFilter";
import AiringStatusFilter from "../common/AiringStatusFilter";
import SeasonFilter from "../common/SeasonFilter";
import GenreFilter from "../common/GenreFilter";
import StudioFilter from "../common/StudioFilter";

const filterContainerStyles = {
  width: { xs: "100%", sm: "49%" },
};

function AdvancedFilterList() {
  const [yearOption, setYearOption] = useState(null);
  const [airingStatusOption, setAiringStatusOption] = useState("");
  const [seasonOption, setSeasonOption] = useState("");
  const [genreOption, setGenreOption] = useState([]);
  const [studioOption, setStudioOption] = useState([]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        flexWrap: { sm: "wrap" },
        gap: { xs: "12px", sm: "8px" },
        rowGap: { sm: "12px", md: "16px" },
        marginTop: "8px",
      }}
    >
      {/* Genres */}
      <GenreFilter
        sx={filterContainerStyles}
        genreOption={genreOption}
        setGenreOption={setGenreOption}
      />

      {/* Studios */}
      <StudioFilter
        sx={filterContainerStyles}
        studioOption={studioOption}
        setStudioOption={setStudioOption}
      />

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

        {/* Airing status */}
        <AiringStatusFilter
          sx={{ flex: 1 }}
          airingStatusOption={airingStatusOption}
          setAiringStatusOption={setAiringStatusOption}
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

export default AdvancedFilterList;

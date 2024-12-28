import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import YearFilter from "../common/YearFilter";
import StatusFilter from "../common/StatusFilter";
import GenreFilter from "../common/GenreFilter";
import { useMangaAppDispatch } from "../../app/hooks";

function MangaAdvancedFilterList() {
  const [yearOption, setYearOption] = useState(null);
  const [publishingStatusOption, setPublishingStatusOption] = useState("");
  const [genreOptionList, setGenreOptionList] = useState([]);
  const { fetchMangaSearchResultList } = useMangaAppDispatch();

  useEffect(() => {
    if (yearOption || publishingStatusOption || genreOptionList.length > 0) {
      fetchMangaSearchResultList({
        yearOption,
        publishingStatusOption,
        genreOptionList,
      });
    } else {
      fetchMangaSearchResultList({});
    }
  }, [yearOption, publishingStatusOption, genreOptionList]);

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
      <GenreFilter
        sx={{ flex: { xs: 1, sm: 2 } }}
        genreOptionList={genreOptionList}
        setGenreOptionList={setGenreOptionList}
      />

      {/* Year */}
      <YearFilter
        sx={{ flex: { xs: 1 } }}
        yearOption={yearOption}
        setYearOption={setYearOption}
      />

      {/* Status */}
      <StatusFilter
        sx={{ flex: { xs: 1 } }}
        statusOption={publishingStatusOption}
        setStatusOption={setPublishingStatusOption}
      />
    </Box>
  );
}

export default MangaAdvancedFilterList;

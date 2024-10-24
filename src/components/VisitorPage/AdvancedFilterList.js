import { Box } from "@mui/material";
import AdvancedFilter from "./AdvancedFilter";

const advancedFilterList = [
  {
    filterName: "Genres",
    options: [
      "Adventure",
      "Action",
      "Drama",
      "Comedy",
      "Fantasy",
      "Ecchi",
      "Mecha",
      "Horror",
      "Mystery",
      "Music",
      "Romance",
      "Psychological",
    ],
  },
  {
    filterName: "Year",
    options: ["2025", "2024", "2023", "2022", "2021", "2020"],
  },
  {
    filterName: "Studios",
    options: [
      "Bones",
      "A-1 Pictures",
      "Toei Animation",
      "Sunrise",
      "MAPPA",
      "ufotable",
      "Madhouse",
      "Kyoto Animation",
      "Wit Studio",
      "Production I.G",
      "Studio Ghibli",
      "CloverWorks",
    ],
  },
  {
    filterName: "Airing Status",
    options: ["Airing", "Finished", "Not Yet Aired", "Cancelled"],
  },
];

function AdvancedFilterList() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "8px",
      }}
    >
      {advancedFilterList.map((advancedFilter, index) => (
        <AdvancedFilter key={index} advancedFilter={advancedFilter} />
      ))}
    </Box>
  );
}

export default AdvancedFilterList;

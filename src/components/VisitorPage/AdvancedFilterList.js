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
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: { sm: "space-between" },
        flexWrap: { sm: "wrap" },
        gap: { xs: "12px", sm: 0 },
        rowGap: { sm: "12px", md: "16px" },
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

import { Box } from "@mui/material";
import BrowseCategory from "./BrowseCategory";
import SearchBar from "./SearchBar";

function BrowseSection() {
  return (
    <Box
      sx={{
        padding: "0 22px",
      }}
    >
      <BrowseCategory />
      <SearchBar />
    </Box>
  );
}

export default BrowseSection;

import { Box } from "@mui/material";
import BrowseCategory from "./BrowseCategory";
import SearchBar from "./SearchBar";
// import { useLocation } from "react-router-dom";

function BrowseSection() {
  // const location = useLocation();

  return (
    <Box
      sx={{
        // padding: location.pathname === "/" ? "0 22px" : 0,
        padding: "0 22px",
        // marginBottom: location.pathname !== "/" ? "52px" : 0,
      }}
    >
      <BrowseCategory />
      <SearchBar />
    </Box>
  );
}

export default BrowseSection;

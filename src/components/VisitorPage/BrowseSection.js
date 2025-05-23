import { Box, useMediaQuery } from "@mui/material";
import BrowseCategory from "./BrowseCategory";
import SearchBar from "../common/SearchBar";

function BrowseSection() {
  const isMediumScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );

  return (
    <Box
      sx={{
        marginTop: { xs: "24px", sm: "32px", md: "52px", lg: "72px" },
        marginBottom: { xs: "28px", md: "44px", lg: "56px" },
      }}
    >
      {isMediumScreenWidthAndAbove ? null : <BrowseCategory />}
      <SearchBar />
    </Box>
  );
}

export default BrowseSection;

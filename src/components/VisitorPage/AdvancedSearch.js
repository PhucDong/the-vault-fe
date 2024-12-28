import { Button, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import AnimeAdvancedFilterList from "./AnimeAdvancedFilterList";
import { useLocation } from "react-router-dom";
import MangaAdvancedFilterList from "./MangaAdvancedFilterList";

function AdvancedSearch() {
  const [openAdvancedSearch, setOpenAdvancedSearch] = useState(false);
  const location = useLocation();

  const handleOpenAdvancedSearch = () => {
    setOpenAdvancedSearch(true);
  };

  const handleCloseAdvancedSearch = () => {
    setOpenAdvancedSearch(false);
  };

  return (
    <>
      <Button
        onClick={
          openAdvancedSearch
            ? handleCloseAdvancedSearch
            : handleOpenAdvancedSearch
        }
        sx={{
          marginTop: { xs: "16px", md: "8px" },
          padding: 0,
          color: "primary.main",
          "& .MuiTypography-root": {
            textTransform: "capitalize",
            fontSize: "1rem",
          },
          "& .MuiSvgIcon-root": {
            fontSize: "1.8rem",
            transform: openAdvancedSearch && "rotate(90deg)",
          },
        }}
      >
        <Typography>Advanced Search</Typography>
        <KeyboardArrowRightIcon />
      </Button>

      {openAdvancedSearch &&
        (location.pathname === "/" ||
          location.pathname.startsWith("/animes") ||
          location.pathname.startsWith("/search/animes")) && (
          <AnimeAdvancedFilterList />
        )}

      {openAdvancedSearch &&
        (location.pathname.startsWith("/mangas") ||
          location.pathname.startsWith("/search/mangas")) && (
          <MangaAdvancedFilterList />
        )}
    </>
  );
}

export default AdvancedSearch;

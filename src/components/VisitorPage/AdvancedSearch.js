import { Button, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import AdvancedFilterList from "./AdvancedFilterList";

function AdvancedSearch() {
  const [openAdvancedSearch, setOpenAdvancedSearch] = useState(false);

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

      {openAdvancedSearch && <AdvancedFilterList />}
    </>
  );
}

export default AdvancedSearch;

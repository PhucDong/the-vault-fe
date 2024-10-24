import { Button, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import AdvancedFilterList from "./AdvancedFilterList";

function AdvancedSearch() {
  const [openAdvancedSearch, setOpenAdvancedSearch] = useState(false);

  const handleOpenAdvancedSearch = () => {
    setOpenAdvancedSearch(true);
    console.log("Open!");
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
          marginTop: "16px",
          
          padding: 0,
          color: "primary.main",
          "& .MuiTypography-root": {
            textTransform: "capitalize",
          },
          "& .MuiSvgIcon-root": {
            fontSize: "1.875rem",
            transform: openAdvancedSearch && "rotate(90deg)",
          },
        }}
      >
        <Typography sx={{ marginRight: "4px" }}>Advanced Search</Typography>
        <KeyboardArrowRightIcon />
      </Button>

      {openAdvancedSearch && <AdvancedFilterList />}
    </>
  );
}

export default AdvancedSearch;

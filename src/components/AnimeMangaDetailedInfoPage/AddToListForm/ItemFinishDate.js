import { Box, InputLabel } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function ItemFinishDate(props) {
  const { itemFinishDate, setItemFinishDate, sx } = props;

  const handleChangeItemFinishDate = (newDate) => {
    setItemFinishDate(newDate);
  };

  const [openAdvancedFilterDropdownMenu, setOpenAdvancedFilterDropdownMenu] =
    useState(false);

  const handleOpenAdvancedFilterDropdownMenu = () => {
    setOpenAdvancedFilterDropdownMenu(true);
  };

  const handleCloseAdvancedFilterDropdownMenu = () => {
    setOpenAdvancedFilterDropdownMenu(false);
  };

  // console.log("Finish date: ", itemFinishDate);

  return (
    <Box sx={sx}>
      <InputLabel
        htmlFor="item-finish-date-option"
        sx={{
          color: "#70787a",
          fontWeight: 600,
          fontSize: { xs: "0.875rem", md: "1rem" },
          marginBottom: "4px",
        }}
      >
        Finish Date
      </InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          views={["year", "month", "day"]}
          yearsOrder="desc"
          maxDate={dayjs()}
          value={itemFinishDate}
          onChange={handleChangeItemFinishDate}
          slots={{ openPickerIcon: KeyboardArrowRightIcon }}
          open={openAdvancedFilterDropdownMenu} // Controls the dropdown's visibility
          onOpen={handleOpenAdvancedFilterDropdownMenu}
          onClose={handleCloseAdvancedFilterDropdownMenu}
          slotProps={{
            textField: {
              id: "item-finish-date-option",
              name: "item-finish-date-option",
              fullWidth: true,
              placeholder: "",
              InputProps: {
                onClick: handleOpenAdvancedFilterDropdownMenu,
                sx: {
                  cursor: "pointer",
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.75rem",
                    transform: openAdvancedFilterDropdownMenu
                      ? "rotate(90deg)"
                      : "none",
                  },
                },
              },
            },
          }}
          sx={{
            position: "relative",
            width: "100%",
            "& .MuiOutlinedInput-input": {
              padding: 0,
            },
            "& .MuiOutlinedInput-root": {
              cursor: "pointer",
              display: "flex",
              padding: "8px 16px",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "4px",
              backgroundColor: "#E9E9E9",
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "& .MuiInputBase-input": {
                "&.MuiOutlinedInput-input": {
                  cursor: "inherit", // Inherits pointer cursor for consistency
                  fontSize: { xs: "1.2rem", sm: "1.1rem", lg: "1rem" },
                  padding: 0,
                  minHeight: "100%",
                  height: "100%",
                },
              },
            },
            "& .MuiIconButton-root": {
              padding: 0,
              margin: 0,
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default ItemFinishDate;
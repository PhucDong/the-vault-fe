import {
  Box,
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function AdvancedFilter({ advancedFilter }) {
  const [advancedFilterOption, setAdvancedFilterOption] = useState(
    advancedFilter.filterName !== "Year" &&
      advancedFilter.filterName !== "Airing Status"
      ? []
      : ""
  );

  // console.log("Advanced filter option: ", advancedFilterOption);
  const [openAdvancedFilterDropdownMenu, setOpenAdvancedFilterDropdownMenu] =
    useState(false);

  const handleChangeAdvancedFilterOption = (event) => {
    setAdvancedFilterOption(event.target.value);
  };

  const handleOpenAdvancedFilterDropdownMenu = () => {
    setOpenAdvancedFilterDropdownMenu(true);
  };

  const handleCloseAdvancedFilterDropdownMenu = () => {
    setOpenAdvancedFilterDropdownMenu(false);
  };

  return (
    <Box>
      <InputLabel
        id={`${advancedFilter.filterName}-label`}
        // className="section-label"
        sx={{
          color: "#70787a",
          fontWeight: 600,
          fontSize: "0.875rem",
          marginBottom: "6px",
        }}
      >
        {advancedFilter.filterName}
      </InputLabel>
      <TextField
        name={`${advancedFilter.filterName}`}
        // className="section-input"
        required
        select
        hiddenLabel
        value={advancedFilterOption}
        onChange={handleChangeAdvancedFilterOption}
        slotProps={{
          select: {
            multiple:
              advancedFilter.filterName !== "Year" &&
              advancedFilter.filterName !== "Airing Status"
                ? true
                : false,
            renderValue: (selected) =>
              advancedFilter.filterName !== "Year" &&
              advancedFilter.filterName !== "Airing Status"
                ? selected.map((item) => item).join(", ")
                : selected,
            open: openAdvancedFilterDropdownMenu,
            onOpen: handleOpenAdvancedFilterDropdownMenu,
            onClose: handleCloseAdvancedFilterDropdownMenu,
            IconComponent: KeyboardArrowRightIcon,
            MenuProps: {
              PaperProps: {
                sx: {
                  padding: "8px 0",
                  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
                },
              },
              sx: {
                "& .MuiMenu-paper": {
                  padding: 0,
                },
                "& .MuiMenu-list": {
                  padding: 0,
                  "& .MuiMenuItem-root": {
                    padding: "8px 20px",
                    minHeight: "100%",
                    gap: "4px",
                    "& .MuiCheckbox-root": {
                      padding: 0,
                    },
                    "& .MuiTypography-root": {
                      fontSize: "0.95rem",
                      fontWeight: 550,
                    },
                    "&.Mui-selected": {
                      color: "info.main",
                    },
                  },
                },
              },
            },
          },
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-input": {
            padding: 0,
          },
          "& .MuiOutlinedInput-root": {
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
                fontSize: "1.2rem",
                padding: 0,
                minHeight: "100%",
                height: "100%",
              },
            },
          },
          "& .MuiSvgIcon-root": {
            position: "initial",
            fontSize: "1.75rem",
            transform: openAdvancedFilterDropdownMenu && "rotate(90deg)",
          },
        }}
      >
        {advancedFilter.options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox
              id={option}
              name={option}
              checked={advancedFilterOption.indexOf(option) > -1}
            />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default AdvancedFilter;

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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function AdvancedFilter({ advancedFilter }) {
  const [advancedFilterOption, setAdvancedFilterOption] = useState(() => {
    if (advancedFilter.filterName === "Airing Status") {
      return "";
    } else if (advancedFilter.filterName === "Year") {
      return dayjs();
    } else {
      return [];
    }
  });

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

  const filterId = `${advancedFilter.filterName}`;

  return (
    <Box sx={{ width: { sm: "49.7%", lg: "24.5%" } }}>
      <InputLabel
        htmlFor={`${advancedFilter.filterName}`}
        sx={{
          color: "#70787a",
          fontWeight: 600,
          fontSize: { xs: "0.875rem", md: "1rem" },
          marginBottom: "4px",
        }}
      >
        {advancedFilter.filterName}
      </InputLabel>
      {advancedFilter.filterName === "Year" ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year"]}
            yearsOrder="desc"
            maxDate={dayjs()}
            value={advancedFilterOption}
            onChange={(newYearValue) => setAdvancedFilterOption(newYearValue)}
            slots={{ openPickerIcon: KeyboardArrowRightIcon }}
            onOpen={handleOpenAdvancedFilterDropdownMenu}
            onClose={handleCloseAdvancedFilterDropdownMenu}
            slotProps={{
              textField: {
                id: `${advancedFilter.filterName}`,
                name: filterId,
                fullWidth: true,
                placeholder: "",
                InputProps: {
                  sx: {
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
      ) : (
        <TextField
          id={`${advancedFilter.filterName}`}
          required
          select
          hiddenLabel
          value={advancedFilterOption}
          onChange={handleChangeAdvancedFilterOption}
          slotProps={{
            select: {
              multiple:
                advancedFilter.filterName !== "Airing Status" ? true : false,
              renderValue: (selected) =>
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
                  fontSize: { xs: "1.2rem", sm: "1.1rem", lg: "1rem" },
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
      )}
    </Box>
  );
}

export default AdvancedFilter;

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
import { useAnimeAppDispatch } from "../../services/hooks";

const seasonOptionList = ["winter", "spring", "summer", "fall"];

function AnimeSeasonFilter(props) {
  const { seasonOption, sx } = props;
  const { updateSeasonOption } = useAnimeAppDispatch();

  const handleChangeSeasonFilter = (option) => {
    if (seasonOption === option) {
      updateSeasonOption("");
    } else {
      updateSeasonOption(option);
    }
  };

  const [openAdvancedFilterDropdownMenu, setOpenAdvancedFilterDropdownMenu] =
    useState(false);

  const handleOpenAdvancedFilterDropdownMenu = () => {
    setOpenAdvancedFilterDropdownMenu(true);
  };

  const handleCloseAdvancedFilterDropdownMenu = () => {
    setOpenAdvancedFilterDropdownMenu(false);
  };

  return (
    <Box sx={sx}>
      <InputLabel
        htmlFor="season-filter"
        sx={{
          color: "#70787a",
          fontWeight: 600,
          fontSize: { xs: "0.875rem", md: "1rem" },
          marginBottom: "4px",
        }}
      >
        Season
      </InputLabel>
      <TextField
        id="season-filter"
        required
        select
        hiddenLabel
        value={seasonOption}
        // onChange={handleChangeSeasonFilter}
        slotProps={{
          select: {
            multiple: false,
            renderValue: (selected) => selected,
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
          textField: {
            id: "season-filter",
            name: "season-filter",
            fullWidth: true,
            placeholder: "",
            InputProps: {
              onClick: handleOpenAdvancedFilterDropdownMenu,
              sx: {
                cursor: "pointer",
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
                cursor: "inherit",
                fontSize: { xs: "1.2rem", sm: "1.1rem", lg: "1rem" },
                padding: 0,
                minHeight: "100%",
                height: "100%",
                textTransform: "capitalize",
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
        {seasonOptionList.map((option) => (
          <MenuItem
            key={option}
            value={option}
            onClick={() => handleChangeSeasonFilter(option)}
          >
            <Checkbox
              id={option}
              name={option}
              checked={seasonOption === option}
            />
            <ListItemText
              primary={option}
              sx={{
                "& .MuiTypography-root": {
                  color: "primary.main",
                  textTransform: "capitalize",
                },
              }}
            />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default AnimeSeasonFilter;

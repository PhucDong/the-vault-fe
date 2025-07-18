import {
  Box,
  Checkbox,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useParams } from "react-router-dom";
import AddToCollectionFormLabel from "./AddToCollectionFormLabel";

function ItemStatus(props) {
  const { itemStatusOption, setItemStatusOption, sx, item } = props;
  // console.log("Item Status Option: ", itemStatusOption);
  const handleChangeItemStatusOption = (event) =>
    setItemStatusOption(event.target.value);
  const { animeId, mangaId } = useParams();

  const getStatusOptionList = () => {
    if (animeId || item.format === "TV") {
      return ["Watching", "Completed", "On Hold", "Dropped", "Plan To Watch"];
    } else if (mangaId || item.format === "Manga") {
      return ["Reading", "Completed", "On Hold", "Dropped", "Plan To Read"];
    }
  };
  // console.log("Status Option List: ", getStatusOptionList());

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
      <AddToCollectionFormLabel htmlFor="item-status-option">
        Status
      </AddToCollectionFormLabel>
      <TextField
        id="item-status-option"
        required
        select
        hiddenLabel
        value={itemStatusOption}
        onChange={handleChangeItemStatusOption}
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
            id: "airing-status-filter",
            name: "airing-status-filter",
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
        {getStatusOptionList().map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox
              id={option}
              name={option}
              checked={itemStatusOption.indexOf(option) > -1}
            />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default ItemStatus;

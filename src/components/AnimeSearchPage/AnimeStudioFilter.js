import {
  Box,
  InputLabel,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useAnimeAppDispatch } from "../../services/hooks";
import CustomStyledCheckbox from "../common/CustomStyledCheckbox";
import apiService from "../../services/apiService";
import { useSelector } from "react-redux";

function AnimeStudioFilter(props) {
  const { studioOption, sx } = props;
  const { updateStudioOption } = useAnimeAppDispatch();
  const studioList = useSelector((state) => state.anime.studioList);
  // const [animeStudioList, setAnimeStudioList] = useState(null);

  const handleChangeStudioFilter = (option) => {
    if (studioOption === option) {
      updateStudioOption("");
    } else {
      updateStudioOption(option);
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

  // useEffect(() => {
  //   try {
  //     const fetchedAnimeStudioList = async () => {
  //       const response = await apiService.get("/studios");
  //       setAnimeStudioList(response.animeStudioList);
  //     };

  //     fetchedAnimeStudioList();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <Box sx={sx}>
      <InputLabel
        htmlFor="studio-filter"
        sx={{
          color: "#70787a",
          fontWeight: 600,
          fontSize: { xs: "0.875rem", md: "1rem" },
          marginBottom: "4px",
        }}
      >
        Studio
      </InputLabel>
      <TextField
        id="studio-filter"
        required
        select
        hiddenLabel
        value={studioOption}
        slotProps={{
          select: {
            multiple: false,
            renderValue: (selected) => selected,
            open: openAdvancedFilterDropdownMenu, // Controls the dropdown's visibility
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
            id: "studio-filter",
            name: "studio-filter",
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
        {studioList?.map((option) => (
          <MenuItem
            key={option}
            value={option}
            onClick={() => handleChangeStudioFilter(option)}
          >
            <CustomStyledCheckbox
              id={option}
              name={option}
              storeOption={studioOption}
              option={option}
            />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default AnimeStudioFilter;

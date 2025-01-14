import {
  Box,
  InputLabel,
  ListItemText,
  MenuItem,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSelector } from "react-redux";
import { useAnimeAppDispatch } from "../../services/hooks";
import CustomStyledCheckbox from "../common/CustomStyledCheckbox";

function AnimeGenreFilter(props) {
  const { genreOptionList, sx } = props;
  const { updateGenreOptionList } = useAnimeAppDispatch();
  const genreList = useSelector((state) => state.anime.genreList);
  const isExtraSmallScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("xs")
  );
  const isSmallScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("sm")
  );
  const isMediumScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const isLargeScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("lg")
  );

  const getDisplayGenreList = useCallback(
    (selectedGenreList) => {
      if (isLargeScreenWidthAndAbove) {
        if (selectedGenreList.length > 7) {
          return `${selectedGenreList
            .slice(0, 7)
            .map((item) => item)
            .join(", ")} (+ ${selectedGenreList.slice(7).length})`;
        }
        return selectedGenreList.map((item) => item).join(", ");
      } else if (isMediumScreenWidthAndAbove) {
        if (selectedGenreList.length > 5) {
          return `${selectedGenreList
            .slice(0, 5)
            .map((item) => item)
            .join(", ")} (+ ${selectedGenreList.slice(5).length})`;
        }
        return selectedGenreList.map((item) => item).join(", ");
      } else if (isSmallScreenWidthAndAbove && selectedGenreList.length > 4) {
        return `${selectedGenreList
          .slice(0, 4)
          .map((item) => item)
          .join(", ")} (+ ${selectedGenreList.slice(4).length})`;
      } else if (
        isExtraSmallScreenWidthAndAbove &&
        selectedGenreList.length > 3
      ) {
        return `${selectedGenreList
          .slice(0, 3)
          .map((item) => item)
          .join(", ")} (+ ${selectedGenreList.slice(3).length})`;
      }
    },
    [
      isExtraSmallScreenWidthAndAbove,
      isSmallScreenWidthAndAbove,
      isMediumScreenWidthAndAbove,
      isLargeScreenWidthAndAbove,
    ]
  );

  const handleChangeGenreFilter = (event) =>
    updateGenreOptionList(event.target.value);
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
        htmlFor="anime-genre-filter"
        sx={{
          color: "#70787a",
          fontWeight: 600,
          fontSize: { xs: "0.875rem", md: "1rem" },
          marginBottom: "4px",
        }}
      >
        Genres
      </InputLabel>
      <TextField
        id="anime-genre-filter"
        required
        select
        hiddenLabel
        value={genreOptionList}
        onChange={handleChangeGenreFilter}
        slotProps={{
          select: {
            multiple: true,
            renderValue: (selected) => getDisplayGenreList(selected),
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
            id: "genre-filter",
            name: "genre-filter",
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
        {genreList?.map((option) => (
          <MenuItem key={option} value={option}>
            <CustomStyledCheckbox
              id={option}
              name={option}
              storeOptionList={genreOptionList}
              option={option}
            />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default AnimeGenreFilter;

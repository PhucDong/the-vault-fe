import { Autocomplete, Box, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import CustomStyledSearchButton from "../common/CustomStyledSearchButton";
import SearchIcon from "@mui/icons-material/Search";
import AdvancedSearch from "./AdvancedSearch";

function SearchBar() {
  const [searchHistoryList, setSearchHistoryList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleChangeSelectedOption = (event, newOption) => {
    setSelectedOption(newOption);
  };

  const handleChangeSearchValue = (event, newInputValue) => {
    setSearchValue(newInputValue);
  };

  const handleEnterSearchValue = (event) => {
    const { value } = event.target;

    if (event.key === "Enter" && value) {
      setSearchHistoryList((prevList) => {
        const prevHistoryList = [...prevList];
        if (!prevHistoryList.includes(value)) {
          prevHistoryList.unshift(value);
        }
        return prevHistoryList;
      });
    }
  };

  const handleSearchAnimeManga = () => {
    setSearchHistoryList((prevList) => {
      const prevHistoryList = [...prevList];
      if (!prevHistoryList.includes(searchValue)) {
        prevHistoryList.unshift(searchValue);
      }
      return prevHistoryList;
    });
  };

  return (
    <Box>
      <Autocomplete
        value={selectedOption}
        onChange={handleChangeSelectedOption}
        inputValue={searchValue}
        onInputChange={handleChangeSearchValue}
        onKeyDown={handleEnterSearchValue}
        freeSolo
        options={searchHistoryList.map((option) => option)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for animes"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
        sx={{
          width: "100%",
          marginBottom: "4px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            padding: "4px 12px",
            height: "42px",
            "& .MuiSvgIcon-root": { color: "primary.light" },
            "& .MuiAutocomplete-input": {
              padding: 0,
              color: "primary.light",
            },
            "& .MuiOutlinedInput-input": {
              lineHeight: "100%",
            },
          },
        }}
      />
      <CustomStyledSearchButton onClick={handleSearchAnimeManga}>
        Search
      </CustomStyledSearchButton>
      <AdvancedSearch />
    </Box>
  );
}

export default SearchBar;

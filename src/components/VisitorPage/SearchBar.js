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
    <>
      <Box
        sx={{ display: { xs: "block", sm: "flex" }, gap: { xs: 0, sm: "4px" } }}
      >
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
            marginBottom: { xs: "4px", sm: 0 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              padding: { xs: "4px 12px", sm: "6px 14px" },
              height: { xs: "42px", sm: "46px", md: "50px" },
              "& .MuiSvgIcon-root": {
                color: "primary.light",
                fontSize: { xs: "1.6em", md: "1.8rem" },
              },
              "& .MuiAutocomplete-input": {
                padding: 0,
                color: "primary.light",
              },
              "& .MuiOutlinedInput-input": {
                lineHeight: "100%",
                fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
              },
            },
          }}
        />
        <CustomStyledSearchButton onClick={handleSearchAnimeManga}>
          Search
        </CustomStyledSearchButton>
      </Box>
      <AdvancedSearch />
    </>
  );
}

export default SearchBar;

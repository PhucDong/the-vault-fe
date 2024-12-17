import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomStyledSearchButton from "./CustomStyledSearchButton";
import SearchIcon from "@mui/icons-material/Search";
import AdvancedSearch from "../VisitorPage/AdvancedSearch";
import { useLocation, useNavigate } from "react-router-dom";
import { useAnimeAppDispatch, useMangaAppDispatch } from "../../app/hooks";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchHistoryList, setSearchHistoryList] = useState([]);
  const [openSearchHistoryListOpen, setOpenSearchHistoryList] = useState(false);
  const [filteredSearchHistoryList, setFilteredSearchHistoryList] = useState(
    []
  );
  const location = useLocation();
  const { fetchAnimeSearchResultList } = useAnimeAppDispatch();
  const { fetchMangaSearchResultList } = useMangaAppDispatch();
  const navigate = useNavigate();

  const handleChangeSearchValue = (event) => {
    const { value } = event.target;

    setSearchValue(value);

    if (value.length > 0) {
      setFilteredSearchHistoryList(
        searchHistoryList.filter((item) => item.includes(value))
      );
      setOpenSearchHistoryList(true);
    } else {
      setOpenSearchHistoryList(false);
    }
  };

  const handleEnterSearchValue = (event) => {
    if (event.key === "Enter" && searchValue) {
      setSearchHistoryList((prevList) => {
        if (!prevList.includes(searchValue)) {
          return [searchValue, ...prevList];
        }
        return prevList;
      });
    }
  };

  const handleSearchValue = () => {
    setSearchHistoryList((prevList) => {
      if (!prevList.includes(searchValue)) {
        return [searchValue, ...prevList];
      }
      return prevList;
    });
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      if (location.pathname === "/") {
        fetchAnimeSearchResultList(searchValue);
        navigate("/animes");
      }
      if (location.pathname.startsWith("/animes")) {
        fetchAnimeSearchResultList(searchValue);
      }
      if (location.pathname.startsWith("/mangas")) {
        fetchMangaSearchResultList(searchValue);
      }
    } else {
      if (location.pathname.startsWith("/animes")) {
        fetchAnimeSearchResultList();
      }
      if (location.pathname.startsWith("/mangas")) {
        fetchMangaSearchResultList();
      }
    }
  }, [searchValue, location.pathname]);

  return (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          gap: { xs: 0, sm: "4px" },
        }}
      >
        <Box sx={{ position: "relative", width: "100%" }}>
          <TextField
            fullWidth
            value={searchValue}
            onChange={handleChangeSearchValue}
            onKeyDown={handleEnterSearchValue}
            placeholder={
              location.pathname.includes("mangas")
                ? "Search for your manga"
                : "Search for your anime"
            }
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              marginBottom: { xs: "4px", sm: 0 },
              height: { xs: "42px", sm: "46px", md: "50px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                padding: { xs: "4px 12px", sm: "6px 14px" },
                height: { xs: "100%" },
                display: "flex",
                alignItems: "center",
                gap: { xs: "6px" },
                "& .MuiInputAdornment-root": {
                  margin: 0,
                  "& .MuiSvgIcon-root": {
                    color: "primary.light",
                    fontSize: { xs: "1.6em", md: "1.8rem" },
                  },
                },
                "& .MuiOutlinedInput-input": {
                  lineHeight: "100%",
                  fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                  padding: 0,
                  color: "primary.light",
                },
              },
            }}
          />
          {openSearchHistoryListOpen &&
            filteredSearchHistoryList &&
            filteredSearchHistoryList.length > 0 && (
              <Box
                sx={{
                  padding: { xs: "12px", sm: "14px" },
                  position: "absolute",
                  top: { xs: "42px", sm: "46px", md: "50px" },
                  width: "100%",
                  backgroundColor: "#fff",
                  zIndex: 1,
                  borderRadius: "8px",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 6px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: "8px", sm: "12px" },
                  }}
                >
                  {filteredSearchHistoryList.map((searchHistory) => (
                    <Box
                      key={searchHistory}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: "6px" },
                        "& .MuiSvgIcon-root": {
                          color: "primary.dark",
                          fontSize: { xs: "1.6em", md: "1.8rem" },
                        },
                        "& .MuiTypography-root": {
                          fontSize: {
                            xs: "1.1rem",
                            sm: "1.2rem",
                            md: "1.3rem",
                          },
                          color: "primary.dark",
                        },
                      }}
                    >
                      <SearchIcon />
                      <Typography>{searchHistory}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
        </Box>
        <CustomStyledSearchButton onClick={handleSearchValue}>
          Search
        </CustomStyledSearchButton>
      </Box>
      <AdvancedSearch />
    </>
  );
}

export default SearchBar;

import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CustomStyledSearchButton from "./CustomStyledSearchButton";
import SearchIcon from "@mui/icons-material/Search";
import AdvancedSearch from "../VisitorPage/AdvancedSearch";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAnimeAppDispatch, useMangaAppDispatch } from "../../services/hooks";
import apiService from "../../services/apiService";
import CustomStyledFastGenreButton from "./CustomStyledFastGenreButton";

function SearchBar() {
  const location = useLocation();
  const animeSearchValue = useSelector((state) => state.anime.searchValue);
  const mangaSearchValue = useSelector((state) => state.manga.searchValue);
  const [searchHistoryList, setSearchHistoryList] = useState([]);
  const [openSearchHistoryListOpen, setOpenSearchHistoryList] = useState(false);
  const [filteredSearchHistoryList, setFilteredSearchHistoryList] = useState(
    []
  );
  const { updateAnimeSearchValue, updateAnimeGenreOptionList } =
    useAnimeAppDispatch();
  const { updateMangaSearchValue, updateMangaGenreOptionList } =
    useMangaAppDispatch();
  const navigate = useNavigate();
  const [popularAnimeGenreList, setPopularAnimeGenreList] = useState(null);
  const [popularMangaGenreList, setPopularMangaGenreList] = useState(null);

  const handleChangeSearchValue = (event) => {
    const { value } = event.target;

    if (location.pathname === "/") {
      updateAnimeSearchValue(value);
      navigate("/animes", { state: { prevPathName: location.pathname } });
    } else if (location.pathname.includes("/animes")) {
      updateAnimeSearchValue(value);
    } else if (location.pathname.includes("/mangas")) {
      updateMangaSearchValue(value);
    }

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
    const { value } = event.target;

    if (event.key === "Enter") {
      if (location.pathname.includes("/animes") && animeSearchValue) {
        updateAnimeSearchValue(value);
        setSearchHistoryList((prevList) => {
          if (!prevList.includes(animeSearchValue)) {
            return [animeSearchValue, ...prevList];
          }
          return prevList;
        });
      } else {
        updateMangaSearchValue(value);
        setSearchHistoryList((prevList) => {
          if (!prevList.includes(mangaSearchValue)) {
            return [mangaSearchValue, ...prevList];
          }
          return prevList;
        });
      }
    }
  };

  const handleSearchValue = () => {
    setSearchHistoryList((prevList) => {
      if (location.pathname.includes("/animes")) {
        if (!prevList.includes(animeSearchValue)) {
          return [animeSearchValue, ...prevList];
        }
      } else {
        if (!prevList.includes(mangaSearchValue)) {
          return [mangaSearchValue, ...prevList];
        }
      }

      return prevList;
    });
  };

  const handleChangeFastFilter = (event) => {
    const { value } = event.target;

    if (location.pathname === "/") {
      navigate("/animes");
      updateAnimeGenreOptionList([value]);
    } else if (location.pathname.includes("/animes")) {
      updateAnimeGenreOptionList([value]);
    } else if (location.pathname.includes("/mangas")) {
      updateMangaGenreOptionList([value]);
    }
  };

  const handleRemoveFastFilter = () => {
    if (location.pathname === "/" || location.pathname.includes("/animes")) {
      updateAnimeGenreOptionList([]);
    } else if (location.pathname.includes("/mangas")) {
      updateMangaGenreOptionList([]);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      updateAnimeSearchValue("");
      updateMangaSearchValue("");
    } else if (location.pathname.includes("/animes")) {
      updateMangaSearchValue("");
    } else if (location.pathname.includes("/mangas")) {
      updateAnimeSearchValue("");
    }
  }, [location.pathname]);

  useEffect(() => {
    try {
      const fetchedPopularGenreList = async () => {
        const response = await apiService.get("/genres");

        if (
          location.pathname === "/" ||
          location.pathname.includes("/animes")
        ) {
          setPopularAnimeGenreList(response.populAnimeGenreList);
        } else if (location.pathname.includes("/mangas")) {
          setPopularMangaGenreList(response.popularMangaGenreList);
        }
      };

      fetchedPopularGenreList();
    } catch (error) {
      console.log(error);
    }
  }, [location.pathname]);

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
            value={
              location.pathname.includes("/animes") || location.pathname === "/"
                ? animeSearchValue
                : mangaSearchValue
            }
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

          {/* Search history */}
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

      {/* Fast filters */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
          alignItems: "center",
          rowGap: { xs: "8px" },
          columnGap: { xs: "12px", lg: "16px" },
          marginTop: { xs: "6px", sm: "8px" },
        }}
      >
        <Typography
          sx={{ color: "primary.main", fontSize: { xs: "0.9rem", md: "1rem" } }}
        >
          Popular genres:{" "}
        </Typography>

        {location.pathname === "/" || location.pathname.includes("/animes")
          ? popularAnimeGenreList?.slice(0, 4).map((genre) => (
              <CustomStyledFastGenreButton
                key={genre.name}
                value={genre.name}
                onClick={handleChangeFastFilter}
              >
                {genre.name}
              </CustomStyledFastGenreButton>
            ))
          : popularMangaGenreList?.slice(0, 4).map((genre) => (
              <CustomStyledFastGenreButton
                key={genre.name}
                value={genre.name}
                onClick={handleChangeFastFilter}
              >
                {genre.name}
              </CustomStyledFastGenreButton>
            ))}

        <Button
          onClick={handleRemoveFastFilter}
          sx={{
            padding: 0,
            textTransform: "capitalize",
            lineHeight: "100%",
            minWidth: 0,
            fontSize: { xs: "1rem", md: "1.1rem" },
            color: "primary.light",
            border: "none",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          Clear Genre
        </Button>
      </Box>

      <AdvancedSearch />
    </>
  );
}

export default SearchBar;

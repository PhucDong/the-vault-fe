import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// import CustomStyledSearchButton from "./CustomStyledSearchButton";
import SearchIcon from "@mui/icons-material/Search";
import AdvancedSearch from "../VisitorPage/AdvancedSearch";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useAnimeAppDispatch,
  useMangaAppDispatch,
  useReviewAppDispatch,
} from "../../services/hooks";
import apiService from "../../services/apiService";
import CustomStyledFastGenreButton from "./CustomStyledFastGenreButton";
import { debounce } from "lodash";

function SearchBar() {
  const location = useLocation();
  const animeSearchValue = useSelector((state) => state.anime.searchValue);
  const mangaSearchValue = useSelector((state) => state.manga.searchValue);
  const userReviewSearchValue = useSelector(
    (state) => state.review.searchValue
  );
  const { updateAnimeSearchValue, updateAnimeGenreOptionList } =
    useAnimeAppDispatch();
  const { updateMangaSearchValue, updateMangaGenreOptionList } =
    useMangaAppDispatch();
  const { updateUserReviewSearchValue } = useReviewAppDispatch();
  const navigate = useNavigate();
  const [popularAnimeGenreList, setPopularAnimeGenreList] = useState(null);
  const [popularMangaGenreList, setPopularMangaGenreList] = useState(null);
  const animeGenreOptionList = useSelector(
    (state) => state.anime.genreOptionList
  );
  const mangaGenreOptionList = useSelector(
    (state) => state.manga.genreOptionList
  );
  const [inputValue, setInputValue] = useState("");

  const handleChangeSearchValue = (event) => {
    const { value } = event.target;
    setInputValue(value); // Immediate UI update
  };

  // const handleEnterSearchValue = (event) => {
  //   const { value } = event.target;

  //   if (event.key === "Enter") {
  //     if (location.pathname.includes("/animes") && animeSearchValue) {
  //       updateAnimeSearchValue(value);
  //     } else {
  //       updateMangaSearchValue(value);
  //     }
  //   }
  // };

  const handleChangeFastFilter = (event) => {
    const { value } = event.target;
    const isAnimePage =
      location.pathname === "/" || location.pathname.includes("/animes");
    const genreList = isAnimePage ? animeGenreOptionList : mangaGenreOptionList;
    const updateGenreList = isAnimePage
      ? updateAnimeGenreOptionList
      : updateMangaGenreOptionList;

    updateGenreList(
      genreList.includes(value) ? [...genreList] : [...genreList, value]
    );

    if (location.pathname === "/") {
      navigate("/animes");
    }
  };

  // const getSearchValue = () => {
  //   if (location.pathname.includes("/animes") || location.pathname === "/") {
  //     return animeSearchValue;
  //   } else if (location.pathname.includes("/mangas")) {
  //     return mangaSearchValue;
  //   } else if (location.pathname.includes("/home")) {
  //     return userReviewSearchValue;
  //   }
  // };

  const getPlaceholder = () => {
    if (location.pathname.includes("/animes")) {
      return "Search for your anime";
    } else if (location.pathname.includes("/mangas")) {
      return "Search for your manga";
    } else if (location.pathname.includes("/home")) {
      return "Search for title reviews";
    }
  };

  // Reset search value when the user navigates to a different page
  useEffect(() => {
    if (location.pathname === "/" || location.pathname.includes("/home")) {
      updateAnimeSearchValue("");
      updateMangaSearchValue("");
    } else if (location.pathname.includes("/animes")) {
      updateMangaSearchValue("");
      updateUserReviewSearchValue("");
    } else if (location.pathname.includes("/mangas")) {
      updateAnimeSearchValue("");
      updateUserReviewSearchValue("");
    }
  }, [
    location.pathname,
    updateAnimeSearchValue,
    updateMangaSearchValue,
    updateUserReviewSearchValue,
  ]);

  // Fetch popular genre list for anime/manga page
  useEffect(() => {
    try {
      if (!location.pathname.includes("/home")) {
        const fetchedPopularGenreList = async () => {
          const response = await apiService.get("/genres");

          if (
            location.pathname === "/" ||
            location.pathname.includes("/animes")
          ) {
            setPopularAnimeGenreList(response.popularAnimeGenreList);
          } else if (location.pathname.includes("/mangas")) {
            setPopularMangaGenreList(response.popularMangaGenreList);
          }
        };

        fetchedPopularGenreList();
      }
    } catch (error) {
      console.log(error);
    }
  }, [location.pathname]);

  useEffect(() => {
    setInputValue(
      location.pathname.includes("/animes")
        ? animeSearchValue
        : location.pathname.includes("/mangas")
        ? mangaSearchValue
        : location.pathname.includes("/home")
        ? userReviewSearchValue
        : ""
    );
  }, [
    location.pathname,
    animeSearchValue,
    mangaSearchValue,
    userReviewSearchValue,
  ]);

  // Debounced function for API call
  useEffect(() => {
    const debouncedSearch = debounce((value) => {
      if (location.pathname.includes("/animes") || location.pathname === "/") {
        updateAnimeSearchValue(value);
        if (location.pathname === "/") {
          navigate("/animes", { state: { prevPathName: location.pathname } });
        }
      } else if (location.pathname.includes("/mangas")) {
        updateMangaSearchValue(value);
      } else if (location.pathname.includes("/home")) {
        updateUserReviewSearchValue(value);
      }
    }, 500);

    debouncedSearch(inputValue);

    // Cleanup on component unmount
    return () => debouncedSearch.cancel();
  }, [
    inputValue,
    location.pathname,
    updateAnimeSearchValue,
    updateMangaSearchValue,
    updateUserReviewSearchValue,
    navigate,
  ]);

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
            value={inputValue}
            onChange={handleChangeSearchValue}
            // onKeyDown={handleEnterSearchValue}
            placeholder={getPlaceholder()}
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
        </Box>

        {/* <CustomStyledSearchButton onClick={handleSearchValue}>
          Search
        </CustomStyledSearchButton> */}
      </Box>

      {/* Fast filters */}
      {(location.pathname === "/" ||
        location.pathname.includes("/animes") ||
        location.pathname.includes("/mangas")) && (
        <>
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
              sx={{
                color: "primary.main",
                fontSize: { xs: "0.9rem", md: "0.95rem" },
              }}
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
          </Box>
          <AdvancedSearch />
        </>
      )}
    </>
  );
}

export default SearchBar;

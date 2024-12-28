import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResultList: null,
  categorizedAnimeList: null,
};

export const fetchAnimeSearchResultList = createAsyncThunk(
  "anime/fetchAnimeSearchResults",
  async (
    {
      searchValue,
      yearOption,
      airingStatusOption,
      seasonOption,
      genreOptionList,
      studioOption,
    },
    { rejectWithValue }
  ) => {
    let baseURL = "http://localhost:3200/animeList";
    let hasQuery = false;

    try {
      if (searchValue) {
        // console.log("Search value: ", searchValue);
        baseURL += `${hasQuery ? "&" : "?"}q=${encodeURIComponent(
          searchValue
        )}`;
        hasQuery = true;
      }
      if (seasonOption) {
        baseURL += `${hasQuery ? "&" : "?"}season=${seasonOption}`;
        hasQuery = true;
      }
      if (yearOption) {
        baseURL += `${hasQuery ? "&" : "?"}year=${yearOption
          .year()
          .toString()}`;
        hasQuery = true;
      }
      if (airingStatusOption) {
        baseURL += `${hasQuery ? "&" : "?"}status=${airingStatusOption}`;
        hasQuery = true;
      }
      if (studioOption) {
        baseURL += `${hasQuery ? "&" : "?"}studio=${encodeURIComponent(
          studioOption
        )}`;
        hasQuery = true;
      }

      const response = await fetch(`${baseURL}`);

      if (!response.ok) {
        throw new Error("Failed to fetch search results.");
      }

      const allAnimes = await response.json();

      // Client-side filtering for genres
      let filteredAnimes = allAnimes;

      // Filter by genres
      if (genreOptionList?.length > 0) {
        const normalizedGenres = genreOptionList.map((genre) =>
          genre.toLowerCase()
        );
        filteredAnimes = allAnimes.filter((anime) =>
          normalizedGenres.every((genre) =>
            anime.genres.map((g) => g.toLowerCase()).includes(genre)
          )
        );
      }

      if (genreOptionList?.length > 0) {
        return { searchResultList: filteredAnimes };
      } else if (
        searchValue ||
        seasonOption ||
        yearOption ||
        airingStatusOption ||
        studioOption
      ) {
        // console.log("Search results: ", allAnimes);
        return { searchResultList: allAnimes };
      } else {
        // console.log("Search results: ", allAnimes);
        throw new Error("No search results found.");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategorizedAnimeList = createAsyncThunk(
  "anime/fetchCategorizedAnimeList",
  async ({ categoryName }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3200/animeList");
      if (!response.ok) {
        throw new Error("Failed to fetch all animes.");
      }

      const allAnimes = await response.json();

      const animeCategoryList = [
        {
          heading: "Trending Now",
          category: "trending",
          format: "TV",
        },
        {
          heading: "Popular This Season",
          category: "this-season",
          format: "TV",
        },
        {
          heading: "Upcoming Next Season",
          category: "next-season",
          format: "TV",
        },
        {
          heading: "All Time Popular",
          category: "popular",
          format: "TV",
        },
        {
          heading: "Top 100 Animes",
          category: "top-100-animes",
          format: "TV",
        },
      ];

      animeCategoryList.forEach((animeCategory) => {
        const filteredAnimeList = allAnimes.filter((anime) =>
          anime.categoryList.includes(animeCategory.category)
        );

        animeCategory.itemList = filteredAnimeList;
      });

      if (categoryName) {
        // console.log("Category name: ", categoryName);
        const filteredAnimeListByCategory = animeCategoryList.filter(
          (animeCategory) => animeCategory.category === categoryName
        );
        // console.log("Filtered list by category: ", filteredAnimeListByCategory);
        return {
          categorizedAnimeList: filteredAnimeListByCategory,
        };
      }

      return { categorizedAnimeList: animeCategoryList };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeSearchResultList.pending, (state) => {
        state.fetchSearchResultStatus = "loading";
      })
      .addCase(fetchAnimeSearchResultList.fulfilled, (state, action) => {
        state.fetchSearchResultStatus = "idle";
        state.searchResultList = action.payload?.searchResultList;
      })
      .addCase(fetchAnimeSearchResultList.rejected, (state, action) => {
        state.fetchSearchResultStatus = "failed";
        state.errorMessages = action.payload;
        state.searchResultList = null;
      })
      .addCase(fetchCategorizedAnimeList.pending, (state) => {
        state.fetchCategorizedAnimeListStatus = "loading";
      })
      .addCase(fetchCategorizedAnimeList.fulfilled, (state, action) => {
        state.fetchCategorizedAnimeListStatus = "idle";
        state.categorizedAnimeList = action.payload?.categorizedAnimeList;
      })
      .addCase(fetchCategorizedAnimeList.rejected, (state, action) => {
        state.fetchCategorizedAnimeListStatus = "failed";
        state.errorMessages = action.payload;
      });
  },
});

export default animeSlice.reducer;

export const selectAnimeSearchResultList = (state) =>
  state.anime.searchResultList;
export const selectCategorizedAnimeList = (state) =>
  state.anime.categorizedAnimeList;

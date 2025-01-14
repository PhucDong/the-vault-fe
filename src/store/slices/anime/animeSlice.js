import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import apiService from "../../../services/apiService";

const initialState = {
  searchResultList: null,
  categorizedAnimeList: null,
  searchValue: "",
  yearOption: null,
  airingStatusOption: "",
  seasonOption: "",
  genreOptionList: [],
  studioOption: "",
  genreList: [],
  studioList: [],
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
    let baseURL = "/animes";
    let hasQuery = false;

    try {
      if (searchValue) {
        baseURL += `${hasQuery ? "&" : "?"}title=${encodeURIComponent(
          searchValue
        )}`;
        hasQuery = true;
      }
      if (seasonOption) {
        baseURL += `${hasQuery ? "&" : "?"}season=${seasonOption}`;
        hasQuery = true;
      }
      if (yearOption) {
        baseURL += `${hasQuery ? "&" : "?"}year=${dayjs(yearOption).year()}`;
        hasQuery = true;
      }
      if (airingStatusOption) {
        baseURL += `${hasQuery ? "&" : "?"}status=${airingStatusOption}`;
        hasQuery = true;
      }

      const response = await apiService.get(`${baseURL}`);

      // Client-side filtering for genres & studio
      let filteredAnimes = [];

      // Filter by studio
      if (studioOption) {
        filteredAnimes = response.animeList.filter(
          (anime) => anime.studio.name === studioOption
        );
      }

      // Filter by genres
      if (genreOptionList?.length > 0) {
        filteredAnimes = response.animeList.filter((anime) =>
          genreOptionList.every((genre) => anime.genres.includes(genre))
        );
      }

      if (studioOption || genreOptionList?.length > 0) {
        return {
          searchResultList: filteredAnimes,
          genreList: response.genreList,
          studioList: response.studioList,
        };
      } else if (
        searchValue ||
        seasonOption ||
        yearOption ||
        airingStatusOption
      ) {
        return {
          searchResultList: response.animeList,
          genreList: response.genreList,
          studioList: response.studioList,
        };
      } else {
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
      const response = await apiService.get("/animes");

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
        const filteredAnimeList = response.animeList.filter((anime) =>
          anime.categoryList.includes(animeCategory.category)
        );

        animeCategory.itemList = filteredAnimeList;
      });

      if (categoryName) {
        const filteredAnimeListByCategory = animeCategoryList.filter(
          (animeCategory) => animeCategory.category === categoryName
        );
        return {
          categorizedAnimeList: filteredAnimeListByCategory,
          genreList: response.genreList,
          studioList: response.studioList,
        };
      }

      return {
        categorizedAnimeList: animeCategoryList,
        genreList: response.genreList,
        studioList: response.studioList,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    updateAnimeSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    updateAiredYear(state, action) {
      state.yearOption = action.payload;
    },
    updateAiringStatus(state, action) {
      state.airingStatusOption = action.payload;
    },
    updateSeasonOption(state, action) {
      state.seasonOption = action.payload;
    },
    updateGenreOptionList(state, action) {
      state.genreOptionList = action.payload;
    },
    updateStudioOption(state, action) {
      state.studioOption = action.payload;
    },
    clearCategorizedAnimeList(state) {
      state.categorizedAnimeList = [];
    },
    clearAllAnimeFilter(state) {
      state.searchValue = "";
      state.yearOption = null;
      state.airingStatusOption = "";
      state.seasonOption = "";
      state.genreOptionList = [];
      state.studioOption = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeSearchResultList.pending, (state) => {
        state.fetchSearchResultStatus = "loading";
      })
      .addCase(fetchAnimeSearchResultList.fulfilled, (state, action) => {
        state.fetchSearchResultStatus = "idle";
        state.searchResultList = action.payload?.searchResultList;
        state.genreList = action.payload?.genreList;
        state.studioList = action.payload?.studioList;
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
        state.genreList = action.payload?.genreList;
        state.studioList = action.payload?.studioList;
      })
      .addCase(fetchCategorizedAnimeList.rejected, (state, action) => {
        state.fetchCategorizedAnimeListStatus = "failed";
        state.errorMessages = action.payload;
      });
  },
});

export const {
  updateAnimeSearchValue,
  updateAiredYear,
  updateAiringStatus,
  updateSeasonOption,
  updateGenreOptionList,
  updateStudioOption,
  clearCategorizedAnimeList,
  clearAllAnimeFilter,
} = animeSlice.actions;
export default animeSlice.reducer;

export const selectAnimeSearchResultList = (state) =>
  state.anime.searchResultList;
export const selectCategorizedAnimeList = (state) =>
  state.anime.categorizedAnimeList;

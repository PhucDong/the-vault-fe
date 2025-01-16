import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";
import dayjs from "dayjs";

const initialState = {
  searchResultList: null,
  categorizedMangaList: null,
  searchValue: "",
  publishingStatusOption: "",
  yearOption: null,
  genreOptionList: [],
  genreList: [],
};

export const fetchMangaSearchResultList = createAsyncThunk(
  "manga/fetchMangaSearchResults",
  async (
    { searchValue, yearOption, publishingStatusOption, genreOptionList },
    { rejectWithValue }
  ) => {
    let baseURL = "/mangas";
    let hasQuery = false;

    try {
      if (searchValue) {
        baseURL += `${hasQuery ? "&" : "?"}title=${encodeURIComponent(
          searchValue
        )}`;
        hasQuery = true;
      }
      if (yearOption) {
        baseURL += `${hasQuery ? "&" : "?"}year=${dayjs(yearOption).year()}`;
        hasQuery = true;
      }
      if (publishingStatusOption) {
        baseURL += `${hasQuery ? "&" : "?"}status=${publishingStatusOption}`;
        hasQuery = true;
      }

      const response = await apiService.get(`${baseURL}`);

      let filteredMangas = [];

      if (genreOptionList?.length > 0) {
        filteredMangas = response.mangaList.filter((manga) =>
          genreOptionList.every((genre) => manga.genres.includes(genre))
        );
      }

      if (genreOptionList?.length > 0) {
        return {
          searchResultList: filteredMangas,
          genreList: response.genreList,
        };
      } else if (searchValue || yearOption || publishingStatusOption) {
        return {
          searchResultList: response.mangaList,
          genreList: response.genreList,
        };
      } else {
        throw new Error("No search results found.");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategorizedMangaList = createAsyncThunk(
  "manga/fetchCategorizedMangaList",
  async ({ categoryName }, { rejectWithValue }) => {
    try {
      const response = await apiService.get("/mangas");

      const mangaCategoryList = [
        {
          heading: "Trending Now",
          category: "trending",
          format: "manga",
        },
        {
          heading: "All Time Popular",
          category: "popular",
        },
        {
          heading: "Top 100 Mangas",
          category: "top-100-mangas",
        },
      ];

      mangaCategoryList.forEach((mangaCategory) => {
        const filteredMangaList = response.mangaList.filter((manga) =>
          manga.categoryList.includes(mangaCategory.category)
        );

        mangaCategory.itemList = filteredMangaList;
      });

      if (categoryName) {
        const filteredMangaListByCategory = mangaCategoryList.filter(
          (mangaCategory) => mangaCategory.category === categoryName
        );
        return {
          categorizedMangaList: filteredMangaListByCategory,
          genreList: response.genreList,
        };
      }

      return {
        categorizedMangaList: mangaCategoryList,
        genreList: response.genreList,
      };
    } catch (error) {
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

export const mangaSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {
    updateMangaSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    updatePublishedYear(state, action) {
      state.yearOption = action.payload;
    },
    updatePublishingStatus(state, action) {
      state.publishingStatusOption = action.payload;
    },
    updateMangaGenreOptionList(state, action) {
      state.genreOptionList = action.payload;
    },
    clearCategorizedMangaList(state) {
      state.categorizedMangaList = [];
    },
    clearAllMangaFilter(state) {
      state.searchValue = "";
      state.publishingStatusOption = "";
      state.yearOption = null;
      state.genreOptionList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMangaSearchResultList.pending, (state) => {
        state.fetchResultStatus = "loading";
      })
      .addCase(fetchMangaSearchResultList.fulfilled, (state, action) => {
        state.fetchResultStatus = "idle";
        state.searchResultList = action.payload?.searchResultList;
        state.genreList = action.payload?.genreList;
      })
      .addCase(fetchMangaSearchResultList.rejected, (state, action) => {
        state.fetchResultStatus = "failed";
        state.errorMessages = action.payload;
        state.searchResultList = null;
      })
      .addCase(fetchCategorizedMangaList.pending, (state) => {
        state.fetchCategorizedMangaListStatus = "loading";
      })
      .addCase(fetchCategorizedMangaList.fulfilled, (state, action) => {
        state.fetchCategorizedMangaListStatus = "idle";
        state.categorizedMangaList = action.payload?.categorizedMangaList;
        state.genreList = action.payload?.genreList;
      })
      .addCase(fetchCategorizedMangaList.rejected, (state, action) => {
        state.fetchCategorizedMangaListStatus = "failed";
        state.errorMessages = action.payload;
      });
  },
});

export const {
  updateMangaSearchValue,
  updatePublishedYear,
  updateMangaGenreOptionList,
  updatePublishingStatus,
  clearCategorizedMangaList,
  clearAllMangaFilter,
} = mangaSlice.actions;
export default mangaSlice.reducer;

export const selectMangaSearchResultList = (state) =>
  state.manga.searchResultList;
export const selectCategorizedMangaList = (state) =>
  state.manga.categorizedMangaList;

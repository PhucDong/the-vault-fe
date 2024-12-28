import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResultList: null,
  categorizedMangaList: null,
};

export const fetchMangaSearchResultList = createAsyncThunk(
  "manga/fetchMangaSearchResults",
  async (
    { searchValue, yearOption, publishingStatusOption, genreOptionList },
    { rejectWithValue }
  ) => {
    let baseURL = "http://localhost:3300/mangaList";
    let hasQuery = false;

    try {
      if (searchValue) {
        // console.log("Search value: ", searchValue);
        baseURL += `${hasQuery ? "&" : "?"}q=${encodeURIComponent(
          searchValue
        )}`;
        hasQuery = true;
      }
      if (yearOption) {
        baseURL += `${hasQuery ? "&" : "?"}year=${yearOption
          .year()
          .toString()}`;
        hasQuery = true;
      }
      if (publishingStatusOption) {
        baseURL += `${hasQuery ? "&" : "?"}status=${publishingStatusOption}`;
        hasQuery = true;
      }

      const response = await fetch(`${baseURL}`);

      if (!response.ok) {
        throw new Error("Failed to fetch search results.");
      }

      const allMangas = await response.json();
      let filteredMangas = [];

      if (genreOptionList?.length > 0) {
        const normalizedGenres = genreOptionList.map((genre) =>
          genre.toLowerCase()
        );
        filteredMangas = allMangas.filter((manga) =>
          normalizedGenres.every((genre) =>
            manga.genres.map((g) => g.toLowerCase()).includes(genre)
          )
        );
      }

      if (genreOptionList?.length > 0) {
        return { searchResultList: filteredMangas };
      } else if (searchValue || yearOption || publishingStatusOption) {
        // console.log("Search results: ", allMangas);
        return { searchResultList: allMangas };
      } else {
        // console.log("Search results: ", allMangas);
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
      const response = await fetch("http://localhost:3300/mangaList");
      if (!response.ok) {
        return rejectWithValue("Failed to fetch all mangas.");
      }

      const allMangas = await response.json();

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
        const filteredMangaList = allMangas.filter((manga) =>
          manga.categoryList.includes(mangaCategory.category)
        );

        mangaCategory.itemList = filteredMangaList;
      });

      if (categoryName) {
        // console.log("Category name: ", categoryName);
        const filteredMangaListByCategory = mangaCategoryList.filter(
          (mangaCategory) => mangaCategory.category === categoryName
        );
        // console.log("Filtered list by category: ", filteredMangaListByCategory);
        return {
          categorizedMangaList: filteredMangaListByCategory,
        };
      }

      return { categorizedMangaList: mangaCategoryList };
    } catch (error) {
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

export const mangaSlice = createSlice({
  name: "manga",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMangaSearchResultList.pending, (state) => {
        state.fetchResultStatus = "loading";
      })
      .addCase(fetchMangaSearchResultList.fulfilled, (state, action) => {
        state.fetchResultStatus = "idle";
        state.searchResultList = action.payload?.searchResultList;
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
      })
      .addCase(fetchCategorizedMangaList.rejected, (state, action) => {
        state.fetchCategorizedMangaListStatus = "failed";
        state.errorMessages = action.payload;
      });
  },
});

export default mangaSlice.reducer;

export const selectMangaSearchResultList = (state) =>
  state.manga.searchResultList;
export const selectCategorizedMangaList = (state) =>
  state.manga.categorizedMangaList;

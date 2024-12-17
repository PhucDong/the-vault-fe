import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResultList: null,
};

export const fetchMangaSearchResultList = createAsyncThunk(
  "manga/fetchSearchResults",
  async (searchValue) => {
    try {
      if (searchValue.length > 0) {
        const response = await fetch(
          `http://localhost:3300/mangaList?q=${searchValue}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search results.");
        }

        const searchResultList = await response.json();
        return { searchResultList };
      } else {
        return null;
      }
    } catch (error) {
      console.log("Errors: ", error);
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
      .addCase(fetchMangaSearchResultList.rejected, (state) => {
        state.fetchResultStatus = "failed";
      });
  },
});

export default mangaSlice.reducer;

export const selectMangaSearchResultList = (state) => state.manga.searchResultList;

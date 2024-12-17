import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResultList: null,
};

export const fetchAnimeSearchResultList = createAsyncThunk(
  "anime/fetchSearchResults",
  async (searchValue) => {
    try {
      if (searchValue.length > 0) {
        const response = await fetch(
          `http://localhost:3200/animeList?q=${searchValue}`
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

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeSearchResultList.pending, (state) => {
        state.fetchResultStatus = "loading";
      })
      .addCase(fetchAnimeSearchResultList.fulfilled, (state, action) => {
        state.fetchResultStatus = "idle";
        // console.log("Action: ", action);
        state.searchResultList = action.payload?.searchResultList;
      })
      .addCase(fetchAnimeSearchResultList.rejected, (state) => {
        state.fetchResultStatus = "failed";
      });
  },
});

export default animeSlice.reducer;

export const selectAnimeSearchResultList = (state) => state.anime.searchResultList;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

const initialState = {
  format: "Anime",
  titleList: [],
  title: "",
  titleId: "",
  text: "",
  score: "",
  review: {},
  reactions: {}, // Store reactions per review
};

export const fetchTitleListBasedOnFormat = createAsyncThunk(
  "review/fetchTitleList",
  async ({ format }, { rejectWithValue }) => {
    try {
      let response;
      if (format === "Anime") {
        response = await apiService.get("/animes");
        return response.animeList;
      } else if (format === "Manga") {
        response = await apiService.get("/mangas");
        return response.mangaList;
      } else {
        throw new Error("No item list found.");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    updateFormat(state, action) {
      state.format = action.payload;
    },
    updateTitle(state, action) {
      state.title = action.payload;
    },
    updateTitleId(state, action) {
      state.titleId = action.payload;
    },
    updateText(state, action) {
      state.text = action.payload;
    },
    updateScore(state, action) {
      state.score = action.payload;
    },
    updateReview(state, action) {
      state.review = action.payload;
    },
    updateReactions(state, action) {
      const { reviewId, emoji } = action.payload;

      if (!state.reactions[reviewId]) {
        state.reactions[reviewId] = { isLiked: false, isDisliked: false };
      }

      if (emoji === "like") {
        state.reactions[reviewId].isLiked = !state.reactions[reviewId].isLiked;
        state.reactions[reviewId].isDisliked = false;
      } else {
        state.reactions[reviewId].isDisliked =
          !state.reactions[reviewId].isDisliked;
        state.reactions[reviewId].isLiked = false;
      }
    },
    resetReviewState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTitleListBasedOnFormat.pending, (state) => {
        state.fetchTitleListStatus = "loading";
      })
      .addCase(fetchTitleListBasedOnFormat.fulfilled, (state, action) => {
        state.fetchTitleListStatus = "idle";
        state.titleList = action.payload;
      })
      .addCase(fetchTitleListBasedOnFormat.rejected, (state) => {
        state.fetchTitleListStatus = "failed";
      });
  },
});

export const {
  updateFormat,
  updateTitle,
  updateTitleId,
  updateScore,
  updateText,
  updateReview,
  updateReactions,
  resetReviewState,
} = reviewSlice.actions;
export default reviewSlice.reducer;

export const selectReviewFormat = (state) => state.review.format;
export const selectReviewTitleList = (state) => state.review.titleList;
export const selectReview = (state) => state.review.review;

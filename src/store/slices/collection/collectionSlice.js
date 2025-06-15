import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

const initialState = {
  collectionStatus: "",
  startDate: null,
  endDate: null,
  notes: "",
  isCollectionCreated: false,
  isCollectionUpdated: false,
  isCollectionDeleted: false,
};

export const createCollection = createAsyncThunk(
  "item/createCollection",
  async (
    { format, itemId, userId, status, startDate, endDate, notes },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiService.post("/collections", {
        format,
        itemId,
        userId,
        status,
        startDate,
        endDate,
        notes,
      });

      return {
        collectionStatus: response.collection.status,
        startDate: response.collection.startDate,
        endDate: response.collection.endDate,
        notes: response.collection.notes,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCollection = createAsyncThunk(
  "item/updateCollection",
  async (
    { collectionId, status, startDate, endDate, notes },
    { rejectWithValue }
  ) => {
    try {
      // console.log("Update status: ", status);

      const response = await apiService.put(`/collections/${collectionId}`, {
        status,
        startDate,
        endDate,
        notes,
      });

      console.log("56, Response: ", response);

      return {
        collectionStatus: response.updatedCollection.status,
        startDate: response.updatedCollection.startDate,
        endDate: response.updatedCollection.endDate,
        notes: response.updatedCollection.notes,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCollection = createAsyncThunk(
  "item/deleteCollection",
  async ({ collectionId }, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(`/collections/${collectionId}`);
      console.log("Deleted collection: ", response);

      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    resetCollectionState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCollection.pending, (state) => {
        state.statusOfCreateCollection = "loading";
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.statusOfCreateCollection = "idle";
        state.collectionStatus = action.payload.collectionStatus;
        state.startDate = action.payload.startDate;
        state.endDate = action.payload.endDate;
        state.notes = action.payload.notes;
        state.isCollectionCreated = true;
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.statusOfCreateCollection = "failed";
        state.errorMessages = action.payload;
      })
      .addCase(updateCollection.pending, (state) => {
        state.statusOfUpdateCollection = "loading";
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.statusOfUpdateCollection = "idle";
        state.collectionStatus = action.payload.collectionStatus;
        state.startDate = action.payload.startDate;
        state.endDate = action.payload.endDate;
        state.notes = action.payload.notes;
        state.isCollectionUpdated = true;
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.statusOfUpdateCollection = "failed";
        state.errorMessages = action.payload;
      })
      .addCase(deleteCollection.pending, (state) => {
        state.statusOfDeleteCollection = "loading";
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.statusOfDeleteCollection = "idle";
        state.isCollectionDeleted = true;
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.statusOfDeleteCollection = "failed";
        state.errorMessages = action.payload;
      });
  },
});

export const { resetCollectionState } = collectionSlice.actions;
export default collectionSlice.reducer;

export const selectCollectionStatus = (state) =>
  state.collection.collectionStatus;
export const selectCollectionStartDate = (state) => state.collection.startDate;
export const selectCollectionEndDate = (state) => state.collection.endDate;
export const selectCollectionNotes = (state) => state.collection.notes;

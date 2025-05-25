import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

const initialState = {
  isUserLoggedIn: false,
  username: null,
  email: null,
  profilePic: null,
  password: null,
  errorMessages: { email: "", password: "" },
  accessToken: null,
  currentUserId: null,
};

// Asynchronous thunks
export const login = createAsyncThunk(
  "authentication/login",
  async ({ email, password, navigate }, { rejectWithValue }) => {
    const errorMessages = {
      email: "",
      password: "",
    };

    try {
      // Validation
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const emailRegex = /^[\w.+%-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

      if (!email) errorMessages.email = "Email is required.";
      else if (!emailRegex.test(email)) {
        errorMessages.email = "Email is not valid.";
      }
      if (!password) errorMessages.password = "Password is required.";
      else if (password && !passwordRegex.test(password)) {
        errorMessages.password =
          "Password is not strong enough. It needs at least 8 characters, 1 uppercase character, 1 lowercase character, 1 number, and 1 symbol.";
      }

      // Check if there are any errors
      if (Object.values(errorMessages).some((msg) => msg)) {
        return rejectWithValue(errorMessages);
      }

      const response = await apiService.post("/auth/login", {
        email,
        password,
      });
      navigate("/home");

      return { user: response.user, accessToken: response.accessToken };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Store slice
export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.logInStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.logInStatus = "idle";
        state.isUserLoggedIn = true;
        state.profilePic = action.payload.user.profilePic;
        state.email = action.payload.user.email;
        state.username = action.payload.user.username;
        state.accessToken = action.payload.accessToken;
        state.currentUserId = action.payload.user._id;
        state.errorMessages = {};
      })
      .addCase(login.rejected, (state, action) => {
        state.logInStatus = "failed";
        state.errorMessages = action.payload || {
          error: "Log in failed",
        };
      });
  },
});

export const { resetAuthState } = authenticationSlice.actions;
export default authenticationSlice.reducer;

// Export state values
export const selectIsUserLoggedIn = (state) =>
  state.authentication.isUserLoggedIn;
export const selectUsername = (state) => state.authentication.username;
export const selectErrorMessages = (state) =>
  state.authentication.errorMessages;

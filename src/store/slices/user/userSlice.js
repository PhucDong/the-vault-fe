import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

const initialState = {
  isUserRegistered: false,
  email: null,
  password: null,
  username: null,
  searchValue: "",
  accessToken: null,
  currentUserId: null,
  errorMessages: { email: "", password: "", passwordConfirmation: "" },
};

// Asynchronous thunks
export const register = createAsyncThunk(
  "user/register",
  async (
    { email, password, passwordConfirmation, username, navigate },
    { rejectWithValue }
  ) => {
    const errorMessages = {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    };

    try {
      // Validation
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const emailRegex = /^[\w.+%-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

      if (!email) {
        errorMessages.email = "Email is required.";
      } else if (email && !emailRegex.test(email)) {
        errorMessages.email = "Email is not valid.";
      }

      if (!username) {
        errorMessages.username = "Username is required.";
      }

      if (!password) {
        errorMessages.password = "Password is required.";
      } else if (password && !passwordRegex.test(password)) {
        errorMessages.password =
          "Password is not strong enough. It needs at least 8 characters, 1 uppercase character, 1 lowercase character, 1 number, and 1 symbol.";
      }

      if (!passwordConfirmation) {
        errorMessages.passwordConfirmation = "Please confirm your password.";
      }

      if (passwordConfirmation && password !== passwordConfirmation) {
        errorMessages.passwordConfirmation = "Password does not match.";
      }

      // Check if there are any errors
      if (Object.values(errorMessages).some((msg) => msg)) {
        return rejectWithValue(errorMessages);
      }

      const response = await apiService.post("/users", {
        email,
        password,
        passwordConfirmation,
        username,
      });

      apiService.defaults.headers.common.Authorization = `Bearer ${response.accessToken}`;
      navigate("/home");

      return { user: response.user, accessToken: response.accessToken };
    } catch (error) {
      if (error.message === "Email already exists.") {
        errorMessages.email = "Email already exists.";
        return rejectWithValue(errorMessages);
      } else if (error.message === "Username already exists.") {
        errorMessages.username = "Username already exists.";
        return rejectWithValue(errorMessages);
      }
      return rejectWithValue(error);
    }
  }
);

// Store slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      Object.assign(state, initialState);
    },
    updateUserSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.logInStatus = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.logInStatus = "idle";
        state.isUserRegistered = true;
        state.email = action.payload.user.email;
        state.username = action.payload.user.username;
        state.accessToken = action.payload.accessToken;
        state.currentUserId = action.payload.user._id;
        state.errorMessages = {};
      })
      .addCase(register.rejected, (state, action) => {
        state.logInStatus = "failed";
        state.errorMessages = action.payload;
      });
  },
});

export const { resetUserState, updateUserSearchValue } = userSlice.actions;
export default userSlice.reducer;

// Export state values
export const selectIsUserRegistered = (state) => state.user.isUserRegistered;
export const selectErrorMessages = (state) => state.user.errorMessages;

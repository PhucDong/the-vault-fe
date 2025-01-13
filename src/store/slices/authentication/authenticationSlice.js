import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoggedIn: false,
  email: null,
  password: null,
  errorMessages: { email: "", password: "" },
};

// Asynchronous thunks
export const login = createAsyncThunk(
  "authentication/login",
  async ({ email, password }, { rejectWithValue }) => {
    const errorMessages = {
      email: "",
      password: "",
    };

    try {
      const response = await fetch("http://localhost:3900/userAccountList");
      if (!response.ok) {
        throw new Error(`Failed to fetch user account list`);
      }
      const userAccountList = await response.json();

      // Validation
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const emailRegex = /^[\w\.\+%-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

      if (!email) errorMessages.email = "Email is required.";
      if (!emailRegex.test(email)) {
        errorMessages.email = "Email is not valid.";
      }
      if (!password) errorMessages.password = "Password is required.";
      if (password && !passwordRegex.test(password)) {
        errorMessages.password = "Password is not strong enough.";
      }

      const foundUser = userAccountList.find(
        (userAccount) =>
          userAccount.password === password && userAccount.email === email
      );

      if (!foundUser) {
        errorMessages.email = "Incorrect email or password.";
        errorMessages.password = "Incorrect email or password.";
      }

      // Check if there are any errors
      if (Object.values(errorMessages).some((msg) => msg)) {
        return rejectWithValue(errorMessages);
      }

      return { email, username: foundUser.username };
    } catch (error) {
      return rejectWithValue({ general: "An unexpected error occurred." });
    }

    // return { email, password, userAccountList };
  }
);

// Store slice
export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetState: (state) => {
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
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.errorMessages = {};
      })
      .addCase(login.rejected, (state, action) => {
        state.logInStatus = "failed";
        console.log("Action: ", action);
        state.errorMessages = action.payload || {
          error: "Log in failed",
        };
      });
  },
});

export const { resetState } = authenticationSlice.actions;
export default authenticationSlice.reducer;

// Export state values
export const selectIsUserLoggedIn = (state) =>
  state.authentication.isUserLoggedIn;
export const selectUsername = (state) => state.authentication.username;
export const selectErrorMessages = (state) =>
  state.authentication.errorMessages;

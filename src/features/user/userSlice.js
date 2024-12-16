import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserRegistered: false,
  email: null,
  password: null,
  username: null,
  errorMessages: { email: "", password: "", passwordConfirmation: "" },
};

// Asynchronous thunks
export const register = createAsyncThunk(
  "user/register",
  async (
    { id, email, password, passwordConfirmation, username },
    { rejectWithValue }
  ) => {
    const errorMessages = {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    };

    try {
      const userAccountListResponse = await fetch(
        "http://localhost:3900/userAccountList"
      );
      if (!userAccountListResponse.ok) {
        throw new Error(`Failed to fetch user account list`);
      }
      const userAccountList = await userAccountListResponse.json();

      // Validation
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const emailRegex = /^[\w\.\+%-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

      if (!email) {
        errorMessages.email = "Email is required.";
      }
      if (email && !emailRegex.test(email)) {
        errorMessages.email = "Email is not valid.";
      }

      if (!username) {
        errorMessages.username = "Username is required.";
      }

      if (!password) {
        errorMessages.password = "Password is required.";
      }
      if (password && !passwordRegex.test(password)) {
        errorMessages.password = "Password is not strong enough.";
      }

      if (!passwordConfirmation) {
        errorMessages.passwordConfirmation = "Please confirm your password.";
      }
      if (passwordConfirmation && password !== passwordConfirmation) {
        errorMessages.passwordConfirmation = "Password does not match.";
      }

      if (userAccountList.some((userAccount) => userAccount.email === email)) {
        errorMessages.email = "Email already exists.";
      }
      if (
        userAccountList.some((userAccount) => userAccount.username === username)
      ) {
        errorMessages.username = "Username already exists.";
      }

      // Check if there are any errors
      if (Object.values(errorMessages).some((msg) => msg)) {
        return rejectWithValue(errorMessages);
      }

      // POST Request
      const postResponse = await fetch(
        "http://localhost:3900/userAccountList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, email, username, password }),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`Failed to register user`);
      }

      return { email, username };
    } catch (error) {
      return rejectWithValue({ general: "An unexpected error occurred." });
    }
  }
);

// Store slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.logInStatus = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.logInStatus = "idle";
        state.isUserLoggedIn = true;
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.errorMessages = {};
      })
      .addCase(register.rejected, (state, action) => {
        state.logInStatus = "failed";
        // console.log("Action: ", action);
        state.errorMessages = action.payload || {
          error: "Registration failed",
        };
      });
  },
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;

// Export state values
export const selectIsUserRegistered = (state) => state.user.isUserRegistered;
export const selectErrorMessages = (state) => state.user.errorMessages;

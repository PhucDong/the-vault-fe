import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import authenticationReducer from "../features/authentication/authenticationSlice";

const rootReducer = {
  authentication: authenticationReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

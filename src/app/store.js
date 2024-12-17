import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import authenticationReducer from "../features/authentication/authenticationSlice";
import animeReducer from "../features/anime/animeSlice";
import mangaReducer from "../features/manga/mangaSlice";

const rootReducer = {
  authentication: authenticationReducer,
  user: userReducer,
  anime: animeReducer,
  manga: mangaReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

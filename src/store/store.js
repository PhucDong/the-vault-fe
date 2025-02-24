import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // default localStorage for web
import userReducer from "./slices/user/userSlice";
import authenticationReducer from "./slices/authentication/authenticationSlice";
import animeReducer from "./slices/anime/animeSlice";
import mangaReducer from "./slices/manga/mangaSlice";
import reviewReducer from "./slices/review/reviewSlice";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { isSessionActive } from "../utils/sessionUtils";

// Custom transform to persist some states in userSlice
const userTransform = createTransform(
  // Transform function to filter data when saving
  (inboundState, key) => {
    return {
      isUserRegistered: inboundState.isUserRegistered,
      email: inboundState.email,
      username: inboundState.username,
      accessToken: inboundState.accessToken,
      currentUserId: inboundState.currentUserId,
    };
  },
  // Transform function to merge state when loading
  (outboundState, key) => {
    return {
      isUserRegistered: outboundState.isUserRegistered,
      email: outboundState.email,
      username: outboundState.username,
      accessToken: outboundState.accessToken,
      currentUserId: outboundState.currentUserId,
    };
  },
  { whitelist: ["user"] } // Apply only to the 'user' slice
);

// Custom transform to persist some states in authenticationSlice
const authTransform = createTransform(
  // Transform function to filter data when saving
  (inboundState, key) => {
    return {
      isUserLoggedIn: inboundState.isUserLoggedIn,
      email: inboundState.email,
      username: inboundState.username,
      accessToken: inboundState.accessToken,
      currentUserId: inboundState.currentUserId,
    };
  },
  // Transform function to merge state when loading
  (outboundState, key) => {
    return {
      isUserLoggedIn: outboundState.isUserLoggedIn,
      email: outboundState.email,
      username: outboundState.username,
      accessToken: outboundState.accessToken,
      currentUserId: outboundState.currentUserId,
    };
  },
  { whitelist: ["authentication"] } // Apply only to the 'auth' slice
);

// Custom transform to persist some states in reviewSlice
const reviewTransform = createTransform(
  // Transform function to filter data when saving
  (inboundState, key) => {
    return {
      format: inboundState.format,
      title: inboundState.title,
      titleId: inboundState.titleId,
      text: inboundState.text,
      score: inboundState.score,
      review: { ...inboundState.review },
      reactions: { ...inboundState.reactions },
      comments: { ...inboundState.comments },
    };
  },
  // Transform function to merge state when loading
  (outboundState, key) => {
    return {
      format: outboundState.format,
      title: outboundState.title,
      titleId: outboundState.titleId,
      text: outboundState.text,
      score: outboundState.score,
      reactions: { ...outboundState.reactions },
      comments: { ...outboundState.comments },
    };
  },
  { whitelist: ["review"] } // Apply only to the 'auth' slice
);

// 1. Configure Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: isSessionActive()
    ? ["anime", "manga", "authentication", "user", "review"]
    : [],
  transforms: [userTransform, authTransform, reviewTransform],
  stateReconciler: autoMergeLevel2,
};

// 2. State rootReducer
const rootReducer = combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
  anime: animeReducer,
  manga: mangaReducer,
  review: reviewReducer,
});

// 3. Wrap the Reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Configure Persistor
const persistor = persistStore(store);

// persistor.purge();

export { store, persistor };

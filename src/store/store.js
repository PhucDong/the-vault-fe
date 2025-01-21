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
    };
  },
  // Transform function to merge state when loading
  (outboundState, key) => {
    return {
      isUserRegistered: outboundState.isUserRegistered,
      email: outboundState.email,
      username: outboundState.username,
    };
  },
  { whitelist: ["user"] } // Apply only to the 'user' slice
);

// Custom transform to persist some states in userSlice
const authTransform = createTransform(
  // Transform function to filter data when saving
  (inboundState, key) => {
    return {
      isUserLoggedIn: inboundState.isUserLoggedIn,
      email: inboundState.email,
    };
  },
  // Transform function to merge state when loading
  (outboundState, key) => {
    return {
      isUserLoggedIn: outboundState.isUserLoggedIn,
      email: outboundState.email,
    };
  },
  { whitelist: ["authentication"] } // Apply only to the 'auth' slice
);

// 1. Configure Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: isSessionActive()
    ? ["anime", "manga", "authentication", "user"]
    : [],
  transforms: [userTransform, authTransform],
  stateReconciler: autoMergeLevel2,
};

// 2. State rootReducer
const rootReducer = combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
  anime: animeReducer,
  manga: mangaReducer,
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

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
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // default localStorage for web
import userReducer from "./slices/user/userSlice";
import authenticationReducer from "./slices/authentication/authenticationSlice";
import animeReducer from "./slices/anime/animeSlice";
import mangaReducer from "./slices/manga/mangaSlice";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { isSessionActive } from "../utils/sessionUtils";

// 1. Configure Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: isSessionActive() ? ["anime", "manga"] : [],
  blacklist: ["authentication", "user"],
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

// hooks.js
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as authenticationSliceActions from "../features/authentication/authenticationSlice";
import * as userSliceActions from "../features/user/userSlice";
import * as animeSliceActions from "../features/anime/animeSlice";
import * as mangaSliceActions from "../features/manga/mangaSlice";

// Custom useAppSelector hook
export const useAppSelector = (selector) => useSelector(selector);

// Custom useDispatch hooks
export const useAuthAppDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators(authenticationSliceActions, dispatch);
};

export const useUserAppDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators(userSliceActions, dispatch);
};

export const useAnimeAppDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators(animeSliceActions, dispatch);
};

export const useMangaAppDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators(mangaSliceActions, dispatch);
};

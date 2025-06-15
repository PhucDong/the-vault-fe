import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as authenticationSliceActions from "../store/slices/authentication/authenticationSlice";
import * as userSliceActions from "../store/slices/user/userSlice";
import * as animeSliceActions from "../store/slices/anime/animeSlice";
import * as mangaSliceActions from "../store/slices/manga/mangaSlice";
import * as reviewSliceActions from "../store/slices/review/reviewSlice";
import * as collectionSliceActions from "../store/slices/collection/collectionSlice";

export const useAppSelector = (selector) => useSelector(selector);

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

export const useReviewAppDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators(reviewSliceActions, dispatch);
};

export const useCollectionDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators(collectionSliceActions, dispatch);
};

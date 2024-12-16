// hooks.js
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as authenticationSliceActions from "../features/authentication/authenticationSlice";
import * as userSliceActions from "../features/user/userSlice";

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

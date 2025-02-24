import { useSelector } from "react-redux";
import apiService from "../services/apiService";
import { jwtDecode } from "jwt-decode";
import useLogout from "./useLogout";

const useUser = () => {
  const loggedInAccessToken = useSelector(
    (state) => state.authentication.accessToken
  );
  const registeredAccessToken = useSelector((state) => state.user.accessToken);
  const { logout } = useLogout();

  const accessToken = loggedInAccessToken || registeredAccessToken;
  if (accessToken) {
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete apiService.defaults.headers.common.Authorization;
  }

  const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      logout();
      return { tokenExpiryStatus: true }; // when token is expired
    } else {
      return { tokenExpiryStatus: false, currentUserId: decoded._id };
    }
  };

  return {
    isTokenExpired: isTokenExpired(accessToken),
    isValidUser: loggedInAccessToken || registeredAccessToken,
  };
};

export default useUser;

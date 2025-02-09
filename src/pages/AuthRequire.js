import { useAppSelector } from "../services/hooks";
import { selectIsUserLoggedIn } from "../store/slices/authentication/authenticationSlice";
import { selectIsUserRegistered } from "../store/slices/user/userSlice";
import { Navigate } from "react-router-dom";

function AuthRequire({ children }) {
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const isUserRegistered = useAppSelector(selectIsUserRegistered);  

  if (isUserLoggedIn || isUserRegistered) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default AuthRequire;

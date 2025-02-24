import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";

function AuthRequire({ children }) {
  const { isTokenExpired } = useUser();

  if (isTokenExpired.tokenExpiryStatus === false) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default AuthRequire;

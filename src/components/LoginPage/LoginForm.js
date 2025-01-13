import { Box, IconButton, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import CustomStyledInputLabel from "../common/CustomStyledInputLabel";
import CustomStyledTextField from "../common/CustomStyledTextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RegisterLoginFormButton from "../common/RegisterLoginFormButton";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectErrorMessages,
  selectIsUserLoggedIn,
} from "../../store/slices/authentication/authenticationSlice";
import {
  useAppSelector,
  useAuthAppDispatch,
  useUserAppDispatch,
} from "../../services/hooks";

function LoginForm() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthAppDispatch();
  const { resetState } = useUserAppDispatch();
  const errorMessages = useAppSelector(selectErrorMessages);
  const location = useLocation();
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const navigate = useNavigate();

  const handleChangeEmailValue = (event) => setEmailValue(event.target.value);
  const handleChangePasswordValue = (event) =>
    setPasswordValue(event.target.value);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (location.pathname.startsWith("/login")) {
      resetState();
    }
  }, [location.pathname, resetState]);

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate(-1);
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Email */}
        <Box>
          <CustomStyledInputLabel htmlFor="email">Email</CustomStyledInputLabel>
          <CustomStyledTextField
            id="email"
            autoComplete="on"
            hiddenLabel
            placeholder="Please enter your email"
            value={emailValue}
            onChange={handleChangeEmailValue}
            error={!!errorMessages.email}
            helperText={errorMessages.email}
          />
        </Box>

        {/* Password */}
        <Box>
          <CustomStyledInputLabel htmlFor="password">
            Password
          </CustomStyledInputLabel>
          <CustomStyledTextField
            id="password"
            autoComplete="on"
            hiddenLabel
            placeholder="Please enter your password"
            value={passwordValue}
            onChange={handleChangePasswordValue}
            type={showPassword ? "text" : "password"}
            error={!!errorMessages.password}
            helperText={errorMessages.password}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>

      <RegisterLoginFormButton
        onClick={() =>
          login({
            email: emailValue,
            password: passwordValue,
          })
        }
      >
        Log In
      </RegisterLoginFormButton>
    </>
  );
}

export default LoginForm;

export const userAccountListLoader = async () => {
  const response = await fetch("http://localhost:3900/userAccountList");

  if (!response.ok) {
    throw new Error("Failed to fetch user account list");
  }

  return response.json();
};

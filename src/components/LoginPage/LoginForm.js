import { Box, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import CustomStyledInputLabel from "../common/CustomStyledInputLabel";
import CustomStyledTextField from "../common/CustomStyledTextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLoaderData, useNavigate } from "react-router-dom";
import RegisterLoginFormButton from "../common/RegisterLoginFormButton";

function LoginForm() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const userAccountList = useLoaderData();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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

  const authenticateUserAccount = () => {
    const newErrors = {};

    if (!emailValue) newErrors.email = "Email is required.";
    if (!passwordValue) newErrors.password = "Password is required.";

    for (const userAccount of userAccountList) {
      if (
        userAccount.email === emailValue &&
        userAccount.password === passwordValue
      ) {
        setErrors({ email: "", password: "" });
        navigate("/home");
        break;
      } else if (
        emailValue &&
        userAccount.email !== emailValue &&
        passwordValue &&
        userAccount.password !== passwordValue
      ) {
        newErrors.email = "Incorrect email.";
        newErrors.password = "Incorrect password.";
      } else if (emailValue && userAccount.email !== emailValue) {
        newErrors.email = "Incorrect email.";
      } else if (passwordValue && userAccount.password !== passwordValue) {
        newErrors.password = "Incorrect password.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }
  };

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
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password}
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

      <RegisterLoginFormButton onClick={authenticateUserAccount}>
        Log In
      </RegisterLoginFormButton>
    </>
  );
}

export default LoginForm;

export const userAccountListLoader = async () => {
  const response = await fetch("http://localhost:6000/userAccountList");

  if (!response.ok) {
    throw new Error("Failed to fetch user account list");
  }

  return response.json();
};

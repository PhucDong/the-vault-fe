import { Box, IconButton, InputAdornment } from "@mui/material";
import CustomStyledInputLabel from "../common/CustomStyledInputLabel";
import CustomStyledTextField from "../common/CustomStyledTextField";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RegisterLoginFormButton from "../common/RegisterLoginFormButton";
import { useLoaderData, useNavigate } from "react-router-dom";
import { faker } from "@faker-js/faker";

function RegisterForm() {
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const userAccountList = useLoaderData();
  const navigate = useNavigate();

  const handleChangeEmailValue = (event) => setEmailValue(event.target.value);
  const handleChangeUsernameValue = (event) =>
    setUsernameValue(event.target.value);
  const handleChangePasswordValue = (event) =>
    setPasswordValue(event.target.value);
  const handleChangePasswordConfirmation = (event) =>
    setPasswordConfirmation(event.target.value);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirmation = () =>
    setShowPasswordConfirmation((prev) => !prev);
  const handleMouseDownPasswordConfirmation = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPasswordConfirmation = (event) => {
    event.preventDefault();
  };

  const registerUser = async () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[\w\.\+%-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const newErrors = {};

    if (!emailValue) newErrors.email = "Email is required.";
    if (emailValue && !emailRegex.test(emailValue))
      newErrors.email = "Email is not valid.";
    if (!usernameValue) newErrors.username = "Username is required.";
    if (!passwordValue) newErrors.password = "Password is required.";
    if (passwordValue && !passwordRegex.test(passwordValue))
      newErrors.password = "Password is not strong enough.";
    if (!passwordConfirmation)
      newErrors.passwordConfirmation = "Please confirm your password.";
    if (passwordConfirmation && !passwordRegex.test(passwordConfirmation))
      newErrors.passwordConfirmation = "Password is not strong enough.";
    if (passwordConfirmation && passwordValue !== passwordConfirmation) {
      newErrors.passwordConfirmation = "Password does not match.";
    }

    if (userAccountList.length > 0) {
      userAccountList.forEach((userAccount) => {
        if (emailValue === userAccount.email) {
          newErrors.email = "Email was already used.";
        } else if (usernameValue === userAccount.username) {
          newErrors.username = "Username was already used.";
        }
      });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    try {
      const response = await fetch("http://localhost:5500/userAccountList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: faker.string.uuid(),
          email: emailValue,
          username: usernameValue,
          password: passwordValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      setErrors({});
      navigate("/home");
    } catch (error) {
      console.error(error.message);
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

        {/* Username */}
        <Box>
          <CustomStyledInputLabel htmlFor="username">
            Username
          </CustomStyledInputLabel>
          <CustomStyledTextField
            id="username"
            autoComplete="on"
            hiddenLabel
            placeholder="Please enter your username"
            value={usernameValue}
            onChange={handleChangeUsernameValue}
            error={!!errors.username}
            helperText={errors.username}
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
            error={!!errors.password}
            helperText={errors.password}
            type={showPassword ? "text" : "password"}
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

        {/* Password confirmation */}
        <Box>
          <CustomStyledInputLabel htmlFor="passwordConfirmation">
            Password confirmation
          </CustomStyledInputLabel>
          <CustomStyledTextField
            id="passwordConfirmation"
            autoComplete="on"
            hiddenLabel
            placeholder="Please confirm your password"
            value={passwordConfirmation}
            onChange={handleChangePasswordConfirmation}
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation}
            type={showPasswordConfirmation ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPasswordConfirmation}
                      onMouseDown={handleMouseDownPasswordConfirmation}
                      onMouseUp={handleMouseUpPasswordConfirmation}
                      edge="end"
                    >
                      {showPasswordConfirmation ? (
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

      <RegisterLoginFormButton onClick={registerUser}>
        Register
      </RegisterLoginFormButton>
    </>
  );
}

export default RegisterForm;

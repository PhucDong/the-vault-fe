import { Box, IconButton, InputAdornment } from "@mui/material";
import CustomStyledInputLabel from "../common/CustomStyledInputLabel";
import CustomStyledTextField from "../common/CustomStyledTextField";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RegisterLoginFormButton from "../common/RegisterLoginFormButton";
import { useNavigate } from "react-router-dom";
import { selectErrorMessages } from "../../store/slices/user/userSlice";
import { useAppSelector, useUserAppDispatch } from "../../services/hooks";

function RegisterForm() {
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const errorMessages = useAppSelector(selectErrorMessages);
  const { register } = useUserAppDispatch();
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
            error={errorMessages?.email}
            helperText={errorMessages?.email}
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
            error={errorMessages?.username}
            helperText={errorMessages?.username}
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
            error={errorMessages?.password}
            helperText={errorMessages?.password}
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
            error={errorMessages?.passwordConfirmation}
            helperText={errorMessages?.passwordConfirmation}
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

      <RegisterLoginFormButton
        onClick={() =>
          register({
            email: emailValue,
            password: passwordValue,
            username: usernameValue,
            passwordConfirmation,
            navigate,
          })
        }
      >
        Register
      </RegisterLoginFormButton>
    </>
  );
}

export default RegisterForm;

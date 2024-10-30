import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import LoginForm from "../components/LoginPage/LoginForm";

function LoginPage() {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: 600,
          textAlign: "center",
          marginBottom: "32px",
        }}
      >
        Log in to The Vault
      </Typography>

      <LoginForm />

      <Typography
        sx={{
          marginTop: "16px",
          textAlign: "center",
          fontSize: "0.875rem",
          "& a": { color: "primary.main", fontWeight: 600 },
        }}
      >
        Don't have an account? <NavLink to="/users">Register</NavLink>
      </Typography>
    </Box>
  );
}

export default LoginPage;

export const userAccountListLoader = async () => {
  const response = await fetch("http://localhost:5500/userAccountList");

  if (!response.ok) {
    throw new Error("Failed to fetch user account list");
  }

  return response.json();
};

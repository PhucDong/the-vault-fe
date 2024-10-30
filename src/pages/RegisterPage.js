import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import RegisterForm from "../components/RegisterPage/RegisterForm";

function RegisterPage() {
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
        Register to The Vault
      </Typography>

      <RegisterForm />

      <Typography
        sx={{
          marginTop: "16px",
          textAlign: "center",
          fontSize: "0.875rem",
          "& a": { color: "primary.main", fontWeight: 600 },
        }}
      >
        Already have an account? <NavLink to="/auth/login">Log in</NavLink>
      </Typography>
    </Box>
  );
}

export default RegisterPage;

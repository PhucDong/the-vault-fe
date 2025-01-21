import { Box, Typography, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";
import RegisterForm from "../components/RegisterPage/RegisterForm";

function RegisterPage() {
  const isMediumScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "400px" },
        padding: { xs: 0, md: "36px 44px 16px 44px" },
        boxShadow: {
          xs: "none",
          md: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        },
        borderRadius: { xs: 0, md: "12px" },
      }}
    >
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: 600,
          textAlign: "center",
          marginBottom: "32px",
        }}
      >
        {isMediumScreenWidthAndAbove ? "Register" : "Register to The Vault"}
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
        Already have an account? <NavLink to="/login">Log in</NavLink>
      </Typography>
    </Box>
  );
}

export default RegisterPage;

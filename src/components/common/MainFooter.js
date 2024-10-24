import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

function MainFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "32px 32px 96px 32px",
        backgroundColor: "primary.main",
        "& a": {
          textAlign: "center",
          color: "secondary.main",
          textDecoration: "none",
        },
      }}
    >
      <NavLink to="/" style={{ fontSize: "1.8rem", fontWeight: 600 }}>
        The Vault
      </NavLink>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          "& a": {
            fontSize: "1.25rem",
          },
        }}
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="auth/login">Log In</NavLink>
        <NavLink to="users">Register</NavLink>
      </Box>
    </Box>
  );
}

export default MainFooter;

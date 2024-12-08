import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

function MainFooter({ navHeight }) {
  return (
    <Box
      sx={{
        padding: {
          xs: "32px 0",
          sm: "32px 0",
          md: "32px 152px",
          lg: "32px 192px",
        },
        marginBottom: { xs: `${navHeight}px`, md: 0 },
        backgroundColor: "primary.main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: "20px", md: 0 },
          "& a": {
            textAlign: "center",
            color: "secondary.main",
            textDecoration: "none",
            lineHeight: "100%",
          },
        }}
      >
        <Box
          component={NavLink}
          to="/"
          sx={{
            fontSize: { xs: "2rem", md: "2.2rem", lg: "2.4rem" },
            fontWeight: 550,
            marginRight: { md: "140px", lg: "160px" },
          }}
        >
          The Vault
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: "20px", md: "32px" },
            "& a": {
              fontSize: { xs: "1.25rem", md: "1.4rem" },
            },
          }}
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="auth/login">Log In</NavLink>
          <NavLink to="users">Register</NavLink>
        </Box>
      </Box>
      <Box sx={{ marginTop: { xs: "20px", md: "40px" } }}>
        <Typography
          sx={{
            color: "#fff",
            textAlign: { xs: "center", md: "left" },
            fontSize: "0.8rem",
          }}
        >
          Copyright &copy; 2024 DVMP. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default MainFooter;

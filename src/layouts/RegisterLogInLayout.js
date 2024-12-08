import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function RegisterLogInLayout() {
  return (
    <Box
      sx={{
        padding: { xs: "82px 22px", md: "40px 0" },
        height: "100%",
        display: { xs: "block", md: "flex" },
        justifyContent: { md: "center" },
        alignItems: { md: "center" },
      }}
    >
      <Outlet />
    </Box>
  );
}

export default RegisterLogInLayout;

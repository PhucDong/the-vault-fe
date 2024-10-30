import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function RegisterLogInLayout() {
  return (
    <Box sx={{ padding: "82px 22px 0 22px" }}>
      <Outlet />
    </Box>
  );
}

export default RegisterLogInLayout;

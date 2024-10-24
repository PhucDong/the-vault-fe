import { Box } from "@mui/material";
import React from "react";
// import BrowseSection from "../components/VisitorPage/BrowseSection";
import { Outlet } from "react-router-dom";

function CustomItemListLayout() {
  return (
    <Box sx={{ padding: "0 22px" }}>
      {/* <BrowseSection /> */}

      <Outlet />
    </Box>
  );
}

export default CustomItemListLayout;

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/common/MainHeader";
import MainFooter from "../components/common/MainFooter";
import { useState } from "react";

function MainLayout() {
  const [navHeight, setNavHeight] = useState(0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <MainHeader setNavHeight={setNavHeight} />
      <Box
        sx={{
          flex: 1,
          marginTop: { xs: 0, md: `${navHeight}px` },
          marginBottom: { xs: "52px", md: "60px", lg: "68px" },
          display: "flex",
          flexDirection: "column",
          gap: { xs: "52px", md: "60px", lg: "68px" },
        }}
      >
        <Outlet />
      </Box>
      <MainFooter navHeight={navHeight} />
    </Box>
  );
}

export default MainLayout;

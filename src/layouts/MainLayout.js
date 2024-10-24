import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/common/MainHeader";
import MainFooter from "../components/common/MainFooter";

function MainLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        justifyContent: "space-between",
        gap: "52px",
      }}
    >
      <MainHeader />
      <Outlet />
      <MainFooter />
    </Box>
  );
}

export default MainLayout;

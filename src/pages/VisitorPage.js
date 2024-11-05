import HeroSection from "../components/VisitorPage/HeroSection";
import BrowseSection from "../components/VisitorPage/BrowseSection";
import AnimeListPage from "./AnimeListPage";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

function VisitorPage() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && <HeroSection />}
      <Box
        sx={{
          padding: {
            xs: "0 22px",
            md: "0 60px",
            lg: "0 80px",
          },
        }}
      >
        <BrowseSection />
        {location.pathname === "/" && <AnimeListPage />}
        <Outlet />
      </Box>
    </>
  );
}

export default VisitorPage;

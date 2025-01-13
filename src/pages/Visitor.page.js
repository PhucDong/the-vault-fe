import HeroSection from "../components/VisitorPage/HeroSection";
import BrowseSection from "../components/VisitorPage/BrowseSection";
import { Outlet, useLocation } from "react-router-dom";
import CustomPaddingLayout from "../components/common/CustomPaddingLayout";
import AnimeListPage from "./AnimeList.page";

function VisitorPage() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && <HeroSection />}
      <CustomPaddingLayout>
        <BrowseSection />
        {location.pathname === "/" && <AnimeListPage />}
        <Outlet />
      </CustomPaddingLayout>
    </>
  );
}

export default VisitorPage;

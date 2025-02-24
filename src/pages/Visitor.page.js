import HeroSection from "../components/VisitorPage/HeroSection";
import BrowseSection from "../components/VisitorPage/BrowseSection";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import CustomPaddingLayout from "../components/common/CustomPaddingLayout";
import AnimeListPage from "./AnimeList.page";
import useUser from "../hooks/useUser";

function VisitorPage() {
  const location = useLocation();
  const { isTokenExpired } = useUser();

  if (isTokenExpired.tokenExpiryStatus === false && location.pathname === "/") {
    return <Navigate to="/home" />;
  } else {
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
}

export default VisitorPage;

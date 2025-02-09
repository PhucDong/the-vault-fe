import HeroSection from "../components/VisitorPage/HeroSection";
import BrowseSection from "../components/VisitorPage/BrowseSection";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import CustomPaddingLayout from "../components/common/CustomPaddingLayout";
import AnimeListPage from "./AnimeList.page";
import { useSelector } from "react-redux";

function VisitorPage() {
  const location = useLocation();
  const isUserLoggedIn = useSelector(
    (state) => state.authentication.isUserLoggedIn
  );
  const isUserRegistered = useSelector((state) => state.user.isUserRegistered);

  if ((isUserLoggedIn || isUserRegistered) && location.pathname === "/") {
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

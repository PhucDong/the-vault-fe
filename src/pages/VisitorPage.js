import HeroSection from "../components/VisitorPage/HeroSection";
import BrowseSection from "../components/VisitorPage/BrowseSection";
import AnimeListPage from "./AnimeListPage";
import { Outlet, useLocation } from "react-router-dom";

function VisitorPage() {
  const location = useLocation();

  console.log("Visitor page!");
  console.log("Location: ", location);

  return (
    <>
      {location.pathname === "/" && <HeroSection />}
      <BrowseSection />
      {location.pathname === "/" && <AnimeListPage />}
      <Outlet />
    </>
  );
}

export default VisitorPage;

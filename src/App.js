import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import GuestHomePage from "./pages/GuestHomePage";
import UserHomePage from "./pages/UserHomePage";
import DetailedTVShowInfoPage from "./pages/DetailedTVShowInfoPage";
import ScrollToTopLayout from "./layouts/ScrollToTopLayout";
import SearchResultsPageLayout from "./layouts/SearchResultsPageLayout";
import SearchBarResultsPage from "./pages/SearchBarResultsPage";
import TVShowGenreResultsPage from "./pages/TVShowGenreResultsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<ScrollToTopLayout />}>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<GuestHomePage />} />
        <Route path="browse" element={<UserHomePage />} />
        <Route
          path="browse/tVShows/:tVShowIdParam"
          element={<DetailedTVShowInfoPage />}
        />

        <Route path="search" element={<SearchResultsPageLayout />}>
          <Route path="tVShows" element={<SearchBarResultsPage />} />
          <Route
            path="tVShowGenres/:tVShowGenreIdParam"
            element={<TVShowGenreResultsPage />}
          />
        </Route>
        <Route path="detailed" element={<DetailedTVShowInfoPage />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

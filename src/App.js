import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import VisitorPage from "./pages/VisitorPage";
import LoginPage, { userAccountListLoader } from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AnimeListByCategoryPage from "./pages/AnimeListByCategoryPage";
import AnimeListPage, { animeListLoader } from "./pages/AnimeListPage";
import MangaListPage, { mangaListLoader } from "./pages/MangaListPage";
import MangaListByCategoryPage from "./pages/MangaListByCategoryPage";
import RegisterLogInLayout from "./layouts/RegisterLogInLayout";
import HomePage from "./pages/HomePage";
import AnimeDetailedInfoPage, {
  animeDetailLoader,
} from "./pages/AnimeDetailedInfoPage";
import MangaDetailedInfoPage, {
  mangaDetailLoader,
} from "./pages/MangaDetailedInfoPage";
import CharacterDetailedInfoPage, {
  characterDetailLoader,
} from "./pages/CharacterDetailedInfoPage/CharacterDetailedInfoPage";
import StaffDetailedInfoPage, {
  staffDetailLoader,
} from "./pages/StaffDetailedInfoPage/StaffDetailedInfoPage";
import ReviewDetailedInfoPage, {
  reviewDetailLoader,
} from "./pages/ReviewDetailedInfoPage/ReviewDetailedInfoPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<VisitorPage />} loader={animeListLoader}>
        <Route
          path="animes"
          element={<AnimeListPage />}
          loader={animeListLoader}
        />

        <Route
          path="search/animes/:categoryName"
          element={<AnimeListByCategoryPage />}
        />

        <Route
          path="mangas"
          element={<MangaListPage />}
          loader={mangaListLoader}
        />

        <Route
          path="search/mangas/:categoryName"
          element={<MangaListByCategoryPage />}
        />
      </Route>

      <Route
        path="animes/:animeId"
        element={<AnimeDetailedInfoPage />}
        loader={animeDetailLoader}
      />

      <Route
        path="animes/related/:itemId"
        element={<AnimeDetailedInfoPage />}
        loader={animeDetailLoader}
      />

      <Route
        path="mangas/:mangaId"
        element={<MangaDetailedInfoPage />}
        loader={mangaDetailLoader}
      />

      <Route
        path="characters/:characterId"
        element={<CharacterDetailedInfoPage />}
        loader={characterDetailLoader}
      />

      <Route
        path="staff/:staffId"
        element={<StaffDetailedInfoPage />}
        loader={staffDetailLoader}
      />

      <Route
        path="reviews/:reviewId"
        element={<ReviewDetailedInfoPage />}
        loader={reviewDetailLoader}
      />

      <Route element={<RegisterLogInLayout />}>
        <Route
          path="login"
          element={<LoginPage />}
          loader={userAccountListLoader}
        />
        <Route
          path="register"
          element={<RegisterPage />}
          loader={userAccountListLoader}
        />
      </Route>

      <Route path="/home" element={<HomePage />} />

      {/* Visitor Page */}
      {/* Browse category */}
      {/* Search bar & advanced search */}
      {/* Notes: Use loader of React router */}
      {/* Results: Router's loader works */}
      {/* Try using Redux next */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

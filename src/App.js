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
import AnimeListPage from "./pages/AnimeListPage";
import MangaListPage from "./pages/MangaListPage";
import MangaListByCategoryPage from "./pages/MangaListByCategoryPage";
import RegisterLogInLayout from "./layouts/RegisterLogInLayout";
import HomePage from "./pages/HomePage";
import AnimeDetailedInfoPage from "./pages/AnimeDetailedInfoPage";
import MangaDetailedInfoPage from "./pages/MangaDetailedInfoPage";
import CharacterDetailedInfoPage from "./pages/CharacterDetailedInfoPage/CharacterDetailedInfoPage";
import EmployeeDetailedInfoPage from "./pages/EmployeeDetailedInfoPage/EmployeeDetailedInfoPage";
import ReviewDetailedInfoPage from "./pages/ReviewDetailedInfoPage/ReviewDetailedInfoPage";
import ReviewEditorPage from "./pages/ReviewEditorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<VisitorPage />}>
        <Route path="animes" element={<AnimeListPage />} />

        <Route
          path="search/animes/:categoryName"
          element={<AnimeListByCategoryPage />}
        />

        <Route path="mangas" element={<MangaListPage />} />

        <Route
          path="search/mangas/:categoryName"
          element={<MangaListByCategoryPage />}
        />
      </Route>

      <Route path="animes/:animeId" element={<AnimeDetailedInfoPage />} />

      <Route
        path="animes/related/:itemId"
        element={<AnimeDetailedInfoPage />}
      />

      <Route path="mangas/:mangaId" element={<MangaDetailedInfoPage />} />

      <Route
        path="characters/:characterId"
        element={<CharacterDetailedInfoPage />}
      />

      <Route
        path="employees/:employeeId"
        element={<EmployeeDetailedInfoPage />}
      />

      <Route
        path="reviews/:reviewId"
        element={<ReviewDetailedInfoPage />}
      />

      <Route path="reviews/editor" element={<ReviewEditorPage />} />

      <Route element={<RegisterLogInLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="register"
          element={<RegisterPage />}
          loader={userAccountListLoader}
        />
      </Route>

      <Route path="/home" element={<HomePage />} />
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}

export default App;

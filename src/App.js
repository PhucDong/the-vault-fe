import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./pages/Error.page.js";
import VisitorPage from "./pages/Visitor.page.js";
import LoginPage from "./pages/Login.page.js";
import RegisterPage from "./pages/Register.page.js";
import AnimeListByCategoryPage from "./pages/AnimeListByCategory.page.js";
import AnimeListPage from "./pages/AnimeList.page.js";
import MangaListPage from "./pages/MangaList.page.js";
import MangaListByCategoryPage from "./pages/MangaListByCategory.page.js";
import RegisterLogInLayout from "./layouts/RegisterLogInLayout";
import HomePage from "./pages/Home.page.js";
import AnimeDetailedInfoPage from "./pages/AnimeDetailedInfo.page.js";
import MangaDetailedInfoPage from "./pages/MangaDetailedInfo.page.js";
import CharacterDetailedInfoPage from "./pages/CharacterDetailedInfoPage/CharacterDetailedInfo.page.js";
import EmployeeDetailedInfoPage from "./pages/EmployeeDetailedInfoPage/EmployeeDetailedInfo.page.js";
import ReviewDetailedInfoPage from "./pages/ReviewDetailedInfoPage/ReviewDetailedInfo.page.js";
import ReviewEditorPage from "./pages/ReviewEditor.page.js";
import AuthRequire from "./pages/AuthRequire.js";
import ProfilePage from "./pages/ProfilePage/Profile.page.js";

const BASE_ROOT = {
  review: "reviews",
  anime: "animes",
  manga: "mangas",
  user: "users",
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/home"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
        errorElement={<ErrorPage />}
      >
        <Route index element={<HomePage />} />
        <Route path="me" element={<ProfilePage />} />
        {/* <Route path={`${BASE_ROOT.user}/:userId`} element={<ProfilePage />} /> */}
        <Route
          path={`${BASE_ROOT.review}/editor`}
          element={<ReviewEditorPage />}
        />
        <Route
          path={`${BASE_ROOT.review}/editor/:reviewId`}
          element={<ReviewEditorPage />}
        />
        {/* <Route
          path={`${BASE_ROOT.review}/:reviewId`}
          element={<ReviewDetailedInfoPage />}
        /> */}
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<VisitorPage />}>
          <Route path={BASE_ROOT.anime} element={<AnimeListPage />} />

          <Route
            path={`search/${BASE_ROOT.anime}/:categoryName`}
            element={<AnimeListByCategoryPage />}
          />

          <Route path={BASE_ROOT.manga} element={<MangaListPage />} />

          <Route
            path={`search/${BASE_ROOT.manga}/:categoryName`}
            element={<MangaListByCategoryPage />}
          />
        </Route>

        <Route
          path={`${BASE_ROOT.anime}/:animeId`}
          element={<AnimeDetailedInfoPage />}
        />

        <Route
          path={`${BASE_ROOT.manga}/:mangaId`}
          element={<MangaDetailedInfoPage />}
        />

        <Route
          path="characters/:characterId"
          element={<CharacterDetailedInfoPage />}
        />

        <Route
          path="employees/:employeeId"
          element={<EmployeeDetailedInfoPage />}
        />

        <Route
          path={`${BASE_ROOT.review}/:reviewId`}
          element={<ReviewDetailedInfoPage />}
        />

        <Route element={<RegisterLogInLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
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

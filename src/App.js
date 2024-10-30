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
import AnimeListPage, { animeCategoryListLoader } from "./pages/AnimeListPage";
import MangaListPage, { mangaCategoryListLoader } from "./pages/MangaListPage";
import CustomItemListLayout from "./layouts/CustomItemListLayout";
import MangaListByCategoryPage from "./pages/MangaListByCategoryPage";
import RegisterLogInLayout from "./layouts/RegisterLogInLayout";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
      <Route
        path="/"
        element={<VisitorPage />}
        loader={animeCategoryListLoader}
      >
        <Route element={<CustomItemListLayout />}>
          <Route
            path="animes"
            element={<AnimeListPage />}
            loader={animeCategoryListLoader}
          />

          <Route
            path=":categoryName"
            element={<AnimeListByCategoryPage />}
            loader={animeCategoryListLoader}
          />
        </Route>

        <Route element={<CustomItemListLayout />}>
          <Route
            path="mangas"
            element={<MangaListPage />}
            loader={mangaCategoryListLoader}
          />

          <Route
            path=":categoryName"
            element={<MangaListByCategoryPage />}
            loader={mangaCategoryListLoader}
          />
        </Route>
      </Route>

      <Route element={<RegisterLogInLayout />}>
        <Route
          path="auth/login"
          element={<LoginPage />}
          loader={userAccountListLoader}
        />
        <Route
          path="users"
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

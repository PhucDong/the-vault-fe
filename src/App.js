import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import VisitorPage from "./pages/VisitorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AnimeListByCategoryPage from "./pages/AnimeListByCategoryPage";
import AnimeListPage, { animeCategoryListLoader } from "./pages/AnimeListPage";
import MangaListPage, { mangaCategoryListLoader } from "./pages/MangaListPage";
import CustomItemListLayout from "./layouts/CustomItemListLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
      <Route
        path="/"
        element={<VisitorPage />}
        loader={animeCategoryListLoader}
      >
        <Route path="animes" element={<CustomItemListLayout />}>
          <Route
            index
            element={<AnimeListPage />}
            loader={animeCategoryListLoader}
          />

          <Route
            path=":categoryName"
            element={<AnimeListByCategoryPage />}
            loader={animeCategoryListLoader}
          />
        </Route>

        <Route path="mangas" element={<CustomItemListLayout />}>
          <Route
            index
            element={<MangaListPage />}
            loader={mangaCategoryListLoader}
          />
        </Route>
      </Route>

      <Route path="auth/login" element={<LoginPage />} />
      <Route path="users" element={<RegisterPage />} />

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

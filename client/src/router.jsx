import { createBrowserRouter, redirect } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import RootLayout from "./layouts/RootLayout";
import LoginPage from "./pages/LoginPage";
import CardPage from "./pages/CardPage";
import CardDetailPage from "./pages/CardDetailPage";
import FavoritePage from "./pages/FavoritePage";
import EditFavorite from "./pages/EditFavorite";
import MinigamesPage from "./pages/MinigamesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        throw redirect("/cards");
      }
      return null;
    },
    children: [
      {
        path: "/",
        index: true,
        loader: () => {
          throw redirect("/login");
        },
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        return null;
      }
      throw redirect("/login");
    },
    children: [
      {
        path: "/cards",
        element: <CardPage />,
      },
      {
        path: "/cards/:cardId",
        element: <CardDetailPage />,
      },
      {
        path: "/cards/favorite",
        element: <FavoritePage />,
      },
      {
        path: "/cards/favorite/edit/:favoriteId",
        element: <EditFavorite />,
      },
      {
        path: "/minigames",
        element: <MinigamesPage />,
      },
    ],
  },
]);

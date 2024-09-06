import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Home from "./pages/HomePage";
import Detail from "./pages/DetailPage";
import Favorite from "./pages/FavoritePage";
import UpdateImageUrl from "./pages/UploadImgPage";

const requireAuth = () => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    throw redirect("/login");
  }
  return null;
};

const loginLoader = () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    throw redirect("/");
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: loginLoader,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
    loader: requireAuth,
  },
  {
    path: "/monster/:id",
    element: <Detail />,
    loader: requireAuth,
  },
  {
    path: "/favorites",
    element: <Favorite />,
    loader: requireAuth,
  },
  {
    path: "/monster/:id/update-img",
    element: <UpdateImageUrl />,
    loader: requireAuth,
  },
]);

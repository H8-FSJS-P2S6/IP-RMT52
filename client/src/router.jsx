import { createBrowserRouter, redirect } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import RootLayout from "./layouts/RootLayout";
import LoginPage from "./pages/LoginPage";
import CardPage from "./pages/CardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        throw redirect("/");
      }
      return null;
    },
    children: [
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
    ],
  },
]);

import { createBrowserRouter, redirect } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    // loader: () => {
    //   const access_token = localStorage.getItem("access_token");
    //   if (access_token) {
    //     throw redirect("/");
    //   }
    //   return null;
    // },
    children: [
      {
        path: "/register",
        element: <h1 className="bg-yellow-500">Register Page</h1>,
      },
      {
        path: "/login",
        element: <h1 className="bg-red-500">Login Page</h1>,
      },
    ],
  },
  {
    path: "/",
    // loader: () => {
    //   const access_token = localStorage.getItem("access_token");
    //   if (access_token) {
    //     return null;
    //   }
    //   throw redirect("/login");
    // },
    children: [
      {
        path: "/cards",
      },
    ],
  },
]);

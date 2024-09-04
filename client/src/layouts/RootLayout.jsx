import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      {localStorage.getItem("access_token") && <Sidebar />}
      <div className="container w-full mt-16 sm:pl-64">
        <Outlet />
      </div>
    </>
  );
}

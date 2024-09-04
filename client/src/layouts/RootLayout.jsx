import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      {localStorage.getItem("access_token") && <Sidebar />}
      <div className="container-2xl w-full mt-16 sm:pl-64 min-w-[524px]">
        <Outlet />
      </div>
    </>
  );
}

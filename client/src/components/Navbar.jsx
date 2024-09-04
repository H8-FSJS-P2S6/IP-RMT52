import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-800 h-16">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 h-full">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="../../public/images/Yu-Gi-Oh_logo.png"
            className="h-8"
            alt="Yugioh Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Yugioh Analyzer
          </span>
        </div>

        <div className="flex items-center space-x-3 md:space-x-0 rtl:space-x-reverse">
          <DarkModeToggle />
          <Link to={"/login"}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

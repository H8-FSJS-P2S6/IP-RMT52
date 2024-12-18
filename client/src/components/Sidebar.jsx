import { Link } from "react-router-dom";
import { GiCardPlay } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { IoLogoGameControllerB } from "react-icons/io";

export default function Sidebar() {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-16 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
        <ul className="space-y-2 font-medium">
          <Link to={"/cards"}>
            <li>
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <GiCardPlay />
                <span className="ms-3">Cards</span>
              </p>
            </li>
          </Link>
          <Link to={"/cards/favorite"}>
            <li>
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <MdFavorite />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  My Favorite
                </span>
              </p>
            </li>
          </Link>
          <Link to={"/minigames"}>
            <li>
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <IoLogoGameControllerB />
                <span className="flex-1 ms-3 whitespace-nowrap">Minigames</span>
              </p>
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  );
}

import { useState } from "react";
import { baseUrl } from "../helper/baseUrl";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const favoritesResponse = await baseUrl.get("/cards/favorite", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setFavorites(favoritesResponse.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
      console.log(err, "<<< err - fetchFavorites");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleOnDelete = async (favoriteId) => {
    try {
      Swal.fire({
        title: "Are you sure want to delete this card?",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await baseUrl.delete(`/cards/favorite/delete/${favoriteId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            });
            Swal.fire({
              icon: "success",
              title: "Card deleted",
              showConfirmButton: false,
            });
            await fetchFavorites();
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message,
            });
          }
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
      console.log(err, "<<< e - handleOnDelete");
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <div key={favorite.id} className="flex flex-col">
              <Link to={`/cards/${favorite.id}`}>
                <img
                  src={favorite.image_url}
                  alt={favorite.name}
                  className="w-full h-auto"
                />
              </Link>
              <p className="dark:text-white text-center my-3">
                Stock: {favorite.stock}
              </p>
              <Link to={`/cards/favorite/edit/${favorite.favoriteId}`}>
                <button className="my-2 px-4 py-2 rounded-md dark:text-yellow-700 text-yellow-200 dark:bg-yellow-100 dark:hover:bg-yellow-300 bg-yellow-700 hover:bg-yellow-500 w-full transition duration-300 ease-in-out">
                  Update
                </button>
              </Link>
              <button
                className="px-4 py-2 rounded-md dark:text-red-700 text-red-200 dark:bg-red-100 dark:hover:bg-red-300 bg-red-700 hover:bg-red-500 w-full transition duration-300 ease-in-out"
                onClick={() => handleOnDelete(favorite.favoriteId)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No favorite cards found.</p>
        )}
      </div>
    </div>
  );
}

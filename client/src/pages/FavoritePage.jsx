import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FavoriteMonsterCard from "../components/Card2";
import { baseURL } from "../helpers/http-client";

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login");
        return;
      }

      const response = await baseURL.get("/favorites", {
        params: { userId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setFavorites(response.data.data);
    } catch (err) {
      console.log(err, "<<< err fetchFavorites");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="mb-4">
          <button
            onClick={() => navigate("/")}
            className="btn btn-secondary me-2"
          >
            Back to Home
          </button>
        </div>
        <h2 className="mb-4">Favorite Monsters</h2>
        <div className="row">
          {favorites.length > 0 ? (
            favorites.map((monster) => (
              <FavoriteMonsterCard
                key={monster.Monster.id}
                monster={monster.Monster}
              />
            ))
          ) : (
            <p>No favorite monsters added yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default FavoritePage;

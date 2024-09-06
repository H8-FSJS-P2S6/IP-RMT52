import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/http-client";

export default function FavoriteMonsterCard({ monster }) {
  const [isRemoved, setIsRemoved] = useState(false);
  const navigate = useNavigate();

  const handleRemoveFromFavorite = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      await baseURL.delete(`/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsRemoved(true);
    } catch (err) {
      console.error("Failed to remove from favorites:", err);
    }
  };

  if (isRemoved) {
    return null;
  }

  return (
    <div key={monster.id} className="col-md-4 mb-4">
      <div className="card">
        <img
          src={monster.imgUrl || "https://via.placeholder.com/150"}
          alt={monster.name}
          className="card-img-top"
          style={{ height: "150px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{monster.name}</h5>
          <div className="d-flex justify-content-between">
            <button
              onClick={() => navigate(`/monster/${monster.id}`)}
              className="btn btn-success btn-sm me-2"
            >
              Detail
            </button>
            <button
              onClick={() => handleRemoveFromFavorite(monster.id)}
              className="btn btn-danger btn-sm"
            >
              Remove from Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

FavoriteMonsterCard.propTypes = {
  monster: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    imgUrl: PropTypes.string,
  }).isRequired,
};

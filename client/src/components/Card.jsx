import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/http-client";

export default function MonsterCard({ monster }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/monster/${id}`);
  };

  const handleAddToFavorite = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        navigate("/login");
        return;
      }

      await baseURL.post(
        "/favorites",
        { monsterId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsFavorite(true);
    } catch (err) {
      console.error("Failed to add to favorites:", err);
    }
  };

  const handleUploadImage = (id) => {
    navigate(`/monster/${id}/update-img`);
  };

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
              onClick={() => handleDetail(monster.id)}
              className="btn btn-success btn-sm me-2"
            >
              Detail
            </button>
            <button
              onClick={() => handleAddToFavorite(monster.id)}
              className="btn btn-primary btn-sm"
              disabled={isFavorite}
            >
              {isFavorite ? "Added to Favorites" : "Add to Favorite"}
            </button>
            <button
              onClick={() => handleUploadImage(monster.id)}
              className="btn btn-secondary btn-sm"
            >
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

MonsterCard.propTypes = {
  monster: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    imgUrl: PropTypes.string,
  }).isRequired,
};

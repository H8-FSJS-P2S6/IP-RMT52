import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../helper/baseUrl";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setCard } from "../features/card/cardSlice.js";
import Loader from "../components/Loader";
import { setLoader } from "../features/loader/loaderSlice.js";

export default function CardDetailPage() {
  const { cardId } = useParams();
  const { card } = useSelector((state) => state.card);
  const { loader } = useSelector((state) => state.loader);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const fetchCardById = async () => {
    try {
      dispath(setLoader(true));
      const response = await baseUrl.get(`/cards/${cardId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      dispath(setCard(response.data));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
      console.log(err, "<<< err - fetchCardById");
    } finally {
      dispath(setLoader(false));
    }
  };

  useEffect(() => {
    fetchCardById();
  }, [cardId]);

  if (!card) return <p>Loading...</p>;

  const handleAddToFavorites = async (cardId) => {
    try {
      await baseUrl.post(
        `/cards/favorite/add/${cardId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Added to favorites",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/cards/favorite");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
      console.log(err);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 mt-10">
            <img
              src={card.image_url}
              alt={card.name}
              className="w-full md:w-2/5 h-auto object-cover rounded-lg mx-3"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 dark:text-neutral-300">
                {card.name}
              </h2>
              <p className="text-gray-700 mb-2 dark:text-neutral-300">
                <strong>Type:</strong> {card.type}
              </p>
              <p className="text-gray-700 mb-2 dark:text-neutral-300">
                <strong>Frame Type:</strong> {card.frameType}
              </p>
              <p className="text-gray-700 mb-2 dark:text-neutral-300">
                <strong>Description:</strong> {card.desc}
              </p>
              {card.atk && (
                <p className="text-gray-700 mb-2 dark:text-neutral-300">
                  <strong>ATK:</strong> {card.atk}
                </p>
              )}
              {card.def && (
                <p className="text-gray-700 mb-2 dark:text-neutral-300">
                  <strong>DEF:</strong> {card.def}
                </p>
              )}
              {card.level && (
                <p className="text-gray-700 mb-2 dark:text-neutral-300">
                  <strong>Level:</strong> {card.level}
                </p>
              )}
              {card.race && (
                <p className="text-gray-700 mb-2 dark:text-neutral-300">
                  <strong>Race:</strong> {card.race}
                </p>
              )}
              {card.archetype && (
                <p className="text-gray-700 mb-2 dark:text-neutral-300">
                  <strong>Archetype:</strong> {card.archetype}
                </p>
              )}
              {card.attribute && (
                <p className="text-gray-700 mb-2 dark:text-neutral-300">
                  <strong>Attribute:</strong> {card.attribute}
                </p>
              )}
              <p className="text-gray-700 mb-2 dark:text-neutral-300">
                <strong>Price:</strong> ${card.price}
              </p>
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 w-full transition duration-300 ease-in-out"
                >
                  Back
                </button>
                <button
                  onClick={() => handleAddToFavorites(card.id)}
                  className="px-4 py-2 border border-transparent rounded-md text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 w-full transition duration-300 ease-in-out"
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

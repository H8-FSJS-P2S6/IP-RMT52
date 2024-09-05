import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../helper/baseUrl";
import Swal from "sweetalert2";

export default function EditFavorite() {
  const [stock, setStock] = useState("");
  const { favoriteId } = useParams();
  const navigate = useNavigate();

  const handleOnUpdate = async (e) => {
    e.preventDefault();
    try {
      await baseUrl.put(
        `/cards/favorite/edit/${favoriteId}`,
        {
          stock,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Stock updated",
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
      console.log(err, "<<< e - handleOnUpdate");
    }
  };

  return (
    <div className="mt-24">
      <div className="text-center text-2xl font-bold text-neutral-600 dark:text-neutral-300">
        <p className="">Edit stock</p>
      </div>
      <form className="max-w-md mx-auto" onSubmit={handleOnUpdate}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="floating_stock"
            id="floating_stock"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
          <label
            htmlFor="floating_stock"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Stock
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
      </form>
    </div>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setArchetypes } from "../features/card/archetypesSlice";
import { setCards } from "../features/card/cardsSlice";
import { setPage } from "../features/card/filterSlice";
import Filter from "../components/Filter";
import { setLoader } from "../features/loader/loaderSlice";
import Loader from "../components/Loader";

export default function CardPage() {
  // Pemakaian redux
  const { cards } = useSelector((state) => state.cards);
  const { pagination } = useSelector((state) => state.cards);
  const { loader } = useSelector((state) => state.loader);

  const { search, archetype, sort, page } = useSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const BASE_URL = "https://yugioh.forestoay.xyz/";

  const fetchCards = async () => {
    const url = new URL(BASE_URL);
    url.pathname = "/cards";

    if (debouncedSearch) {
      url.searchParams.append("name", debouncedSearch);
    }

    if (archetype) {
      url.searchParams.append("archetype", archetype);
    }

    url.searchParams.append("page", page.toString());
    url.searchParams.append("sort", sort);

    try {
      dispatch(setLoader(true));
      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      dispatch(
        setCards({
          cards: response.data.cards,
          pagination: {
            currentPage: response.data.currentPage,
            totalPages: response.data.totalPages,
            totalRows: response.data.totalCards,
          },
        })
      );
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
      console.log(err, "<<< e - fetchCards");
    } finally {
      dispatch(setLoader(false));
    }
  };

  const fetchArchetypes = async () => {
    const url = new URL(BASE_URL);
    url.pathname = "/archetype";

    try {
      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      dispatch(setArchetypes(response.data));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
      console.log(err, "<<< e - fetchArchetypes");
    }
  };

  useEffect(() => {
    fetchArchetypes();
  }, []);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    fetchCards();
  }, [debouncedSearch, sort, page, archetype]);

  // Pagination
  const getPaginationRange = () => {
    const { currentPage, totalPages } = pagination;
    const siblings = 2;
    const range = [];

    if (totalPages <= siblings * 2 + 1) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage <= siblings + 1) {
        for (let i = 1; i <= siblings * 2 + 1; i++) {
          range.push(i);
        }
        range.push("...");
        range.push(totalPages);
      } else if (currentPage >= totalPages - siblings) {
        range.push(1);
        range.push("...");
        for (let i = totalPages - siblings * 2; i <= totalPages; i++) {
          range.push(i);
        }
      } else {
        range.push(1);
        range.push("...");
        for (let i = currentPage - siblings; i <= currentPage + siblings; i++) {
          range.push(i);
        }
        range.push("...");
        range.push(totalPages);
      }
    }
    return range;
  };

  return (
    <div className="p-4">
      <Filter />
      {loader ? (
        <Loader />
      ) : (
        <>
          {/* Card List */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            {cards.length > 0 ? (
              cards.map((card) => (
                <div key={card.id} className="flex">
                  <Link to={`/cards/${card.id}`}>
                    <img
                      src={card.image_url}
                      alt={card.name}
                      className="w-full h-auto"
                    />
                  </Link>
                </div>
              ))
            ) : (
              <p>No cards found.</p>
            )}
          </div>
          {/* Pagination */}
          <nav
            aria-label="Page navigation example"
            className="py-3 m-auto flex justify-center"
          >
            <ul className="flex items-center space-x-2">
              {/* Previous Button */}
              {pagination.currentPage > 1 && (
                <li className="dark:text-neutral-300">
                  <button
                    onClick={() =>
                      dispatch(setPage((prev) => Math.max(prev - 1, 1)))
                    }
                    className="px-4 py-2 border border-gray-300 rounded-md"
                  >
                    Previous
                  </button>
                </li>
              )}

              {/* Page Numbers */}
              {getPaginationRange().map((item, index) => {
                if (item === "...") {
                  return (
                    <li
                      key={index}
                      className="px-4 py-2 border border-gray-300 rounded-md dark:text-neutral-300"
                    >
                      {item}
                    </li>
                  );
                }
                return (
                  <li
                    key={index}
                    className={`px-4 py-2 border border-gray-300 rounded-md ${
                      item === pagination.currentPage
                        ? "bg-blue-500 text-white"
                        : "dark:text-neutral-300"
                    }`}
                  >
                    <button onClick={() => dispatch(setPage(item))}>
                      {item}
                    </button>
                  </li>
                );
              })}

              {/* Next Button */}
              {pagination.currentPage < pagination.totalPages && (
                <li className="dark:text-neutral-300">
                  <button
                    onClick={() =>
                      dispatch(
                        setPage((prev) =>
                          Math.min(prev + 1, pagination.totalPages)
                        )
                      )
                    }
                    className="px-4 py-2 border border-gray-300 rounded-md"
                  >
                    Next
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

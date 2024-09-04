import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function CardPage() {
  const [search, setSearch] = useState("");
  const [archetype, setArchetype] = useState("");
  const [sort, setSort] = useState("DESC");
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState({
    cards: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalRows: 0,
    },
  });
  const [archetypes, setArchetypes] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const BASE_URL = "https://yugioh.forestoay.xyz/";

  // Fetch cards based on debounced search
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
      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setCards({
        cards: response.data.cards,
        pagination: {
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalRows: response.data.totalCards,
        },
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "An error occurred",
      });
      console.log(err, "<<< e - fetchCards");
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

      setArchetypes(response.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "An error occurred",
      });
      console.log(err, "<<< e - fetchArchetypes");
    }
  };

  useEffect(() => {
    fetchArchetypes();
  }, []);

  // Debounce search input
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

  // Pagination siblings logic
  const getPaginationRange = () => {
    const { currentPage, totalPages } = cards.pagination;
    const siblings = 2; // Number of page numbers to show around the current page
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
      {/* Search, Filter, and Sort */}
      <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="p-2 border border-gray-300 rounded-md"
        />

        {/* Filter */}
        <select
          value={archetype}
          onChange={(e) => {
            setArchetype(e.target.value);
            setPage(1);
          }}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Archetypes</option>
          {archetypes.map((type) => (
            <option key={type.name} value={type.name}>
              {String(type.name)}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="asc">Sort by Level (Ascending)</option>
          <option value="desc">Sort by Level (Descending)</option>
        </select>
      </div>

      {/* Card List */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        {cards.cards.length > 0 ? (
          cards.cards.map((card) => (
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
          {page > 1 && (
            <li className="dark:text-neutral-300">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
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
              <li key={index}>
                <button
                  onClick={() => setPage(item)}
                  className={`px-4 py-2 border border-gray-300 rounded-md dark:text-neutral-300 ${
                    item === page ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {item}
                </button>
              </li>
            );
          })}

          {/* Next Button */}
          {page < cards.pagination.totalPages && (
            <li>
              <button
                onClick={() =>
                  setPage((prev) =>
                    Math.min(prev + 1, cards.pagination.totalPages)
                  )
                }
                className="px-4 py-2 border border-gray-300 rounded-md dark:text-neutral-300"
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

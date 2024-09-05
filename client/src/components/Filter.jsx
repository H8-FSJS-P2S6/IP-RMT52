import { useDispatch, useSelector } from "react-redux";
import {
  setArchetype,
  setPage,
  setSearch,
  setSort,
} from "../features/card/filterSlice";

export default function Filter() {
  const { archetypes } = useSelector((state) => state.archetypes);
  const { search, archetype, sort } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  return (
    <div>
      {/* Search, Filter, and Sort */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-col sm:w-full lg:flex-row lg:space-x-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
            dispatch(setPage(1));
          }}
          className="p-2 border border-gray-300 rounded-md w-full sm:w-full lg:w-auto"
        />

        {/* Filter */}
        <select
          value={archetype}
          onChange={(e) => {
            dispatch(setArchetype(e.target.value));
            dispatch(setPage(1));
          }}
          className="p-2 border border-gray-300 rounded-md w-full sm:w-full lg:w-auto"
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
          onChange={(e) => dispatch(setSort(e.target.value))}
          className="p-2 border border-gray-300 rounded-md w-full sm:w-full lg:w-auto"
        >
          <option value="asc">Sort by Level (Ascending)</option>
          <option value="desc">Sort by Level (Descending)</option>
        </select>
      </div>
    </div>
  );
}

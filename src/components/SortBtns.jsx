// src/components/SortBtns.js

const SortBtns = ({ setSortBy, sortBy }) => {
  return (
    <div className="rounded-md overflow-hidden w-fit py-3 bg-white/10 mb-4">
      {/* Sort Buttons */}
      <button
        onClick={(e) => setSortBy(e.target.textContent)}
        className={`px-5 inline-block cursor-pointer text-gray-300 ${
          sortBy === "All" && "text-white font-semibold"
        }`}
      >
        All
      </button>
      <button
        onClick={(e) => setSortBy(e.target.textContent)}
        className={`px-5 border-l border-white/10 inline-block cursor-pointer text-gray-300 ${
          sortBy === "Active" && "text-white font-semibold"
        }`}
      >
        Active
      </button>
      <button
        onClick={(e) => setSortBy(e.target.textContent)}
        className={`px-5 border-l border-white/10 inline-block cursor-pointer text-gray-300 ${
          sortBy === "Completed" && "text-white font-semibold"
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default SortBtns;

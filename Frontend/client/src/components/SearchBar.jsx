import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({
  searchText,
  setSearchText,
  handleSearch,
  listOfRestaurants,
  setFilteredRestaurants,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 🔥 debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.trim()) {
        const filtered = listOfRestaurants.filter((res) =>
          res?.info?.name?.toLowerCase().includes(searchText.toLowerCase()),
        );
        setFilteredRestaurants(filtered);
      } else {
        setFilteredRestaurants(listOfRestaurants);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [searchText]);

  // 🔥 suggestions
  const suggestions = listOfRestaurants
    .filter((res) =>
      res?.info?.name?.toLowerCase().includes(searchText.toLowerCase()),
    )
    .slice(0, 5);

  return (
    <div className="relative w-full md:w-[420px] mt-4">
      {/* INPUT + BUTTON WRAPPER */}
      <div className="flex">
        {/* INPUT */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchText}
            placeholder="Search restaurants, cuisines..."
            className="w-full bg-white border border-gray-200 rounded-l-2xl pl-11 pr-10 py-3 shadow-sm outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            onChange={(e) => {
              setSearchText(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />

          {/* SEARCH ICON */}
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          {/* CLEAR BUTTON */}
          {searchText && (
            <X
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-500"
              onClick={() => {
                setSearchText("");
                setFilteredRestaurants(listOfRestaurants);
              }}
            />
          )}
        </div>

        {/* SEARCH BUTTON */}
        <button
          className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-6 rounded-r-2xl font-semibold shadow-md transition-all"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* 🔥 SUGGESTIONS DROPDOWN */}
      {showSuggestions && searchText && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-xl shadow-lg overflow-hidden">
          {suggestions.length > 0 ? (
            suggestions.map((res, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setSearchText(res?.info?.name);
                  setFilteredRestaurants([res]);
                  setShowSuggestions(false);
                }}
              >
                {res?.info?.name}
              </div>
            ))
          ) : (
            <div className="p-3 text-sm text-gray-400">
              No restaurants found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

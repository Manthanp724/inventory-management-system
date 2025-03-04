import React from "react";

const Search = () => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <form>
        <label htmlFor="search-input" className="sr-only">
          Search
        </label>
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          {/* Input Field */}
          <input
            type="search"
            id="search-input"
            className="block w-full p-3 pl-12 text-base text-gray-900 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Search orders, customers..."
            required
          />

          {/* Search Button */}
          <button
            type="submit"
            className="absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-md"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;

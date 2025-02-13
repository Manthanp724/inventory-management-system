import React from "react";

const Search = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <form>
        <label htmlFor="default-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
            id="default-search"
            className="block w-full p-3 pl-10 text-base font-medium text-gray-900 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600"
            placeholder="Search for customers, orders, organizations..."
            required
          />

          {/* Search Button */}
          <button
            type="submit"
            className="py-2 absolute right-2.5 bottom-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5  rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-lg"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
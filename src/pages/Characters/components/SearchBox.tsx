import React, { useState, useCallback } from "react";
import searchIcon from "@/assets/icons/search.svg";
import closeIcon from "@/assets/icons/circle-x.svg";
import debounce from "lodash/debounce";

type TSearchBoxProps = {
  onSearch: (query: string) => void;
};

const SearchBox: React.FC<TSearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const performSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.length >= 3 || searchQuery.length === 0) {
        onSearch(searchQuery);
      }
    }, 500),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    performSearch(value.trim());
  };

  const clearInput = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form className="flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg focus-within:border-red-500">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          className="w-full p-3 px-10  text-md bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-400"
          placeholder="Search for a character by name (min. 3 characters)"
        />

        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <img src={searchIcon} alt="Search Icon" className="w-6 h-6" />
        </div>

        {query && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <img src={closeIcon} alt="Clear Icon" className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBox;

import { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  return (
    <form className="relative w-2/4 bg-black border border-zinc-600 rounded-full flex items-center shadow-md">
      {/* Input Field */}
      <input
        type="text"
        className="w-full bg-transparent px-4 py-2 text-white placeholder-gray-400 outline-none"
        placeholder={placeholder}
      />
      
      {/* Search Button */}
      <button
        type="submit"
        onClick={onSearch}
        className="bg-white text-white p-3 rounded-r-full transition-all"
      >
        <img src="/search.svg" alt="search" className="h-5" />
      </button>
    </form>
  );
};

export default SearchBar;

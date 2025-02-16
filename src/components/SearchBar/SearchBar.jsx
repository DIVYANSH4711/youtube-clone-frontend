import { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {

  return (
    <form
      className="w-2/4  relative group px-0.5 border-1 hover:border-2 border-gray-300 bg-gray-700 rounded-full h-3/4 flex items-center"
    >
      <div className="w-1/10 h-9/10  rounded-l-full">

      </div>
      <input 
        type="text"
        className="w-8/10 h-9/10 bg-gray-700 focus:outline-none text-white"
        placeholder={placeholder}
      />
      <button
        type="submit"
        onClick={onSearch}
        className="w-1/10 h-9/10 bg-white hover:border-2 hover:border-blue-400 flex justify-center cursor-pointer items-center text-white font-bold rounded-full"
      >
        <img
          src="/search.svg"
          alt="search"
          className="h-1/2 w-1/2 "
        />
      </button>
    </form>
  );
};

export default SearchBar;

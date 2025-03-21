import { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  return (
    <form className="relative w-3/5 bg-black border border-zinc-600 rounded-full flex items-center shadow-md">
      {/* Input Field */}
      <input
        type="text"
        onClick={()=> alert("Not Working for Now")}
        className="w-full bg-transparent px-8  text-white placeholder-gray-400 outline-none"
        placeholder={placeholder}
      />
      
      {/* Search Button */}
      <button
        type="submit"
        onClick={()=> alert("Not working for now")}
        disabled={true}
        className="bg-white text-white p-3 rounded-r-full transition-all"
      >
        <img src="/search.svg" alt="search" className="h-5" />
      </button>
    </form>
  );
};

export default SearchBar;

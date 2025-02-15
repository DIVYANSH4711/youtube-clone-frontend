import { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl w-3/4 mx-auto relative group"
    >
      <div
        className={`relative flex items-center w-full transition-all duration-300 
        ${
          isFocused
            ? "border-gray-300 text-white"
            : "bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] hover:border-gray-300"
        }
        rounded-full overflow-hidden backdrop-blur-sm border border-transparent`}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full px-6 py-3 bg-transparent outline-none text-gray-800 placeholder-gray-500"
        />
        <button
          type="submit"
          className={`px-6 py-3 transition-colors duration-300 
          ${isFocused ? "text-purple-600 " : "text-gray-500"} 
          hover:text-purple-700 focus:outline-none`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

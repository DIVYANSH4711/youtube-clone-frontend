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
      className="w-2/4  relative group border border-gray-300 rounded-md h-1/2 flex items-center"
    >
      
    </form>
  );
};

export default SearchBar;

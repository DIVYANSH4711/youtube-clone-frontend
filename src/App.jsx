import React from "react";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { Outlet, useOutletContext } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar.jsx";

function App() {
  const { user } = useOutletContext();

  return (
    <div className="flex h-screen w-screen fixed top-0 left-0 bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-black border-r border-gray-700">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 flex flex-col">
        {/* Top Navigation */}
        <div className="h-16  flex justify-between items-center px-6 border-b border-zinc-500 bg-black shadow-md">
          <SearchBar />
          <div className="mr-3 flex items-center justify-center p-0.5 hover:p-0 rounded-full border-2 border-zinc-500 hover:border-gray-400 transition-all cursor-pointer">
            <div className="bg-lime-50 px-4 py-2 flex items-center space-x-1 rounded-full">
              <span className="russo-one-regular text-black text-sm">Portfolio</span>
              <img src="/share.png" alt="redirect-to-creator" className="h-5" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;

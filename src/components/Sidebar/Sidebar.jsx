import { NavLink, useOutletContext, useNavigate } from "react-router-dom";
import NavItem from "../NavItem/NavItem";
import axios from "axios";

export default function Sidebar() {
  const { user } = useOutletContext();
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      console.log("Logging out...", `${import.meta.env.VITE_API_URL}/users/logout`);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/logout`,
        {},
        {
          withCredentials: true, 
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      navigate("/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center h-full bg-black border-r border-zinc-400 shadow-md relative">
      {/* Logo & Toggle */}
      <div className="mt-4 mb-5 flex justify-between items-center w-5/6">
        <NavLink to="/u/home" className="w-1/2 flex items-center ml-4">
          <img src="/logo.gif" alt="logo" className="h-8 invert" />
        </NavLink>
        <button className="p-2 rounded-md bg-black">
          <img src="/sidebar.svg" alt="sidebar-flip" className="h-6 invert" />
        </button>
      </div>

      {/* Upload Button */}
      <div className="w-5/6">
        <div className="w-full flex justify-center items-center bg-zinc-800 border border-gray-600 text-white text-sm py-2 rounded-full shadow-md hover:scale-105 transition-transform cursor-pointer">
          <img src="/plus.svg" alt="upload" className="h-5 invert" />
          <span className="ml-2">UPLOAD</span>
        </div>
      </div>

      {/* Silver Lining Divider */}
      <div className="w-5/6 border-t border-gray-500 my-4 opacity-50" />

      {/* Navigation */}
      <div className="w-full px-4 space-y-2 flex-grow">
        <NavItem to="/u/home" icon="home" text="Home" />
        <NavItem to="/u/watch-history" icon="time-past" text="History" />
        <NavItem to="/u/community" icon="population-globe" text="Community" />
        <NavItem to="/u/subscription" icon="channel" text="Subscriptions" />
        <NavItem to="/u/liked-videos" icon="likevideo" text="Liked Videos" />
      </div>

      {/* User Profile */}
      <div className="absolute bottom-4 border-t border-zinc-400 left-0 w-full px-4 pt-2">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar || "/man.gif"}
            alt="avatar"
            className="w-12 h-12 rounded-full border border-gray-600 shadow-md"
          />
          <div>
            <p 
              className="text-white hover:underline cursor-pointer font-semibold chakra-petch-medium text-lg"
              onClick={() => navigate(`/u/channel/${user.username}`)}
            >
              {user.fullName}
            </p>
            <p className="text-gray-400 chakra-petch-medium text-sm">@{user.username}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 cursor-pointer text-white py-2 rounded-md mt-4 flex items-center justify-center">
          <span className="text-sm chakra-petch-semibold font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
}

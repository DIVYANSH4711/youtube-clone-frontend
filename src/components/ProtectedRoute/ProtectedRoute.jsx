import { useEffect, useState } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/current-user`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        console.log("Auth API Response:", response.data);
        setIsAuthenticated(!!response.data?.data);
        setUser(response.data?.data || {});
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);
  console.log("isAuthenticated:", isAuthenticated);

  if (isAuthenticated === null) return <Skeleton />;

  return isAuthenticated ? <Outlet context={{ user }} /> : <Navigate to="/auth/login" />;
};
// function Skeleton 
function Skeleton() {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar Skeleton */}
      <div className="w-60 flex flex-col border-r border-gray-800">
        {/* Logo Skeleton */}
        <div className="p-4 flex justify-between items-center">
          <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Upload Button Skeleton */}
        <div className="px-4 mb-4">
          <div className="h-10 bg-gray-700 rounded-full animate-pulse"></div>
        </div>

        {/* Navigation Skeleton */}
        <nav className="flex-1 px-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 mb-1">
              <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
            </div>
          ))}
        </nav>

        {/* User Profile Skeleton */}
        <div className="mt-auto border-t border-gray-800 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
          <div>
            <div className="h-4 bg-gray-700 rounded w-24 animate-pulse mb-1"></div>
            <div className="h-3 bg-gray-700 rounded w-20 animate-pulse"></div>
          </div>
        </div>

        {/* Logout Button Skeleton */}
        <div className="h-12 bg-gray-700 animate-pulse"></div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Skeleton */}
        <div className="h-16 border-b border-gray-800 flex items-center justify-between px-4">
          {/* Search Bar Skeleton */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-xl">
              <div className="w-full h-10 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Portfolio Button Skeleton */}
          <div className="ml-4">
            <div className="w-28 h-10 bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Content Area Skeleton */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProtectedRoute;

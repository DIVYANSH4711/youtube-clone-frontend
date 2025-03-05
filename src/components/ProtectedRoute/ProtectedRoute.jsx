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

  if (isAuthenticated === null) 
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <img src="/logo.gif" alt="Loading..." className="w-1/20 invert" />
      </div>
  )

  return isAuthenticated ? <Outlet context={{ user }} /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;

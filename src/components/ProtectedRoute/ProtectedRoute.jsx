import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setIsAuthenticated(false);

      try {
        const response = await axios.get("/api/auth/validate", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, 
        });
        setIsAuthenticated(response.data.valid);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>; // Prevent flashing
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;

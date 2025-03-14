import React from "react";
import { Navigate } from "react-router-dom";

const ByPass = () => {
   return <Navigate to="u/home" replace />;
};

export default ByPass;

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
// import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";


function PrivateRoutes() {
  const [cookies] = useCookies();
  const token = cookies["user-token"];
      const secretKey = process.env.REACT_APP_JWT_SECRET;
      const decodedToken = jwt_decode(token, secretKey);
      const isAdmin = decodedToken.isAdmin;
  return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" />;
}

export default PrivateRoutes;
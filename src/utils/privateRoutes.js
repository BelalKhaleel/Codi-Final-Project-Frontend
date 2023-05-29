import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import jwtDecode from "jwt-decode";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const validateToken = () => {
      if (cookie.load("user-token") !== undefined) {
        const token = cookie.load("user-token");
        console.log(token);
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            const isAdmin = decodedToken.isAdmin;
            setIsValidToken(isAdmin);
          } catch (error) {
            setIsValidToken(false);
          }
        } else {
          setIsValidToken(false);
        }
        
        setIsLoading(false);
      };
      
      validateToken();
    }
    }, []);
    
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isValidToken) {
    return <Component {...rest} />;
  } else {
    navigate("/login");
    return null;
  }
};

export default PrivateRoute;

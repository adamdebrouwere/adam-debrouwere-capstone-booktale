import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthenticationContext = createContext();

export const useAuthentication = () => useContext(AuthenticationContext);

export const AuthenticationProvider = ({ children, BASE_URL }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  });

  useEffect(() => {
    const authCheck = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/authenticated`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (
            response.status === 200 &&
            response.data.message === "User Authenticated"
          ) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Auth Error:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }

    };
    authCheck();
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };



  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

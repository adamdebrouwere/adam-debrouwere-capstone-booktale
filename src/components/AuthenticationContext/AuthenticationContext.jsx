import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthenticationContext = createContext({
  authenticated: false,
  setUser: () => {},
  user: null,
  login: () => {},
  logout: () => {},
  setLoading: () => {},
  loading: false,
  setError: () => {},
  error: null,
  BASE_URL: "",
  token: "",
});

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      const authCheck = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/authenticated`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (
            response.status === 200 &&
            response.data.message === "User Authenticated"
          ) {
            setAuthenticated(true);

            const userResponse = await axios.get(`${BASE_URL}/user`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(userResponse.data.user);
          } else {
            setAuthenticated(false);
            setUser(null)
          }
        } catch (error) {
          console.error("Auth Error:", error);
          setAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };

      setLoading(true);
      authCheck();
    } else {
      setAuthenticated(false);
    }
  }, [BASE_URL]);

  const login = async (username, password) => {
    try {
      setLoading(true); 
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });

      if (response.data.token) {
        Cookies.set("token", response.data.token, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });
        setAuthenticated(true);

        
        const userResponse = await axios.get(`${BASE_URL}/user`, {
          headers: { Authorization: `Bearer ${response.data.token}` },
        });

        setUser(userResponse.data.user);
        setLoading(false);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{ authenticated, user, setUser, login, logout, loading, setLoading, error, setError, BASE_URL, token }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

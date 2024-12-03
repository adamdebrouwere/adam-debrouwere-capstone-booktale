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
  ORIGIN_URL: "",
  token: "",
  getPastBooksData: () => {},
  pastTales: null,
  setPastTales: () => {},
});

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pastTales, setPastTales] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const ORIGIN_URL = import.meta.env.VITE_ORIGIN_URL;
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
            setUser(null);
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
  }, [token]);

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
          SameSite: "Strict",
        });
        setAuthenticated(true);

        const userResponse = await axios.get(`${BASE_URL}/user`, {
          headers: { Authorization: `Bearer ${response.data.token}` },
        });

        setUser(userResponse.data.user);
        setLoading(false);
      } else {
        throw new Error("Invalid username or password ");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Login failed. Please check your username or password.");
      setLoading(false);
    }
  };

  const logout = async () => {
    Cookies.remove("token");
    setAuthenticated(false);
    setUser(null);
  };

  const getPastBooksData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/pastTales/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPastTales(response.data.user_books);
    } catch (error) {
      setError(`Error fetching book data: ${error}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <AuthenticationContext.Provider
      value={{
        authenticated,
        user,
        setUser,
        login,
        logout,
        loading,
        setLoading,
        error,
        setError,
        BASE_URL,
        ORIGIN_URL,
        token,
        getPastBooksData,
        pastTales,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

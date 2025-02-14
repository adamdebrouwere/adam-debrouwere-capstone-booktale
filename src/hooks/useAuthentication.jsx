import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL, ORIGIN_URL } from '../constants';

const useAuthentication = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pastTales, setPastTales] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      const authCheck = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/auth/authenticated`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200 && response.data.message === "User Authenticated") {
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

      authCheck();
    } else {
      setAuthenticated(false);
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });

      if (response.data.token) {
        Cookies.set("token", response.data.token, {
          expires: 7,
          secure: import.meta.env.MODE === "production",
          sameSite: "Strict",
        });
        setAuthenticated(true);
        const userResponse = await axios.get(`${BASE_URL}/user`, {
          headers: { Authorization: `Bearer ${response.data.token}` },
        });
        setUser(userResponse.data.user);
        setError("");
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Login failed. Please check your username or password.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    Cookies.remove("token");
    setAuthenticated(false);
    setPastTales([]);
    setUser(null);
  };

  const getPastBooksData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${user.id}`, {
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

  return {
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
    setPastTales,
  };
};

export default useAuthentication;

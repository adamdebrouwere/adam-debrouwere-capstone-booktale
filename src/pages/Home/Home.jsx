import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home({ BASE_URL }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const getUserData = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`${BASE_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setLoggedIn(true);
          setUser(response.data.user);
          setError("");
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Error getting user data";
          console.error(errorMessage);
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };

      getUserData();
    } else {
      setIsLoading(false);
      setError("No token found. Please log in.");
      navigate('/login')
    }
  }, [BASE_URL, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!loggedIn) {
    return <div>Please log in to view the home page.</div>;
  }
  return (
    <div className="home">
      <p>{`welcome home ${user.username}`}</p>
      <button onClick={() => navigate('/create-booktale')}>CREATE A Booktale</button>
    </div>
  );
}

export default Home;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuthentication } from "../../components/AuthenticationContext/AuthenticationContext";

function Home() {
  const { loading, error, BASE_URL, user } = useAuthentication()
  // const [ user, setUser ] = useState("");
  console.log(user)
  
  
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = Cookies.get("token");

  //   if (token) {
  //     const getUserData = async () => {
  //       try {
  //         // loading(true);
  //         const response = await axios.get(`${BASE_URL}/user`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });

  //         // setLoggedIn(true);
  //         console.log(response.data)
  //         setUser(response.data.user);
  //         // error("");
  //       } catch (error) {
  //         const errorMessage =
  //           error.response?.data?.message || "Error getting user data";
  //         console.error(errorMessage);
  //         error(errorMessage);
  //       } finally {
  //         // loading(false);
  //       }
  //     };

  //     getUserData();
  //   } else {
  //     loading(false);
  //     error("No token found. Please log in.");
  //     navigate('/login')
  //   }
  // }, [BASE_URL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      <p>{`Welcome to booktale  ${user.username}!`}</p>
      <button onClick={() => navigate('/create-booktale')}>CREATE A Booktale</button>
    </div>
  );
}

export default Home;

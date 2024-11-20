import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

function Home({BASE_URL}) {
  const [response, setResponse] = useState("");
  
  const fetchFromServer = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      console.log(response.data)
      setResponse(response);
    } catch (error) {
      console.error("error fetching video data:", error);
    }
  };

  useEffect(() => {
    fetchFromServer();
  }, [])
  return <div className="home">{response.data}</div>;
}

export default Home;

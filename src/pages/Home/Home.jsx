import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import QrCodeGenerator from "../../components/QrCodeGenerator/QrCodeGenerator.jsx";


function Home({BASE_URL}) {
  // const [response, setResponse] = useState("");
  
  // const fetchFromServer = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}`);
  //     setResponse(response.data);
  //   } catch (error) {
  //     console.error("error db data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchFromServer();
  // }, [])
  return (
    <div className="home">
    <QrCodeGenerator />

    </div>
    
  )

}

export default Home;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthentication } from "../AuthenticationContext/AuthenticationContext";

function PastTalesDisplay() {
  const [pastTales, setPastTales] = useState([]);
  const { error, setError, loading, setLoading, BASE_URL, user, token } =
    useAuthentication();

  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      setLoading(true)
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

      getPastBooksData();
    } else {
      setLoading(false);
      setError("No token found. Please log in.");
    }
  }, []);

  return (
    <div>
      <h1>Past Tales</h1>
      <div>
        {pastTales.map((tale) => {
          const date = new Date(tale.created_at);

          const formattedDate = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(date);

          return (
            <div key={tale.id}>
            <h4>{tale.title}</h4>
            <p>{tale.author}</p>
            <img
              height="200"
              src={tale.cover_url}
              alt={`cover for ${tale.title}`} onClick={() => navigate(`/booktale/${tale.qr_code_id}`) }
            />
            <p>I said: {tale.comment}</p>
            <p>On: {formattedDate}</p>
          </div>
          )
          
        })}
      </div>
    </div>
  );
}

export default PastTalesDisplay;

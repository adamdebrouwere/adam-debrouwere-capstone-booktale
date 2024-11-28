import axios from "axios";
import CommentCreator from "../../components/CommentCreator/CommentCreator.jsx";
import CommentDisplay from "../../components/CommentDisplay/CommentDisplay.jsx";
import BookInfoDisplay from "../../components/BookInfoDisplay/BookInfoDisplay.jsx";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { XMLParser } from "fast-xml-parser";

function BookCommentPage({ BASE_URL }) {
  const [comments, setComments] = useState([]);
  const [bookInfo, setBookInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);
  const { qrCodeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getUserData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
        } catch (error) {
          setError("Error fetching user data.");
        } finally {
          setIsLoading(false);
        }
      };
      getUserData();
    } else {
      setIsLoading(false);
      setError("No token found. Please log in.");
    }
  }, [BASE_URL]);

  async function getComments(id) {
    try {
      if (id) {
        const response = await axios.get(`${BASE_URL}/booktale/${id}`);

        setComments(response.data.comments);
      } else {
        setComments([]);
        console.error("Can't get comments", error);
      }
    } catch (error) {
      setError("Can't fetch comments. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getComments(qrCodeId);
  }, [qrCodeId, BASE_URL]);

  async function getBookInfo(id) {
    try {
      const response = await axios.get(`${BASE_URL}/bookInfo/${qrCodeId}`);
      setBookInfo(response.data.getBookInfo);
    } catch (error) {
      console.error("error getting book info:", error);
    }
  }
  useEffect(() => {
    getBookInfo(qrCodeId);
  }, [qrCodeId, BASE_URL]);

  async function postComment(id, newComment) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to post a comment.");
        return;
      }

      if (comments.some((userComment) => userComment.user_id === user.id)) {
        alert(
          "You have already commented. Scan another qr or create your own!"
        );
        return;
      }

      // const geoLocationPermission = window.confirm(
      //   "Do you want to include your location in your comment?"
      // );

      // if (!geoLocationPermission) {
      //   await axios.post(
      //     `${BASE_URL}/booktale/${id}`,
      //     { comment: newComment, username: user.username },
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );
      // } else

      const position = await new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                heading: position.coords.heading || null,
              });
            },
            (error) => {
              reject(error);
            },
            { enabledHighAccuracy: true, timeout: 10000, maximumAge: 0 }
          );
        } else {
          reject("Geolocation failure");
        }
      });

      const cordToText = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${position.latitude}&lon=${position.longitude}`
      );

      const parser = new XMLParser();

      const parsedCordToText = parser.parse(cordToText.data);

      const location = parsedCordToText.reversegeocode.addressparts;

      await axios.post(
        `${BASE_URL}/booktale/${id}`,
        {
          comment: newComment,
          username: user.username,
          location: {
            longitude: position.longitude,
            latitude: position.latitude,
            heading: position.heading,
            city: location.city,
            state: location.state,
            country: location.country,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getComments(id);
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again later.");
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to comment");
      return;
    }

    postComment(qrCodeId, comment);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      <BookInfoDisplay bookInfo={bookInfo} />
      {user ? (<CommentCreator
        handleSubmitComment={handleSubmitComment}
        setComment={setComment}
        id={qrCodeId}
        BASE_URL={BASE_URL}
      />) : <div>
        <button onClick={() => navigate("/login", {state: { from }})}>Log In</button>
        <button onClick={() => navigate("/signup", {state: { from }})}>Signup</button>
        </div>}
      <CommentDisplay comments={comments} BASE_URL={BASE_URL} />
    </div>
  );
}

export default BookCommentPage;

import './BookCommentsPage.scss'
import CommentCreator from "../../components/CommentCreator/CommentCreator.jsx";
import CommentDisplay from "../../components/CommentDisplay/CommentDisplay.jsx";
import BookInfoDisplay from "../../components/BookInfoDisplay/BookInfoDisplay.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { XMLParser } from "fast-xml-parser";
import { useAuthentication } from "../../components/AuthenticationContext/AuthenticationContext.jsx";

function BookCommentPage() {
  const [taleInfo, setTaleInfo] = useState([]);
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("");
  const { qrCodeId } = useParams();

  const { BASE_URL, setUser, user, setError, loading, setLoading, token } = useAuthentication()
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || `/Booktale/${qrCodeId}`;


  useEffect(() => {
    if (token && user) {
      const getUserData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(response.data.user);
        } catch (error) {
          setError(`Error fetching user data: ${error}`);
        } finally {
          setLoading(false);
        }
      };

      getUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  async function getComments(id) {
    try {
      if (id) {
        const response = await axios.get(`${BASE_URL}/tales/${id}`);
        setComments(response.data.comments);
      } else {
        setComments([]);
        console.error("Can't get comments", error);
      }
    } catch (error) {
      setError("Can't fetch comments. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getComments(qrCodeId);
  }, [qrCodeId]);

  async function getTaleInfo() {
    try {
      const response = await axios.get(`${BASE_URL}/tales/${qrCodeId}`);
      setTaleInfo(response.data.bookInfo[0]);
    } catch (error) {
      console.error("error getting book info:", error);
    }
  }
  
  useEffect(() => {
    getTaleInfo(qrCodeId);
  }, [qrCodeId]);

  async function postComment(id, newComment) {
    try {
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
      
      if (!comment) {
        alert("You must input something to commment.")
        return
      }

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
            { enabledHighAccuracy: true, timeout: 20000, maximumAge: 0 }
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
        `${BASE_URL}/user/${id}`,
        {
          comment: newComment,
          username: user.username,
          location: {
            longitude: position.longitude || 0,
            latitude: position.latitude || 0,
            heading: position.heading || "",
            city: location.city || "",
            state: location.state || "",
            country: location.country || "",
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
    if (!token) {
      setError("You must be logged in to comment");
      return;
    }
    
    postComment(qrCodeId, comment);
    setComment("")
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="book-comment-page">
      <BookInfoDisplay bookInfo={taleInfo} />
      {user ? (<CommentCreator
        handleSubmitComment={handleSubmitComment}
        setComment={setComment}
        comment={comment}
      />) : <div className="book-comment-page__button-container">
        <button onClick={() => navigate("/login", {state: { from }})}>Log In</button>
        <button onClick={() => navigate("/signup", {state: { from }})}>Sign Up</button>
        </div>}
      <CommentDisplay comments={comments} />
    </div>
  );
}

export default BookCommentPage;

import axios from "axios";
import CommentCreator from "../../components/CommentCreator/CommentCreator.jsx";
import CommentDisplay from "../../components/CommentDisplay/CommentDisplay.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BookCommentPage({ BASE_URL }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);
  const { qrCodeId } = useParams();

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
          setComments([])
          console.lerror("Can't get comments", error)
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
  
  async function postComment(id, newComment) {
    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        alert("You must be logged in to post a comment.");
        return;
      }

      if (comments.some(userComment => userComment.user_id === user.id
      )) {
        alert("You have already commented. Scan another qr or create your own!")
        return
      }

      await axios.post(
        `${BASE_URL}/booktale/${id}`,
       { comment: newComment },
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
      setError("you must be logged in to comment");
      return;
    }

    postComment(qrCodeId, comment)
  };

  if (isLoading) {
    return <p>Loading...</p>
  }

  
  return (
    <div className="">
      {/* <BookDescription book={book} /> */}
      <CommentCreator handleSubmitComment={handleSubmitComment} setComment={setComment} id={qrCodeId} BASE_URL={BASE_URL}/>
      <CommentDisplay comments={comments} BASE_URL={BASE_URL} />
    </div>
  );
}

export default BookCommentPage;

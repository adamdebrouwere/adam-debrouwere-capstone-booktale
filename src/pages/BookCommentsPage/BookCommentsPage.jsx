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
  const { bookId } = useParams();

  // useEffect(() => {
  //   const getBookById = async (id) => {
  //     const response = await axios.get(
  //       `${baseURL}/books/${id}?api_key=${API_KEY}`
  //     );
  //     setBook(response.data);
  //   };

  //   getBookById(bookId);
  // }, [bookId]);
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

  useEffect(() => {
    async function getComments(id) {
      try {
        if (id) {
          const response = await axios.get(`${BASE_URL}/books/${id}/comments`);
          setComments(response.data);
        }
      } catch (error) {
        setError("Can't fetch comments. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    getComments(bookId);
  }, [bookId, BASE_URL]);
  
  async function postComment(id, newComment) {
    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        alert("You must be logged in to post a comment.");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/comments/${id}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments((prevComments) => [...prevComments, response.data]);
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again later.");
    }
  }

  function handleCommentPost(event) {
    event.preventDefault();

    if (!comment) {
      alert("Please enter a comment.");
      return;
    }

    if (!user) {
      alert("You must be logged in to post a comment.");
      return;
    }

    const newComment = {
      name: user.username,
      comment: comment,
    };

    postComment(bookId, newComment);
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  

  return (
    <div className="">
      {/* <BookDescription book={book} /> */}
      <CommentCreator handleCommentPost={handleCommentPost} comment={comment} setComment={setComment}/>
      <CommentDisplay comments={comments} />
    </div>
  );
}

export default BookCommentPage;

import axios from 'axios';
import CommentCreator from '../../components/CommentCreator/CommentCreator.jsx'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function BookCommentPage() {
    // const [book, setBook] = useState({});
  const [comments, setComments] = useState([]);
  const { bookId } = useParams();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

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
    async function getComments(id) {
      try {
        if (id) {
          const response = await axios.get(
            `${baseURL}/books/${id}/comments?api_key=${API_KEY}`
          );

          setComments(response.data)
        }
      } catch (error) {
        console.error("Cant fetch comments", error);
      }
    }
    getComments(bookId);
  }, [bookId]);

function handleCommentPost (e, commentor, comment) {
    e.preventDefault();

    if(!commentor || !comment) {
      alert("Both name and comment are required.");
      return;
    }

    const newComment = {
      name: commentor,
      comment: comment,
    };

    postComment(bookId, newComment);
  }

  async function postComment(id, newComment) {
    try {
      const response = await axios.post(`${baseURL}/comments`, newComment);
      setComments((prevComments) => [...prevComments, response.data]);
    } catch (error) {
      console.error("errror posting comment:", error);
      alert("failed to post comment. Please try again later.")
    }
  } 

  return (
    <div className="book-container">
      {/* <BookDescription book={book} /> */}
      <CommentCreator handleCommentPost={handleCommentPost} />
      {/* <CommentDisplay comments={comments} /> */}
    </div>
  );
  
}

export default BookCommentPage
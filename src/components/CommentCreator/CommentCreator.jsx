import React, { useState } from 'react';
import axios from 'axios';

function CommentSection({ qrToken }) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('you must be logged in to comment');
      return;
    }

    try {
      const response = await axios.post('/comment', 
        { qrToken, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('comment successfully posted');
    } catch (err) {
      setError(err.response?.data || 'an error occurred');
    }
  };

  return (
    <div>
      <h2>Comment Section</h2>
      <textarea
        placeholder="Write your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Comment</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default CommentSection;

function CommentCreator({ handleSubmitComment, setComment, comment }) {

  return (
    <div>
      <h2>Comment Section</h2>
      <textarea
        placeholder="Write your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSubmitComment}>Submit Comment</button>
    </div>
  );
}

export default CommentCreator;

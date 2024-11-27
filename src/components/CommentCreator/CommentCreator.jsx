
function CommentCreator({ handleSubmitComment, setComment, comment }) {

  return (
    <div>
      <h2>Comment Section</h2>
      <textarea
        placeholder="Let the next reader know where you were and what you were thinking when you read this!"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSubmitComment}>Submit Comment</button>
    </div>
  );
}

export default CommentCreator;

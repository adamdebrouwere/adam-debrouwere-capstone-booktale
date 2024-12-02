import './CommentCreator.scss'

function CommentCreator({ handleSubmitComment, setComment, comment }) {
  return (
    <div className="comment-creator">
      <h2 className="comment-creator__title">Leave Your Tale Behind</h2>
      <textarea
        className="comment-creator__input"
        placeholder="Share here!"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="comment-creator__button"onClick={handleSubmitComment}>Submit Tale</button>
    </div>
  );
}

export default CommentCreator;

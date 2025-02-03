import './CommentCreator.scss'
import PropTypes from 'prop-types'

function CommentCreator({ handleSubmitComment, setComment, comment }) {
  return (
    <div className="comment-creator">
      <h2 className="comment-creator__title">Leave Your Tale Behind</h2>
      <p className="comment-creator__instructions">You must leave a message to save this Booktale in your library.</p>
      <textarea
      id="comment-input"
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

CommentCreator.propTypes = {
  handleSubmitComment: PropTypes.func.isRequired,
  setComment: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
};

// import "./CommentDisplay.scss";
import { DateTime } from "luxon";

function CommentDisplay({ comments }) {
  function timestampReformat(time) {
    const newTimestamp = DateTime.fromMillis(time);
    return newTimestamp.toRelative();
  }
  
  if (!comments) {
    return console.error("no video selected:", error);
  }

  return (
    <section className="comments">
      {comments.map((comment) => (
        <section className="comment" key={comment.id}>
          <div className="comment__left">
            <div className="comment__profile">
              <div className="comment__profile-img-placeholder"></div>
            </div>
          </div>
          <div className="comment__right">
            <div className="comment__right-top">
              <p className="comment__commentor">{comment.name}</p>
              <p className="comment__timestamp">
                {timestampReformat(comment.timestamp)}
              </p>
            </div>
            <div className="comment__right-bottom">
              <p className="comment__comment">{comment.comment}</p>
            </div>
          </div>
        </section>
      ))}
    </section>
  );
}

export default CommentDisplay;

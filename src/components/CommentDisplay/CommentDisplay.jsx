// import "./CommentDisplay.scss";
import { DateTime } from "luxon";

function CommentDisplay({ comments }) {
  console.log(comments)
  if (!comments) {
    return console.error("no comments found:");
  }

  if (comments === undefined) {
    comments = [];
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
              <p className="comment__commentor">{comment.user_id}</p>
              <p className="comment__timestamp">{comment.created_at}</p>
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

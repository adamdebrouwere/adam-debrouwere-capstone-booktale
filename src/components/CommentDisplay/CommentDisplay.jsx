import "./CommentDisplay.scss";

function CommentDisplay({ comments }) {
  if (!comments) {
    return console.error("no comments found:");
  }

  if (comments === undefined) {
    comments = [];
  }

  return (
    <section className="comments">
      {comments.map((comment) => {
        const date = new Date(comment.created_at);

        const formattedDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(date);

        return (
          <section className="comment" key={comment.id}>
            <div className="comment__left">
              <p className="comment__commentor">{comment.username}</p>
              <p className="comment__location">{`${comment.city}, ${comment.country}`}</p>
              <p className="comment__timestamp">{`${formattedDate}.`}</p>
              
            </div>

            <div className="comment__divider"></div>

            <div className="comment__right">
              <p className="comment__comment">{comment.comment}</p>
            </div>
          </section>
        );
      })}
    </section>
  );
}

export default CommentDisplay;

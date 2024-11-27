// import "./CommentDisplay.scss";


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
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(date);

        return (
          <section className="comment" key={comment.id}>
            <div className="comment__left">
              <div className="comment__profile">
                <div className="comment__profile-img-placeholder"></div>
              </div>
            </div>
            <div className="comment__right">
              <div className="comment__right-top">
                <p className="comment__commentor">{comment.username}</p>
                <p className="comment__location">{`${comment.city}, ${comment.state}, ${comment.country}`}</p>
                <p className="comment__timestamp">{formattedDate}</p>
              </div>
              <div className="comment__right-bottom">
                <p className="comment__comment">{comment.comment}</p>
              </div>
            </div>
          </section>
        );
      })}
    </section>
  );
}

export default CommentDisplay;

import "./PastTalesDisplay.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../AuthenticationContext/AuthenticationContext";

function PastTalesDisplay() {
  const { loading, setLoading, pastTales, getPastBooksData } =
    useAuthentication();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getPastBooksData();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="past-tales">
      <h1 className="past-tales__title">Past Tales</h1>

      {pastTales.map((tale) => {
        const date = new Date(tale.created_at);

        const formattedDate = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(date);

        return (
          <div
            className="past-tales__container"
            key={tale.id}
            onClick={() => navigate(`/booktale/${tale.qr_code_id}`)}
          >
            <img
              className="past-tales__image"
              src={tale.cover_url}
              alt={`Cover for ${tale.title}`}
            />
            <div className="past-tales__copy">
              <h4 className="past-tales__book-title">{tale.title}</h4>
              <p className="past-tales__author">{tale.author}</p>

              <p className="past-tales__comment">
                <span className="past-tales__comment-bold">My thoughts: </span>
                {tale.comment}
              </p>
              <p className="past-tales__date">
                <span className="past-tales__date-bold">On: </span>
                {formattedDate}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PastTalesDisplay;

import "./PastTalesDisplay.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../AuthenticationContext/AuthenticationContext";
import Carousel from "../Carousel/Carousel";

function PastTalesDisplay() {
  const { loading, setLoading, pastTales, getPastBooksData } =
    useAuthentication();
  const [isItemsVisible, setIsItemsVisible] = useState(false);
  const [howToVisible, setHowToVisible] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getPastBooksData();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (pastTales.length > 0) {
      setIsItemsVisible(true);
    }
  }, [pastTales]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHowToVisible(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);
  

  return (
    
    <div className="past-tales">
      {!loading && pastTales.length <= 0 && howToVisible && (
        <div className="past-tales__how-to">
          <p className="past-tales__how-to-copy">
        Add to your library by creating a Booktale or by scanning a Booktale QR code. 
      </p>
        <button
        className="past-tales__create-booktale-button"
        onClick={() => navigate('/create-booktale')}
      >
        Create Booktale
      </button>
        </div>
      
    )}
      <div className="past-tales__carousel">
        <Carousel>
          {pastTales.map((tale, index) => {
            const date = new Date(tale.created_at);

            const formattedDate = new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(date);

            return (
              <div
              className={`past-tales__card ${isItemsVisible ? "show" : ""}`}
              key={tale.id}
              style={{ animationDelay: `${index * 0.3}s` }}
              onClick={() => navigate(`/booktale/${tale.qr_code_id}`)}
            >
                <img
                  className="past-tales__image"
                  src={tale.cover_url}
                  alt={`Cover for ${tale.title}`}
                />
                <div className="past-tales__info">
                  <div className="past-tales__title-author-container">
                    <h4 className="past-tales__book-title">{tale.title}</h4>
                    <p className="past-tales__author">{tale.author}</p>
                  </div>
                  <div className="past-tales__copy">
                    <p className="past-tales__comment">
                      <span className="past-tales__comment-bold">
                        My thoughts:{" "}
                      </span>
                      {tale.comment}
                    </p>
                    <p className="past-tales__date">
                      <span className="past-tales__date-bold">On:{" "}</span>
                      {formattedDate}
                    </p>
                    <p className="past-tales__location">
                      <span className="past-tales__location-bold">In:{" "}</span>
                      {tale.city}, {tale.country}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>

      <div className="past-tales__list">
      {pastTales.map((tale, index) => {
            const date = new Date(tale.created_at);

            const formattedDate = new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(date);

            return (
              <div
              className={`past-tales__card ${isItemsVisible ? "show" : ""}`}
              key={tale.id}
              style={{ animationDelay: `${index * 0.4}s` }}
              onClick={() => navigate(`/booktale/${tale.qr_code_id}`)}
            >
                <img
                  className="past-tales__image"
                  src={tale.cover_url}
                  alt={`Cover for ${tale.title}`}
                />
                <div className="past-tales__info">
                  <div className="past-tales__title-author-container">
                    <h4 className="past-tales__book-title">{tale.title}</h4>
                    <p className="past-tales__author">{tale.author}</p>
                  </div>
                  <div className="past-tales__copy">
                    <p className="past-tales__comment">
                      <span className="past-tales__comment-bold">
                        My thoughts:{" "}
                      </span>
                      {tale.comment}
                    </p>
                    <p className="past-tales__date">
                      <span className="past-tales__date-bold">On: </span>
                      {formattedDate}
                    </p>
                    <p className="past-tales__location">
                      <span className="past-tales__location-bold">From: </span>
                      {tale.city}, {tale.country}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PastTalesDisplay;

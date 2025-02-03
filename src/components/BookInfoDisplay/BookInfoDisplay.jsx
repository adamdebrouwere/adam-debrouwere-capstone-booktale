import{ useAuthenticationContext } from "../../context/AuthenticationContext";
import "./BookInfoDisplay.scss";
import PropTypes from 'prop-types'

function BookInfoDisplay({ bookInfo }) {
  const { loading } = useAuthenticationContext();

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="book-info">
      {bookInfo && (
        <div className="book-info__container">
          {bookInfo.cover_url && (
            <img
              className="book-info__image"
              src={bookInfo.cover_url}
              alt={bookInfo.title}
            />
          )}
          <h2 className="book-info__title">{bookInfo.title}</h2>
          <p className="book-info__author">
            <span className="book-info__label">Author: </span>
            {bookInfo.author}
          </p>
          <p className="book-info__published">
            <span className="book-info__label">Published:{" "}</span>
            {bookInfo.publish_date}
          </p>
        </div>
      )}
    </div>
  );
}

BookInfoDisplay.propTypes = {
  bookInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publish_date: PropTypes.string.isRequired,
    cover_url: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookInfoDisplay;

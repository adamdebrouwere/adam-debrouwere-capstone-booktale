import React from "react";
import { useAuthentication } from "../AuthenticationContext/AuthenticationContext";
import "./BookInfoDisplay.scss";

function BookInfoDisplay({ bookInfo }) {
  const { loading } = useAuthentication();

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
            <label className="book-info__label">Author: </label>
            {bookInfo.author}
          </p>
          <p className="book-info__published">
            <label className="book-info__label">Published:{" "}</label>
            {bookInfo.publish_date}
          </p>
        </div>
      )}
    </div>
  );
}

export default BookInfoDisplay;

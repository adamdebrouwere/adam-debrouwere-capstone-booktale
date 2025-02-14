import "./BookSearch.scss";
import PropTypes from "prop-types"

function BookSearch({ searchQuery, setSearchQuery, fetchBookInfo }) {
  return (
    <div className="book-search">
      <form className="book-search__form" onSubmit={fetchBookInfo}>
        <h1 className="book-search__form-title">Book Search</h1>
        <input
        className="book-search__form-input"
          type="text"
          placeholder="Enter book title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="book-search__form-button" type="submit">Search</button>
      </form>
    </div>
  );
}

export default BookSearch;

BookSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  fetchBookInfo: PropTypes.func.isRequired,
};

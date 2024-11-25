import React from "react";

function BookSearch({ searchQuery, setSearchQuery, fetchBookInfo }) {
  return (
    <div>
      <h1>Book Search</h1>
      <input
        type="text"
        placeholder="Enter book title."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={fetchBookInfo}>Search</button>
    </div>
  );
}

export default BookSearch;

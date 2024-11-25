import React, { useState } from 'react';
import axios from 'axios';
import BookInfoDisplay from '../../components/BookInfoDisplay/BookInfoDisplay.jsx'
import BookSearch from '../../components/BookSearch/BookSearch.jsx';


const CreateBookTalePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookInfo, setBookInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBookInfo = async () => {
    if (!searchQuery) {
      return;
    }

    setLoading(true);
    setError('');
    setBookInfo(null);

    try {
      const response = await axios.get(`https://openlibrary.org/search.json`, {
        params: {
          title: searchQuery,
          limit: 1
        },
      });


      const bookData = response.data.docs[0];

      if (bookData) {
        const bookDetails = {
          title: bookData.title,
          author: bookData.author_name ? bookData.author_name : 'N/A',
          first_sentence: bookData.first_sentence,
          publish_date: bookData.first_publish_year,
          cover_url: bookData.cover_i
            ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`
            : null,
        };

        setBookInfo(bookDetails);
      } else {
        setError('No books found.');
      }
    } catch (err) {
      setError('Error fetching book data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <BookSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} fetchBookInfo={fetchBookInfo}/>
      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      <BookInfoDisplay bookInfo={bookInfo}/>
    </div>
  );
};

export default CreateBookTalePage;
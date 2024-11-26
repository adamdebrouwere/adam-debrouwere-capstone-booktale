import React, { useState } from "react";
import axios from "axios";
import BookInfoDisplay from "../../components/BookInfoDisplay/BookInfoDisplay.jsx";
import BookSearch from "../../components/BookSearch/BookSearch.jsx";
import CreateQrCode from "../../components/CreateQrCode/CreateQrCode.jsx";

const CreateBookTalePage = ({ BASE_URL }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookInfo, setBookInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrCodeId, setQrCodeId] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const fetchBookInfo = async () => {
    if (!searchQuery) {
      alert("Search Query Empty");
      return;
    }

    setLoading(true);
    setError("");
    setBookInfo(null);

    try {
      const response = await axios.get(`https://openlibrary.org/search.json`, {
        params: {
          title: searchQuery,
          limit: 1,
        },
      });

      const bookData = response.data.docs[0];

      if (bookData) {
        const bookDetails = {
          title: bookData.title,
          author: bookData.author_name ? bookData.author_name : "N/A",
          first_sentence: bookData.first_sentence,
          publish_date: bookData.first_publish_year,
          cover_url: bookData.cover_i
            ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`
            : null,
        };

        setBookInfo(bookDetails);
      } else {
        setError("No books found.");
      }
    } catch (error) {
      setError("Error fetching book data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBooktale = async () => {
    if (!bookInfo || !qrCodeId || !qrCodeUrl) {
      alert("No book info or Qrcode.");
      return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to create a Booktale");
    }

    try {
      const { title, author, cover_url } = bookInfo;
      const response = await axios.post(
        `${BASE_URL}/booktale`,
        {
          title,
          author,
          coverUrl: cover_url,
          qrCodeId,
          qrCodeUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log(response.data, "trigger");
      alert("Booktale successfully created.");
      navigate(`/${qrCodeId}`);
    } catch (error) {
      setError("Error posting book and qr code data.");
      console.error("error posting book and qr code data", error);
    }
  };

  return (
    <div>
      <BookSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fetchBookInfo={fetchBookInfo}
      />
      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      <BookInfoDisplay bookInfo={bookInfo} />
      <CreateQrCode
        qrCodeUrl={qrCodeUrl}
        setQrCodeId={setQrCodeId}
        qrCodeId={qrCodeId}
        setQrCodeUrl={setQrCodeUrl}
      />
      <button onClick={handleCreateBooktale}>Create Booktale</button>
    </div>
  );
};

export default CreateBookTalePage;

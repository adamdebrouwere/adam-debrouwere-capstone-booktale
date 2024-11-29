import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookInfoDisplay from "../../components/BookInfoDisplay/BookInfoDisplay.jsx";
import BookSearch from "../../components/BookSearch/BookSearch.jsx";
import CreateQrCode from "../../components/CreateQrCode/CreateQrCode.jsx";
import Cookies from "js-cookie"
import { useAuthentication } from "../../components/AuthenticationContext/AuthenticationContext.jsx";


const CreateBookTalePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookInfo, setBookInfo] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const [qrCodeId, setQrCodeId] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const { BASE_URL, error, loading } = useAuthentication()

  const navigate = useNavigate()
  
  const fetchBookInfo = async () => {
    if (!searchQuery) {
      alert("Search Query Empty");
      return;
    }

    // loading(true);
    // error("");
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
          author: bookData.author_name ? bookData.author_name[0] : "N/A",
          first_sentence: bookData.first_sentence,
          publish_date: bookData.first_publish_year,
          cover_url: bookData.cover_i
            ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`
            : null,
        };

        setBookInfo(bookDetails);
      } else {
        // error("No books found.");
      }
    } catch (error) {
      error("Error fetching book data.");
      console.error(error);
    } finally {
      // loading(false);
    }
  };

  const handleCreateBooktale = async () => {
    if (!bookInfo || !qrCodeId || !qrCodeUrl) {
      alert("No book info or Qrcode.");
      return;
    }

    const token = Cookies.get("token");

    if (!token) {
      alert("You must be logged in to create a Booktale");
    }

    try {
      const { title, author, publish_date, cover_url } = bookInfo;
      const response = await axios.post(
        `${BASE_URL}/booktale`,
        {
          title,
          author,
          publishDate: publish_date,
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

      alert("Booktale successfully created.");
      navigate(`/booktale/${qrCodeId}`)
    } catch (error) {
      setError("error posting book and qr code data.");
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
      {/* {loading && <p>Loading...</p>} */}

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

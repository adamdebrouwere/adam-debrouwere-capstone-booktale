import "./CreateBookTalePage.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookInfoDisplay from "../../components/BookInfoDisplay/BookInfoDisplay.jsx";
import BookSearch from "../../components/BookSearch/BookSearch.jsx";
import CreateQrCode from "../../components/CreateQrCode/CreateQrCode.jsx";
import { useAuthentication } from "../../components/AuthenticationContext/AuthenticationContext.jsx";
import { v4 as uuidv4 } from "uuid";

const CreateBookTalePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookInfo, setBookInfo] = useState(null);
  const [qrCodeId, setQrCodeId] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [showQr, setShowQr] = useState(false);
  const { BASE_URL, error, loading, setError, setLoading, token } =
    useAuthentication();

  const navigate = useNavigate();

  const fetchBookInfo = async (e) => {
    e.preventDefault();

    setShowQr(false);
    if (!searchQuery) {
      alert("Search query empty.");
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
          author: bookData.author_name ? bookData.author_name[0] : "N/A",
          first_sentence: bookData.first_sentence,
          publish_date: bookData.first_publish_year,
          cover_url: bookData.cover_i
            ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`
            : null,
        };
        handleQrCodeId();
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
      alert("No book info.");
      return;
    }

    if (!token) {
      alert("You must be logged in to create a Booktale");
    }

    try {
      const { title, author, publish_date, cover_url } = bookInfo;

      await axios.post(
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
      setShowQr(true);
    } catch (error) {
      setError("error posting book and qr code data.");
      console.error("error posting book and qr code data", error);
    }
  };

  const handleQrCodeId = () => {
    const uniqueId = uuidv4();
    setQrCodeId(uniqueId);
  };

  return (
    <div className="create-booktale">
      {!showQr && <BookSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fetchBookInfo={fetchBookInfo}
      />}
      {error && <p>{error}</p>}

      {!showQr && <BookInfoDisplay bookInfo={bookInfo} />}
      {
        <CreateQrCode
          qrCodeUrl={qrCodeUrl}
          qrCodeId={qrCodeId}
          setQrCodeUrl={setQrCodeUrl}
          showQr={showQr}
        />
      }
      {!showQr && (
        <button onClick={handleCreateBooktale}>Create Booktale</button>
      )}
    </div>
  );
};

export default CreateBookTalePage;

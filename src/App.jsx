import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home.jsx";

import NotFound from "./pages/NotFound/NotFound.jsx";
import BookCommentPage from "./pages/BookCommentsPage/BookCommentsPage.jsx";
import LogInPage from "./pages/LogInPage/LogInPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import BookCommentsPage from "./pages/BookCommentsPage/BookCommentsPage.jsx";
import CreateBookTalePage from "./pages/CreateBookTalePage/CreateBookTalePage.jsx";

function App() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home BASE_URL={BASE_URL} />} />
        <Route
          path="/comments"
          element={<BookCommentPage BASE_URL={BASE_URL} />}
        />
        <Route path="/login" element={<LogInPage BASE_URL={BASE_URL} />} />
        <Route path="/signup" element={<SignUpPage BASE_URL={BASE_URL} />} />
        <Route path="/comments" element={<BookCommentsPage BASE_URL={BASE_URL}/>} />
        <Route path="/createBookTale" element={<CreateBookTalePage/>} />
        <Route path="*" element={<NotFound />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;

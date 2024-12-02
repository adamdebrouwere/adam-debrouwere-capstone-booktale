import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { AuthenticationProvider } from "./components/AuthenticationContext/AuthenticationContext.jsx";
import Header from './components/Header/Header.jsx'
import Home from "./pages/Home/Home.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import BookCommentPage from "./pages/BookCommentsPage/BookCommentsPage.jsx";
import LogInPage from "./pages/LogInPage/LogInPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import CreateBookTalePage from "./pages/CreateBookTalePage/CreateBookTalePage.jsx";

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-booktale" element={<CreateBookTalePage />} />
          <Route path="/booktale/:qrCodeId" element={<BookCommentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;

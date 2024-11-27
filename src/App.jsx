import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { AuthenticationProvider } from "./components/AuthenticationContext/AuthenticationContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Home from "./pages/Home/Home.jsx";

import NotFound from "./pages/NotFound/NotFound.jsx";
import BookCommentPage from "./pages/BookCommentsPage/BookCommentsPage.jsx";
import LogInPage from "./pages/LogInPage/LogInPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import CreateBookTalePage from "./pages/CreateBookTalePage/CreateBookTalePage.jsx";

function App() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home BASE_URL={BASE_URL} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LogInPage BASE_URL={BASE_URL} />} />
          <Route path="/signup" element={<SignUpPage BASE_URL={BASE_URL} />} />
          <Route
            path="/create-booktale"
            element={
              <ProtectedRoute>
                <CreateBookTalePage BASE_URL={BASE_URL} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booktale/:qrCodeId"
            element={
                <BookCommentPage BASE_URL={BASE_URL}/>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;

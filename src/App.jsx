import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home.jsx'

import NotFound from './pages/NotFound/NotFound.jsx'
import BookCommentPage from './pages/BookCommentsPage/BookCommentsPage.jsx';
import LogInPage from './pages/LogInPage/LogInPage.jsx'
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx'



function App() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home BASE_URL={BASE_URL}/>} />
        <Route path="/comments" element={<BookCommentPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

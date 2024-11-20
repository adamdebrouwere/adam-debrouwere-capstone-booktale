import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'



function App() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home BASE_URL={BASE_URL}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

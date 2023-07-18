import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Search from './Routes/Search';
import Header from './Components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="React-4/tv" element={<Tv />} />
        <Route path="React-4/search" element={<Search />} />
        <Route path="React-4/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

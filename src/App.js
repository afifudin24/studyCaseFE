import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Sheet, Typography, Button } from '@mui/joy';
import '@fontsource/inter';
import TopBar from './components/TopBar/TopBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
const App = () => {
  return (
    <div>
      <TopBar />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />{' '}
          {/* Ganti component dengan element */}
          <Route path="/profile" element={<Profile />} />{' '}
          {/* Ganti component dengan element */}
        </Routes>
      </div>
      {/* </Router>  */}
    </div>
  );
};

export default App;

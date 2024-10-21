import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Sheet, Typography, Button } from '@mui/joy';
import '@fontsource/inter';
import TopBar from './components/TopBar/TopBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Cart from './pages/Cart';
const App = () => {
  return (
    <div>
      <TopBar />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />{' '}
          <Route path="/profile" element={<Profile />} />{' '}
          <Route path="/login" element={<Login />} />{' '}
          <Route path="/cart" element={<Cart />} />{' '}
        </Routes>
      </div>
      {/* </Router>  */}
    </div>
  );
};

export default App;

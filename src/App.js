import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Sheet, Typography, Button } from '@mui/joy';
import '@fontsource/inter';
import TopBar from './components/TopBar/TopBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
const App = () => {
  const [totalCartItems, setTotalCartItems] = useState(2);
  return (
    <div>
      <TopBar
        totalCartItems={totalCartItems}
        setTotalCartItems={setTotalCartItems}
      />

      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                totalCartItems={totalCartItems}
                setTotalCartItems={setTotalCartItems}
              />
            }
          />{' '}
          <Route path="/profile" element={<Profile />} />{' '}
          <Route path="/login" element={<Login />} />{' '}
          <Route path="/cart" element={<Cart />} />{' '}
          <Route path="/checkout" element={<Checkout />} />{' '}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      {/* </Router>  */}
    </div>
  );
};

export default App;

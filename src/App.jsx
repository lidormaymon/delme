import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import Homepage from './pages/Homepage';
import axios from 'axios';
import Navbar from './componets/nav-bar/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login'
import OrdersHistory from './pages/OrdersHistory';
import Admin from './pages/admin/Admin';
import Profile from './pages/profile/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState(String);
  const apiURL = 'http://127.0.0.1:8000/';
  const storedToken = localStorage.getItem('token');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };



  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); 
  };



  useEffect(() => {
    // Check if the user is logged in by checking the stored token or any other logic
    if (storedToken) {
      setIsLoggedIn(true);
    }
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Send a request to your backend API to retrieve user information
          const response = await fetch(apiURL + 'user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            console.log( 'userdata:', userData);
            setUser(userData);
            
            if (userData.is_staff === true ) {
              console.log('is admin');
              setIsAdmin(true)

            }else {
              console.log('not admin');
            }
          }else {
            localStorage.removeItem('token')
          }
        } catch (error) {
          console.error('Failed to fetch user information:', error);

        }
      }else{
        setIsLoggedIn(false)
        setIsAdmin(false)
      }
    };
  

    fetchUser();
  }, [isAdmin, isLoggedIn]);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/signup" element={<Signup  />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/orders-history" element={<OrdersHistory />} />
        <Route path='/admin' element={<Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}/>
        <Route path='/profile' element={<Profile />}
        // Profile Links Paths


        ></Route>
      </Routes>
    </div>
  );
}

export default App;

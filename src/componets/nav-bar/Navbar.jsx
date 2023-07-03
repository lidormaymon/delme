import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout, user, isAdmin }) => {
  

  const handleLogout = () => {
    // Perform any necessary logout logic
    localStorage.removeItem('token');
    onLogout(false);
  };


  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Order</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="orders-history">History</Link>
            </li>
          )}
          <div className="nav-right-side">
            {isAdmin && (
              <>
                <li>
                  <Link to='/admin'>Admin</Link>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
              <li>
                <Link to='/profile'>{user.username}</Link>
              </li>
              <li>
                <Link to='/' onClick={()=> handleLogout()}>Log Out</Link>
              </li>
              </>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

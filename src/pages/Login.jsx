import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import * as icons from 'react-icons/ai';

const Login = ({ onLogin }) => {
  const apiURL = 'http://127.0.0.1:8000/';
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    
    if (loginData.username && loginData.password) {
      const data_login = {
        username: loginData.username,
        password: loginData.password,
      };

      axios
        .post(apiURL + 'login/', data_login)
        .then((response) => {
          localStorage.setItem('token', response.data.access);
          onLogin(true); // Invoke the callback to update the isLoggedIn state in Navbar
          navigate('/');
          window.location.reload()
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const [inputType, setInputType] = useState('password');

  const showPwd = () => {
    setInputType((prevInputType) => (prevInputType === 'password' ? 'text' : 'password'));
  };

  return (
    <div>
      <div className="container">
        <div className="content">
          <div>Login</div>
          <div>
            <p>Username</p>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
            />
            <p>Password</p>
            <div className="password-container">
              <input type={inputType} name="password" value={loginData.password} onChange={handleLoginChange} />
              {inputType === 'password' ? (
                <icons.AiFillEye className="show-pwd" onClick={showPwd} />
              ) : (
                <icons.AiFillEyeInvisible className="show-pwd" onClick={showPwd} />
              )}
            </div>
            <br />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

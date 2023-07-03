import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import * as icons from 'react-icons/ai';

const Signup = () => {
  const apiURL = 'http://127.0.0.1:8000/';
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignupData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (signupData) {
      const data = {
        username: signupData.username,
        password: signupData.password,
        email: signupData.email,
      };
      axios.post(apiURL + 'register/', data).then((response) => {
        navigate('/');
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
          <div>Sign Up</div>
          <div>
            <p>Username</p>
            <input type="text" name="username" value={signupData.username} onChange={handleSignUpChange} />
            <p>Password</p>
            <div className="password-container">
              <input type={inputType} name="password" value={signupData.password} onChange={handleSignUpChange} />
              {inputType === 'password' ? (
                <icons.AiFillEye className="show-pwd" onClick={showPwd} />
              ) : (
                <icons.AiFillEyeInvisible className="show-pwd" onClick={showPwd} />
              )}
            </div>
            <p>Email</p>
            <input name="email" value={signupData.email} onChange={handleSignUpChange} />
            <br />
            <button onClick={handleRegister}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

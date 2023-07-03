import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrdersHistory = () => {
  const apiURL = 'http://127.0.0.1:8000/';
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        const newToken = event.newValue;
        setToken(newToken);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      const headers = {
        Authorization: `Bearer ${token}`
      };

      axios.get(apiURL + 'cart', { headers })
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            navigate('/login');
          } else {
            console.error(error);
          }
        });
    }
  }, [apiURL, token, navigate]);

  return (
    <div>
      <h1>My Orders:</h1>
      {data.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Description</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.desc}</td>
                <td>{order.price}</td>
                <td>{order.amount}</td>
                <td>{order.createdTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersHistory;

import React, { useEffect, useState } from 'react'
import Cards from '../componets/cards/Cards.jsx'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]); // Add the cart state here
  const apiURL = 'http://127.0.0.1:8000/'
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(apiURL + 'prods')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(value);
  };

  const addToCart = (desc, price) => {
    const updatedCart = [...cart]; // Create a copy of the cart
    updatedCart.push({ amount: 1, desc, price });
    console.log(updatedCart);
    setCart(updatedCart); // Update the cart state
    localStorage.setItem('cart', JSON.stringify(updatedCart));

  }
  
  const checkOut = () => { // Remove the data parameter from checkOut
    const token = localStorage.getItem('token');
    const localCart = JSON.parse(localStorage.getItem('cart'));

    console.log(localCart);
    if (token) {
      axios.post(apiURL + 'cart', localCart, { // Use cart instead of data
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log('works');
        localStorage.removeItem('cart')

      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      navigate('/login')
    }
  };

  return (
    <div>
      <div className="container-c">
        {/* Display the retrieved data */}
        <h1>Order now!</h1>
        <button className='check-out' onClick={checkOut}>Check Out</button><br /><br />
        <div className='displayCards'>
          {data.map(item => (
            <div key={item.id}>
              <Cards
                title={item.desc}
                description="Product description. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                image={item.image}
                price={formatCurrency(item.price, 'ILS')}
                currency='ILS'
                cartButton={() => addToCart(item.desc, item.price)}
              />
            </div>
          ))}
        </div><br></br>
      </div>
    </div>
  )
}

export default Products

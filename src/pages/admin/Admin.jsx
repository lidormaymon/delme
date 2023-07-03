import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = ({isAdmin, setIsAdmin}) => {
  const navigate = useNavigate();



  useEffect(() => {
    console.log(isAdmin);
    if (isAdmin === true) {
      console.log('is admin');
    }else{
      setIsAdmin(false)
      navigate('/')
    }
  }, [ isAdmin,navigate])
  

  return (
    <div>
        <h1>Admin Panel</h1>
    </div>
  )
}

export default Admin
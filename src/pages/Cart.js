import React, { use, useEffect, useState } from 'react'
 

export function Cart(){
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const token = localStorage.getItem('token') 

  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Product`, {
      method: "GET",
      headers:token ? { Authorization: `Bearer ${token}` } : {},
     
    }).then(res => res.json())
      .then(result => setProducts(result))
      .catch(err => setError(err.message));
}, [])



  return { products,error };
} 

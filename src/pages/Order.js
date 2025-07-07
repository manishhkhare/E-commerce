import { ArrowDropDown, Delete } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { motion } from "motion/react";
import { useMediaQuery } from 'react-responsive';
import { CircularProgress } from '@mui/material';

export default function Order() {
  const [ordersList, setOrdersList] = useState([]);
  const [openId, setOpenId] = useState(null);
  const token = localStorage.getItem('token');
  const isSmallScreen = useMediaQuery({ query: '(max-width: 850px)' });

  const rowVariant = {
    open: { height: isSmallScreen ? "600px" : "300px" },
    close: { height: isSmallScreen ? "250px" : "150px" }
  };
   let idx = 0; // index value of product
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v2/order`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(result => {
        setOrdersList(result.orders);
      })
      .catch(err => console.log(err));
  }, []);
   
  const deletehandler = (product) => {
    console.log("data", product._id)
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v2/order/delete${product._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      }
    }).then(res => res.json())
      .then(result => console.log(result))
      .catch(err=>console.log(err))
  }


  return (
    <>
    { ordersList.length > 0 ? (<div className='orderContainer'>
        <div className='ordersWrapper'>
          {ordersList.map((items) => {
            idx = idx++;
           
            const isOpen = openId === items._id;
            return (
              <motion.div
                key={items._id}
                className='ordersRow'
                initial="close"
                animate={isOpen ? "open" : "close"}
                variants={rowVariant}
                transition={{ duration: 0.3 }}
              >
                <div className='topDetails'>
                  {console.log(idx)}
                  <div
           
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12
                    }}
                  >
                    <img
                      src={items.orderItems[idx].product.image}
                      alt="3"
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: 4
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: "bold" }}>{items.orderItems[idx].product.name}</div>
                      <div>Qty: {items.orderItems[idx].quantity}</div>
                    </div>
                  </div>
             
                  <div className='d-flex gap-2'>
                    <button
                      className='btn btn-primary btn-sm rounded-0'
                      onClick={() => setOpenId(isOpen ? null : items._id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      {isOpen ? 'Hide details' : 'View details'} <ArrowDropDown />
                    </button>
                    <button
                      className='btn btn-danger btn-sm rounded-0'
                      onClick={() => deletehandler(items.orderItems[idx].product)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      Remove
                      <Delete />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <motion.div className='orderDetails'>
                    <div>
                      <strong>Contact:</strong><br />
                      <span>{items.phone}</span><br />
                      <strong>Order Id:</strong><br />
                      <span>{items._id}</span>
                    </div>
                    <div>
                      <strong>Date:</strong><br />
                      <span>{new Date(items.createdAt).toLocaleString()}</span>
                    </div>
                    <div>
                      <strong>Price:</strong><br />
                      <span>₹{items.totalPrice}/-</span><br />
                    </div>
                    <div>
                      <strong>Address:</strong><br />
                      {items.shippingAddress1},<br />
                      {items.shippingAddress2},<br />
                      {items.city},<br />
                      {items.country}-{items.zip}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })
         }
        </div>
      </div>) :
       <div
        className="w-100 d-flex loader  justify-content-center align-items-center"
        style={{
           position: "relative",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1 
        }}
      >
        <CircularProgress color="inherit" size="3rem" />
      </div> }
    </>
  );
}

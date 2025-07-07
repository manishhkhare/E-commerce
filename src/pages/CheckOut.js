import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'motion/react';
import { Alert, CircularProgress } from '@mui/material';
import { toast } from "react-toastify";

export const CheckOut = ({ addItems }) => {
  const [quantities, setQuantities] = useState(1);
  const [listItems, setListItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [singleOrderItem, setSingleOrderItem] = useState(null);
  const [formData, setFormData] = useState({
    shippingAddress1: "",
    shippingAddress2: "",
    city: "",
    zip: "",
    country: "",
    phone: ""
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v6/cart/get`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(result => {
        setListItems(result.items);
        const qtyObj = {};
        result.items.forEach(item => {
          qtyObj[item._id] = item.quantity;
        });
        setQuantities(qtyObj);
      })
      .catch(err => console.log(err));
  }, []);

  const totalPrice = listItems.reduce((sum, item) => {
    const quantity = quantities[item._id] || 1;
    return sum + item.product.price * quantity;
  }, 0);

  const increment = (itemId) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: prev[itemId] + 1
    }));
  };

  const decrement = (itemId) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 1
    }));
  };

  const handlePayment = async () => {
  if (paymentMethod === "Online Payment") {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v2/order/payment/order`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: totalPrice })
    });

    const { order } = await response.json();

    const options = {
      key: "rzp_test_IWc5S3RoO1MUeC",
      amount: order.amount,
      currency: order.currency,
      name: "ShoppingCart",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response) => {
        const verifyRes = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v2/order/payment/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response)
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          toast.success("Payment Successful!");
          if (modalMode === 'single') {
            orderSingleItem(singleOrderItem);
          } else {
            orderNow();
          }
        } else {
          toast.error("Payment verification failed!");
        }
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: formData.phone
      },
      theme: { color: "#3399cc" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } else {
    if (modalMode === 'single') {
      orderSingleItem(singleOrderItem);
    } else {
      orderNow();
    }
  }
};


  const orderSingleItem = async (item) => {
  if (formData.shippingAddress1 === "") {
    setIsOpen(true);
    return;
  }

  const payload = {
    items: [{
      product: item.product._id,
      quantity: quantities[item._id] || 1,
      size: item.product.size || ""
    }],
    shippingAddress1: formData.shippingAddress1,
    shippingAddress2: formData.shippingAddress2,
    city: formData.city,
    zip: formData.zip,
    country: formData.country,
    phone: formData.phone
  };

  try {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v2/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Order placed successfully!");
    } else {
      toast.error("Error: " + data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
  }
};


  const orderNow = () => {
  if (formData.shippingAddress1 === "") {
    setIsOpen(true);
    return;
  }

  const orderItems = {
    items: listItems.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    })),
    shippingAddress1: formData.shippingAddress1,
    shippingAddress2: formData.shippingAddress2,
    city: formData.city,
    zip: formData.zip,
    country: formData.country,
    phone: formData.phone,
    paymentMethod
  };

  fetch(`${process.env.REACT_APP_BASE_URL}/api/v2/order/create`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(orderItems)
  })
    .then(res => {
      if (res.ok) {
        toast.success("Order placed successfully!");
      }
      return res.json();
    })
    .then(result => console.log(result))
    .catch(err => {
      console.error(err);
      toast.error("Something went wrong.");
    });
};


  return (
    <>
      <div className='myCart'>
        <div className='myCartWraper'>
          {listItems.length === 0 &&
            <div className='w-100 h-100 d-flex pt-5 fs-1 justify-content-center align-items-center'>
              <div
                     className="w-100 d-flex loader  justify-content-center align-items-center"
                     style={{
                        position: "fixed",
                         top: 50,
                         left: 0,
                         width: "100vw",
                         height: "100vh",
                         zIndex: 1 
                     }}
                   >
                     <CircularProgress color="inherit" size="3rem" />
                   </div>
            </div>
          }

          {listItems.map((item, i) => (
            <div className='Cart mt-2' key={i}>
              <div className='boxes d-flex'>
                <div className='img'>
                  <img src={item.product.image} alt='' style={{ height: '200px' }} />
                </div>
                <div className='cartDetail'>
                  <p><strong>Name:</strong> {item.product.name}</p>
                  <p><strong>Price:</strong> ₹{item.product.price}</p>
                  <p><strong>Size:</strong> {item.product.size}</p>
                  <div className='btn_group d-flex gap-2 align-items-center'>
                    <button type='button' className='btn btn-success rounded-0' onClick={() => increment(item._id)}>+</button>
                    <input
                      value={quantities[item._id]}
                      type='text'
                      className=' form-control text-center'
                      readOnly
                      style={{ width: "60px" }}
                    />
                    <button type='button' className='btn btn-danger rounded-0' onClick={() => decrement(item._id)}>-</button>
                  </div>
                </div>
              </div>
              <button type='submit' className='btn btn-danger text-white rounded-5 w-100 mt-2' onClick={() => {
                setModalMode("single");
                setSingleOrderItem(item);
                setIsOpen(true);
              }}>Order</button>
            </div>
          ))}
        </div>
      </div>

      <div className='createOrderSection'>
        <div className='buttons d-flex align-items-center gap-2 justify-content-center p-2'>
          <button className='btn form-control btn-primary rounded-5'
            onClick={() => {
              setModalMode("bulk");
              setIsOpen(true);
            }}>Orders</button>
        </div>
      </div>

      {isOpen &&
        <>
          <div className="backdrop" onClick={() => setIsOpen(false)}></div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className='addressOverlay'>
            <div className='closeButton'>
              <button className='btn float-end' onClick={() => { setIsOpen(false) }}><CloseIcon /></button>
            </div>

            <div className="addressSection p-3 mt-4">
              <h4>Shipping Address</h4>
              {["shippingAddress1", "shippingAddress2", "city", "zip", "country", "phone"].map(
                (field) => (
                  <div className="mb-2" key={field}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={field.replace("shippingAddress", "Address Line ")}
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, [field]: e.target.value }))
                      }
                    />
                  </div>
                )
              )}
            </div>

            <div className='paymentAndOrder'>
              <div className="paymentSection pt-1">
                <h4>Payment Method</h4>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="cod">Cash on Delivery</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="online"
                    value="Online Payment"
                    checked={paymentMethod === "Online Payment"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="online">Online Payment</label>
                </div>
              </div>

              <div className="orderSummary">
                <h4>Order Summary</h4>
                <p><strong>Total Price:</strong> ₹{totalPrice}</p>
                <p><strong>Payment Method:</strong> {paymentMethod}</p>
              </div>

              <button className="btn btn-primary w-100 mt-2"
                onClick={() => {
                  handlePayment();
                  setIsOpen(false);
                  setSingleOrderItem(null);
                  setModalMode(null);
                }}>
                Create Order
              </button>
            </div>
          </motion.div>
        </>
      }
    </>
  );
};

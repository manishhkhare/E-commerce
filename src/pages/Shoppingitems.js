import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Cart } from "./Cart";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

export default function Shoppingitems({ addItems, setAddItems, searchData }) {
  const [current, setCurrent] = useState(null);
  const [buyNow, setBuyNow] = useState(false);
  const [quantities, setQuantities] = useState(1);
  const [orderData, setOrderData] = useState();
  const detailRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [formData, setFormData] = useState({
    shippingAddress1: "",
    shippingAddress2: "",
    city: "",
    zip: "",
    country: "",
    phone: ""
  });

  const { products } = Cart();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const totalPrice = orderData?.price;
  const filteredProducts =
    searchData && searchData.trim() !== ""
      ? products.filter((item) =>
          item.name?.toLowerCase().includes(searchData.toLowerCase())
        )
      : products;

  useEffect(() => {
    if (!current) return;

    function handleClickOutside(event) {
      if (detailRef.current && !detailRef.current.contains(event.target)) {
        setCurrent(null);
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener("pointerdown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [current]);

  useEffect(() => {
    if (buyNow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [buyNow]);

  const orderSingleItem = async () => {
    if (formData.shippingAddress1 === "") {
      setBuyNow(true);
      return;
    }
    console.log(orderData)
    const payload = {
     items: [{
      product: orderData._id,
      quantity: 1, 
      size: orderData.size ? orderData.size[0] : ""
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
        alert("Order placed successfully!");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  const handleCartItems = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v6/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          product: current._id,
          quantity: 1,
          size: current.size ? current.size[0] : ""
        })
      });

      if (!res.ok) {
        throw new Error("Failed to save cart");
      }

      const data = await res.json();
      
       toast.info("Item added to cart!!")
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.warning("Something went wrong adding to cart.")
    }
  };

  const handleBuyNow = () => {
    setBuyNow(!buyNow);
    if (!buyNow) {
      setCurrent(null);
    }
  };

  return (
    <>
      {buyNow && (
        <>
          <div className="backdrop" onClick={() => setBuyNow(false)}></div>
          <div className="addressOverlay">
            <div className="closeButton">
              <button
                className="btn float-end"
                onClick={() => setBuyNow(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="addressSection p-3 mt-4">
              <h4>Shipping Address</h4>
              {[
                "shippingAddress1",
                "shippingAddress2",
                "city",
                "zip",
                "country",
                "phone"
              ].map((field) => (
                <div className="mb-2" key={field}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={field.replace(
                      "shippingAddress",
                      "Address Line "
                    )}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field]: e.target.value
                      }))
                    }
                  />
                </div>
              ))}
            </div>

            <div className="paymentAndOrder">
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
                  <label className="form-check-label" htmlFor="cod">
                    Cash on Delivery
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="online"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="online">
                    Online Payment
                  </label>
                </div>
              </div>

              <div className="orderSummary">
                <h4>Order Summary</h4>
                <p>
                  <strong>Total Price:</strong> ₹ {totalPrice}
                </p>
                <p>
                  <strong>Payment Method:</strong> {paymentMethod}
                </p>
              </div>

              <button
                className="btn btn-primary w-100 mt-2"
                onClick={() => orderSingleItem()}
              >
                Create Order
              </button>
            </div>
          </div>
        </>
      )}

      <AnimatePresence>
        {current && (
          <motion.div
            layoutId={`item-${current._id}`}
            className="itemLayoutOverlay"
          >
            <div className="itemLayout text-dark p-2" ref={detailRef}>
              <div className="closeBtn float-end">
                <motion.button
                  type="button"
                  className="btn border-0 p-0"
                  onClick={() => setCurrent(null)}
                >
                  <CloseIcon />
                </motion.button>
              </div>
              <motion.div className="w-100">
                <motion.img
                  style={{ height: "200px", width: "230px" }}
                  layoutId={current.image}
                  key={current.image}
                  src={current.image}
                  className="img-fluid"
                  alt="img"
                />
              </motion.div>
              <motion.div
                layoutId={current.brand}
                className="text-secondary fw-bold"
              >
                {current.brand}
              </motion.div>
              <div>{current.name}</div>
              <div>
                <span className="text fw-bold">&#8377; {current.price}</span>
              </div>
              <div className="pt-4 btn_group">
                <select
                  className="form-control w-25"
                  value={current.size ? current.size[0] : ""}
                  onChange={(e) =>
                    setCurrent({ ...current, size: [e.target.value] })
                  }
                >
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
                <button
                  type="button"
                  className="btn btn-warning rounded-0 me-3"
                  onClick={handleCartItems}
                >
                  Add Cart
                </button>
                <button
                  type="button"
                  className="btn btn-danger rounded-0"
                  onClick={
                    () => {
                      navigate('/MyCart')
                    }
                    // handleBuyNow
                    }
                >
                  Buy Now
                </button>
              </div>
              <div className="description">
                <span className="text-secondary">{current.description}</span>
                <br />
                <span className="text-secondary">
                  {current.richDescription}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredProducts && filteredProducts.length > 0 ? (
        filteredProducts.map((item, i) => (
          <motion.button
            key={item._id ? String(item._id) : `index-${i}`}
            layoutId={item._id ? `item-${item._id}` : `item-${i}`}
            className="border-0 p-0"
            onClick={() => {
              setOrderData(item);
              setCurrent(item); 
              
            }}
          >
            <motion.div className="box text-dark p-2">
              <div className="w-100">
                <img
                  src={item.image}
                  alt={item.name || "product"}
                  className="img-fluid"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
              <div className="text-secondary fw-bold">{item.brand}</div>
              <div>{item.name}</div>
              <div className="d-flex gap-2">
                <span className="text fw-bold">&#8377; {item.price}</span>
                <span className="text-secondary">
                  {item.category?.name || item.category}
                </span>
                <span className="text-success fw-bold">{item.discount}</span>
              </div>
            </motion.div>
          </motion.button>
        ))
      ) : (
          <div
            className="d-flex loader  justify-content-center align-items-center"
                style={{
                   position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 1 
                }}
              >
                <CircularProgress color="inherit" size="3rem" />
              </div>
      )}
    </>
  );
}

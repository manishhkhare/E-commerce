import {
  EditDocument,
  Search,
  ShoppingBag,
  Close as CloseIcon,
} from "@mui/icons-material";
import React, { use, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { label } from "motion/react-client";
import { Menu } from "@mui/material";

export default function Header({ isopen, setIsopen }) {
  const [user, setUser] = useState(false);
  const [filter, setFilter] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [toggle, setToggel] = useState(false);
 

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
  });

  // if (toggle) {
  //  alert("okk")
  // }
   console.log(toggle)

  const handleApply = () => {
    alert("done");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const stateHandler = () => {
    setIsopen(!isopen);
  };

  

  const navItems = [
    { key: "home", label: "Home", to: "/Home" },
    { key: "notifications", label: "Notifications", to: "/Notifications" },
    { key: "Cart", label: "Cart", to: "/MyCart" },
    { key: "orders", label: "Orders", to: "/Orders" },
  ];  

  return (
    <>
      <div className="header">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-md">
            <Link className="navbar-brand ps-2" to="home">
              <img
                src="/img/ChatGPT Image Jun 6, 2025, 07_31_25 PM.png"
                alt="logo"
                height="50px"
              />
              Shopping
            </Link>
            <div className="tabs">
              <ul className="ps-0 d-flex">
                <button
                  className="btn border-0 d-flex"
                  onClick={() => setUser(!user)}
                >
                  Profile
                </button>
                <button className="btn border-0 d-flex" onClick={stateHandler}>
                  <Search />
                </button>
              </ul>
            </div>
            <button
              className="navbar-toggler float-end border-0"
              type="button" 
              onClick={()=>setToggel(toggle ? false :true)}
            >  
              <span className="navbar-toggler-icon bg-transparent border-0 p-0" />
            </button>
          </div>

          <div className="float-end">
            <div className="navbar-collapse collapse">
              <ul className="navbar-nav ps-0 pe-5" style={{ position: "relative" }}>
                {navItems.map((item) => (
                  <li
                    key={item.key}
                    className="nav-item"
                    onMouseEnter={() => setHoveredTab(item.key)}
                    onMouseLeave={() => setHoveredTab(null)}
                    style={{ position: "relative" }}
                  >
                    <NavLink
                      to={item.to}
                      className="nav-link d-flex"
                      style={{ position: "relative" }}
                    >
                      {item.label}
                    </NavLink>

                    <NavLink
                      to={item.to}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      {({ isActive }) =>
                        (isActive || hoveredTab === item.key) && (
                          <motion.div
                            layoutId="hover"
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              bottom: 0,
                              height: "2px",
                              background: "#000",
                              borderRadius: "2px",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )
                      }
                    </NavLink>
                  </li>
                ))}

                {/* Filter Button */}
                <li className="nav-item">
                  <button
                    className="border-0 nav-link pt-2 btn w-0 ps-0 pe-0 bg-transparent d-flex"
                    onClick={() => setFilter(!filter)}
                  >
                    Filter
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {user && (
        <motion.div
          initial={{
            scaleY: 1,
            x: 100,
          }}
          animate={{
            scaley: 0.9,
            x: 0,
          }}
          className="itemLayoutOverlay"
        >
          <div className="itemLayout text-dark p-2">
            <div className="profileBox">
              <button className="btn float-end w-100 text-end border-0">
                <EditDocument />
              </button>
              <button
                className="btn float-end w-100 text-end border-0"
                onClick={() => setUser(false)}
              >
                <CloseIcon />
              </button>
              <img
                src="/img/istockphoto-1399565382-612x612.jpg"
                className="img-fluid"
                height="10px"
              />
              <div className="userDetails">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={userData.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={userData.mobile}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={userData.address}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {filter && (
        <motion.div
          initial={{
            scaleY: 1,
            x: 100,
          }}
          animate={{
            scaley: 0.9,
            x: 0,
          }}
          className="itemLayoutOverlay"
        >
          <div className="itemLayout text-dark p-2">
            <button
              className="btn border-0 float-end"
              onClick={() => setFilter(false)}
            >
              <CloseIcon />
            </button>
            <div className="filterSection">
              <div className="filter-container">
                <h3>Filters</h3>

                <div className="filter-group">
                  <label>Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                
                  </select>
                </div>

                <div className="filter-group">
                  <label>Price</label>
                  <select
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="0-499">Under ₹500</option>
                    <option value="500-999">₹500 - ₹999</option>
                    <option value="1000+">₹1000 and above</option>
                  </select>
                </div>

                <div className="filter-group checkbox-group">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={inStock}
                    onChange={() => setInStock(!inStock)}
                  />
                  <label htmlFor="inStock">In Stock Only</label>
                </div>

                <button className="apply-button" onClick={handleApply}>
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )} 
        { (
        <motion.div
          className="sideBar"
          variants={{
            Open: { width: "200px", transition: { type: "spring", stiffness: 100 } },
            close: { width: "0px", transition: { type: "spring", stiffness: 100 } }
          }}
          initial="close"
          animate={toggle ? "Open" : "close"}
        >
          <motion.button animate={{
            rotateZ:360
          }} className="btn buttons p-3  " onClick={()=>{setToggel(false)}}><CloseIcon /></motion.button>
          <nav>
            <ul className="ps-0 navbar-nav">
              {navItems.map((item) => (
               <li
                key={item.key}
                className="nav-item"
                onMouseEnter={() => setHoveredTab(item.key)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{ position: "relative" }}
              >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      "nav-link d-flex" + (isActive ? " active" : "")
                    }
                    style={{ position: "relative" }}
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}

                        {(isActive || hoveredTab === item.key) && (
                          <motion.div
                            layoutId="underline"
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              bottom: 0,
                              height: "2px",
                              background: "#000",
                              borderRadius: "2px",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                      </>
              )}
            </NavLink>
                </li>
              ))}
            </ul>
          </nav>
         
        </motion.div>
      )}
    </>
  );
}

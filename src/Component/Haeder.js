import { AccountCircle, AccountTreeOutlined, Category, CategoryOutlined, DataSaverOn, DatasetTwoTone, Edit, EditAttributes, EditDocument, Filter, Home, NotificationAddOutlined, NotificationAddRounded, Search, ShoppingBag, ShoppingCart } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import {motion} from "motion/react"


export default function Haeder({ isopen, setIsopen }) {

  const [user, setUser] = useState(false);
  const [filter, setFilter] = useState(false);
  
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
      name: '',
      mobile: '',
      address: '',
      email: ''
    });
  
 
      const [category, setCategory] = useState('');
      const [price, setPrice] = useState('');
      const [inStock, setInStock] = useState(false);
    
        const handleApply = () => {
          alert("done")
        };
    // update handler
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData(prev => ({ ...prev, [name]: value }));
    };
    const stateHandler = () => {
      if (isopen === true) {
        setIsopen(false);
      } else {
        setIsopen(true)
      }
  } 
  const goToCart = () => {
    navigate("/MyCart")
  }
  return (
 <>
<div className='header'>  
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-md">
            <Link className="navbar-brand ps-2 " href="#"><img src='/img/ChatGPT Image Jun 6, 2025, 07_31_25 PM.png' alt='logo'
            height="50px"/>Shopping</Link>
            <div className='tabs'>
              <ul className='ps-0 d-flex'>
                <button className='btn border-0 d-flex  text-white' onClick={()=>goToCart()}>
                <ShoppingCart/> Cart</button >
                <button className='btn border-0 d-flex  text-white' onClick={() => {
                  user ? setUser(false):
                 setUser(true)
                }}><AccountCircle/> Profile</button>
                <button className='btn border-0 d-flex text-white '
                  onClick={() => {
                   stateHandler()
                  }}><Search /></button>
              </ul>
            </div>
            <button className="navbar-toggler float-end border-0" type="button">
              <span className="navbar-toggler-icon bg-transparent border-0 p-0" />
            </button> 
            {/* <div className='navBox'>NavBox</div> */}
          </div>
          <div classname="float-end">
            <div className="navbar-collapse collapse ">
                <ul className="navbar-nav ps-0 pe-5">
        <li className="nav-item">
              <Link to="/Home" className="nav-link d-flex text-white" aria-current="page" ><Home/> Home</Link>
             
        </li>

        <li className="nav-item">
          <Link className="nav-link  d-flex text-white" aria-current="page" to="Notifications"><NotificationAddRounded/> Notifications</Link>
        </li>
        <li className="nav-item   text-white">
                  <button className="border-0 pt-2 btn text-white w-0 ps-0 pe-0 bg-transparent d-flex" onClick={() => { setFilter(!filter) }}><DatasetTwoTone/> Filter</button>
        </li>
        <li className="nav-item text-white">
          <Link className="nav-link  d-flex d-flex text-white" href="#"><ShoppingBag/>Orders</Link>
        </li>
              </ul></div></div></nav></div> 
      
      {
        user && <motion.div
        initial={{
          scaleY: 1,
          x: 100
        }}
          animate={{
            scaley: 0.9,
            x:0
          }}
          className='itemLayoutOverlay'>
        <div className="itemLayout text-dark p-2">
          <div className="profileBox">
              <button className='btn float-end w-100 text-end border-0'><EditDocument /></button>
              <button className='btn float-end w-100 text-end border-0' onClick={()=>setUser(false)}><CloseIcon/></button>
            <img src="/img/istockphoto-1399565382-612x612.jpg" className='img-fluid' height="10px"></img> 
             <div className='userDetails'>
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
      } 
      { filter &&
          <motion.div
          initial={{
            scaleY: 1,
            x: 100
          }}
            animate={{
              scaley: 0.9,
              x:0
            }}
            className='itemLayoutOverlay'>
          <div className="itemLayout text-dark p-2">
          <button className='btn border-0 float-end' onClick={() => { setFilter(false) }}> <CloseIcon /></button>
            <div className='filterSection'>
              
             
              <div className="filter-container">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Price</label>
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
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

      }
    
                        
      </>
  )
}

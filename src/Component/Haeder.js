import { AccountCircle, AccountTreeOutlined, Search, ShoppingCart } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Haeder({ isopen, setIsopen }) {
  const stateHandler = () => {
    if (isopen === true) {
      setIsopen(false);
    } else {
      setIsopen(true)
    }
  }
  return (
 <>
<div className='header'>  
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-md">
     <Link className="navbar-brand ps-4" href="#">Navbar</Link>
            <div className='tabs '>
              <ul className='ps-0 d-flex'>
                <li><ShoppingCart/></li>
                <li><AccountCircle/></li>
                <button className='btn border-0'
                  onClick={() => {
                   stateHandler()
                  }}><Search /></button>
              </ul>
     </div>
    <button className="navbar-toggler float-end " type="button">
      <span className="navbar-toggler-icon" />
    </button> 
  </div>
  <div classname="float-end">
    <div className="navbar-collapse collapse ">
              <ul className="navbar-nav ps-0 pe-5">
              <li className="nav-item">
             
        </li>

        <li className="nav-item">
          <Link className="nav-link fw-bold" aria-current="page" href="">Categories</Link>
        </li>
        <li className="nav-item fw-bold">
          <Link className="nav-link" href="#">Filter</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fw-bold" href="#">Orders</Link>
        </li>
      </ul></div></div></nav></div> 
       
                        
      </>
  )
}

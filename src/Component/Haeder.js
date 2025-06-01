import React from 'react'

export default function Haeder() {
  return (
      <>
<div className='header'>  
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-md">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler float-end " type="button">
      <span className="navbar-toggler-icon" />
    </button> 
  </div>
  <div classname="float-end">
    <div className="navbar-collapse collapse ">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
      </ul></div></div></nav></div>  
                        
      </>
  )
}

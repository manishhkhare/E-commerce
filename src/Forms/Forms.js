import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { body } from 'motion/react-client';

export default function Forms() {
  const [registeration, setRegisteration] = useState(true);
  const [login, setLogin] = useState(false);

  const [loginFormData, setLoginFormData] = useState({
  
    email: '',password:''
  }) 
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    apartment: '',
    street: '',
    city: '',
    zip: '',
    country: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    }); 
   
  };

  const handleLoginChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.id]:e.target.value
    })
  }
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
   
      fetch('${process.env.REACT_APP_BASE_URL}/api/v3/user/registeration', {
        method: "POST"
        ,
        headers:{
        'content-Type': 'application/json',
          
      },
        body:JSON.stringify(formData)
      })
        .then(result => {
          
          if (result.status === 500)
            alert(result.statusText);
          else if (result.status === 200) {
            alert(result.statusText)
          
          }
        })
        .catch(err=>console.log('Registeration failed',err))
  
    // navigate('/Home');
  };   
   console.log(loginFormData)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("login", loginFormData,process.env.REACT_APP_BASE_URL);

    fetch(`${process.env.REACT_APP_BASE_URL}/api/v3/user/login`, {
      method: "POST"
      ,
      headers: {
        'content-Type': 'application/json',
        
      },
      body: JSON.stringify(loginFormData)
    }).then(res =>
    {
      if (res.status === 200) {
        alert('Login Successfull !!')
        navigation('/home')
      }
      else if (res.status === 401) {
        alert('Invalid Password')
      } else {
        alert('User Not Fount !!!')
      }
      return res.json();
    }
    )
      .then(result => { 
      if(result.status === 500)
          alert(result.statusText);
      else if (result.status === 200) {
        alert(result.statusText)
      
        }
         
        
        const token = localStorage.setItem('token', result.jwt)
      })
      .catch(err=>console.log('Registeration failed',err))

  };

  return (
    <motion.div
      transition={{ duration: 0.5, type: 'easeInOut' }}
      className='frontPage min-vh-100 d-flex align-items-center bg-dark'
    >
      <div className='container-fluid h-100 '>
        <div className='row m-0 d-flex h-100 justify-content-center align-items-center'>
          {/* Left Section */}
          <div className='col-12 col-md-6 text-center text-white p-5 d-flex flex-column justify-content-center align-items-center'>
            <motion.div
              initial={{ scaleY: 1, x: -100 }}
              animate={{ scaleY: 0.95, x: 0, }}
              transition={{duration:0.3}}
            >
              <img
                src='/img/ChatGPT Image Jun 6, 2025, 07_31_25 PM.png'
                alt='img'
                className='img-fluid mb-4'
                style={{ maxHeight: '250px' }}
              />
              <h2 className='mb-2'>Shopping Cart</h2>
              <div className='mt-3'>
                <button
                  className='btn btn-outline-light me-2 mb-2'
                  onClick={() => {
                    setLogin(false);
                    setRegisteration(true);
                  }}
                >
                  Sign Up
                </button>
                <button
                  className='btn btn-outline-light mb-2'
                  onClick={() => {
                    setLogin(true);
                    setRegisteration(false);
                  }}
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Section */}
          <div className='col-12 col-md-6 d-flex justify-content-center align-items-center '>
            {registeration && (
              <motion.div
                className='w-100 d-flex justify-content-center align-items-center'
                initial={{ scaleY: 1, x: 100 }}
                animate={{ scaleY: 0.9, x: 0 }}
                transition={{duration:0.3}}
              >
        <div className='forms shadow rounded-4 
        d-flex justify-content-center align-items-center'>
          <h2 className='text-center mb-4 '>Sign Up</h2>
                  <form className='registerationForm' onSubmit={handleRegisterSubmit}>
                    <div className='column'>
              <div className='mb-3 inputBox'>
                <label htmlFor='name' className='form-label'>Full Name</label>
                <input type='text' className='form-control' id='name' value={formData.name} onChange={handleChange} required />
              </div>

              <div className='mb-3 inputBox'>
                <label htmlFor='phone' className='form-label'>Phone</label>
                <input type='tel' className='form-control' id='phone' value={formData.phone} onChange={handleChange} required />
              </div>
            
                    <div className='mb-3 inputBox'>
                      
                <label htmlFor='email' className='form-label'>Email address</label>
                <input type='email' className='form-control' id='email' value={formData.email} onChange={handleChange} required />
              </div>

              <div className='mb-3 inputBox'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input type='password' className='form-control' id='password' value={formData.password} onChange={handleChange} required />
              </div>
              
              <div className='mb-3 inputBox '>
                <label htmlFor='apartment' className='form-label'>Apartment</label>
                <input type='text' className='form-control' id='apartment' value={formData.apartment} onChange={handleChange} />
              </div>
            
              <div className='mb-3 inputBox'>
                <label htmlFor='street' className='form-label'>Street</label>
                <input type='text' className='form-control' id='street' value={formData.street} onChange={handleChange} />
              </div>

              <div className='mb-3 inputBox'>
                <label htmlFor='city' className='form-label'>City</label>
                <input type='text' className='form-control' id='city' value={formData.city} onChange={handleChange} />
              </div>

              <div className='mb-3 inputBox'>
                <label htmlFor='zip' className='form-label'>ZIP Code</label>
                <input type='text' className='form-control' id='zip' value={formData.zip} onChange={handleChange} />
              </div> 

              <div className='mb-3 inputBox'>
                <label htmlFor='country' className='form-label'>Country</label>
                <input type='text' className='form-control' id='country' value={formData.country} onChange={handleChange} />
              </div>
              </div>
              <button type='submit' className='btn btn-outline-primary form-control'>
                Register
              </button>
         </form>
                </div>
              </motion.div>
            )}

            {login && (
              <motion.div
                className='w-100'
                initial={{ scaleY: 1, x: 100 }}
                animate={{ scaleY: 0.9, x: 0 }}
              >
                <div className='card p-5 shadow rounded-4' style={{ maxWidth: '400px', margin: 'auto' }}>
                  <h2 className='text-center mb-4'>Sign In</h2>
                  <form className='w-100' onSubmit={handleLoginSubmit}>
                    <div className='mb-3 inputBox'>
                      <label htmlFor='loginEmail' className='form-label'>Email address</label>
                      <input type='email' className='form-control' id='email'
                        value={loginFormData.email} onChange={handleLoginChange} required />
                    </div>
                    <div className='mb-3 inputBox'>
                      <label htmlFor='loginPassword' className='form-label'>Password</label>
                      <input type='password' className='form-control '
                        value={loginFormData.passsword} id='password'
                        onChange={handleLoginChange} required />
                    </div>
                    <button type='submit' className='btn btn-outline-primary form-control'>
                      Login
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Forms() {
  const [registeration, setRegisteration] = useState(true);
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

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
      [e.target.id]: e.target.value
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v3/user/registeration`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.status === 200) {
          toast.success('Registration Successful!');
        } else if (res.status === 500) {
          toast.error('Server Error');
        } else {
          toast.error(data.message || 'Registration failed');
        }
      })
      .catch(err => {
        console.error('Registration failed', err);
        toast.error('Something went wrong!');
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v3/user/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginFormData)
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.status === 200) {
          toast.success('Login Successful!');
          localStorage.setItem('token', data.jwt);
          navigate('/home');
        } else if (res.status === 401) {
          toast.warn('Invalid Password');
        } else {
          toast.error('User Not Found');
        }
      })
      .catch(err => {
        console.error('Login failed', err);
        toast.error('Something went wrong!');
      });
  };

  return (
    <motion.div
      transition={{ duration: 0.5, type: 'easeInOut' }}
      className='frontPage align-items-center'
    >
      <div className='container-fluid p-0 h-100'>
        <div className='row m-0 d-flex h-100 justify-content-center align-items-center'>
          {/* Left Section */}
          <div className='col-12 col-md-6 text-center text-white p-5 d-flex flex-column justify-content-center align-items-center'>
            <motion.div
              initial={{ scaleY: 1, x: -100 }}
              animate={{ scaleY: 0.95, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src='/img/ChatGPT Image Jun 6, 2025, 07_31_25 PM.png'
                alt='img'
                className='img-fluid mb-4'
                style={{ maxHeight: '250px' }}
              />
              <h2 className='mb-2 text-dark'>Shopping Cart</h2>
              <div className='mt-3'>
                <button style={{backgroundColor:"#E05F12"}}
                  className='btn btn-outline active me-2 mb-2'
                  onClick={() => {
                    setLogin(false);
                    setRegisteration(true);
                  }}
                >
                  Sign Up
                </button>
                <button style={{backgroundColor:"#016D74"}}
                  className='btn btn-outline active p-2 me-2 mb-2'
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
          <div className='col-12 col-md-6 d-flex justify-content-center align-items-center'>
            {registeration && (
              <motion.div
                className='w-100 d-flex justify-content-center align-items-center'
                initial={{ scaleY: 1, x: 100 }}
                animate={{ scaleY: 0.9, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className='forms shadow rounded-4 w-100'>
                  <h2 className='text-center mb-4'>Sign Up</h2>
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
                      <div className='mb-3 inputBox'>
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
                className='loginForm w-100'
                initial={{ scaleY: 1, x: 100 }}
                animate={{ scaleY: 0.9, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className='p-5 shadow rounded-4 w-100'>
                  <h2 className='text-center mb-4'>Sign In</h2>
                  <form className='w-100' onSubmit={handleLoginSubmit}>
                    <div className='mb-3 inputBox'>
                      <label htmlFor='email' className='form-label'>Email address</label>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        value={loginFormData.email}
                        onChange={handleLoginChange}
                        required
                      />
                    </div>
                    <div className='mb-3 inputBox'>
                      <label htmlFor='password' className='form-label'>Password</label>
                      <input
                        type='password'
                        className='form-control'
                        id='password'
                        value={loginFormData.password}
                        onChange={handleLoginChange}
                        required
                      />
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

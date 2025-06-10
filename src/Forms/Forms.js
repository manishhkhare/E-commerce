import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Forms() {
  const [login, setLogin] = useState(false);
  const [registeration, setRegisteration] = useState(true);
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    navigate('/Home'); // replace '/Home' with actual home route
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    navigate('/Home');
  };

  return (
    <>
      <motion.div
        transition={{ duration: 0.5, type: 'easeInOut' }}
        className='frontPage'
      >
        <div className='container h-100'>
          <div className='row m-0'>
            <div className='col-md-6 d-flex justify-content-center align-items-center'>
              <motion.div
                initial={{ scaleY: 1, x: -100 }}
                animate={{ scaleY: 0.95, x: 0 }}
                className='text-center'
              >
                <div className='heading fs-1 fw-bold text-light'>
                  <img
                    src='/img/ChatGPT Image Jun 6, 2025, 07_31_25 PM.png'
                    alt='img'
                    height='300px'
                  />
                </div>
                <div className='fs-2 text-white'>Shopping Cart</div>
                <div className="mt-3">
                  <button className="btn btn-outline-light me-2" onClick={() => { setLogin(false); setRegisteration(true); }}>
                    Sign Up
                  </button>
                  <button className="btn btn-outline-light" onClick={() => { setLogin(true); setRegisteration(false); }}>
                    Sign In
                  </button>
                </div>
              </motion.div>
            </div>

            <div className='col-md-6'>
              {registeration && (
                <motion.div
                  className='formWraper'
                  initial={{ scaleY: 1, x: 100 }}
                  animate={{ scaleY: 0.9, x: 0 }}
                >
                  <div className='form'>
                    <h1>Sign Up</h1>
                    <div className='d-flex justify-content-center align-items-center'>
                      <form onSubmit={handleRegisterSubmit}>
                        <div className='mb-3'>
                          <label htmlFor='name' className='form-label'>Full Name</label>
                          <input type='text' className='form-control' id='name' />
                        </div>
                        <div className='mb-3'>
                          <label htmlFor='email' className='form-label'>Email address</label>
                          <input type='email' className='form-control' id='email' />
                        </div>
                        <div className='mb-3'>
                          <label htmlFor='password' className='form-label'>Password</label>
                          <input type='password' className='form-control' id='password' />
                        </div>
                        <button type='submit' className='btn btn-primary form-control rounded-0'>
                          Register
                        </button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}

              {login && (
                <motion.div
                  initial={{ scaleY: 1, x: 100 }}
                  animate={{ scaleY: 0.9, x: 0 }}
                >
                  <div className='heading d-flex pt-5 mt-5 justify-content-center align-items-center text-light w-100'>
                    <h1>Sign In</h1>
                  </div>
                  <div className='d-flex justify-content-center align-items-center'>
                    <form onSubmit={handleLoginSubmit}>
                      <div className='mb-3'>
                        <label htmlFor='loginEmail' className='form-label'>Email address</label>
                        <input type='email' className='form-control' id='loginEmail' />
                      </div>
                      <div className='mb-3'>
                        <label htmlFor='loginPassword' className='form-label'>Password</label>
                        <input type='password' className='form-control' id='loginPassword' />
                      </div>
                      <button type='submit' className='btn btn-outline-primary form-control rounded-0'>
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
    </>
  );
}

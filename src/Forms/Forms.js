import React, { useState } from 'react'
import { easeInOut, motion } from 'motion/react';

export default function Forms() {
  const [login, setLogin] = useState(false);
  const [registeration,setRegisteration] = useState(true)
    return (
      <>  <motion.div
        
        transition={{
          duration: 0.5,
          type:"easeInOut"
        }}
        className='frontPage'>
              <div className='container h-100'>
                <div className='row m-0 '>
                    <div className='col-md-6 col-sm-6 d-flex justify-content-center align-items-center'>
              <motion.div
                initial={{
                  scaleY: 1,
                  x:-100
                }} 
                animate={{
                  scaleY: 0.95,
                  x:0
                }}
                className='text-center '>
                <div className='heading fs-1 fw-bold text-light'>
                  <img src="/img/ChatGPT Image Jun 6, 2025, 07_31_25 PM.png" alt="img" height="300px"/>
                </div>
                <div className='  fs-2'>Shopping Cart</div>
                 
                      </motion.div>
                     </div> 
             <div className='col-md-6 col-sm-6 
                '>
              {registeration && <>  
                <motion.div className='formWraper'
                
                initial={{
                  scaleY: 1,
                  x: 100
                }}
                  animate={{
                    scaley: 0.9,
                    x:0
                  }}>
              <div className='form'>
              <h1>Singn Up</h1>
             
                <motion.div 
                  className='
              d-flex justify-content-center 
               d-flex align-items-center '>
                <form className=' '> 
                          <div>
                <div className="mb-3 form">
                  <label htmlFor="exampleInputName" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="exampleInputName" aria-describedby="NameHelp" />
                </div>
                <div className="mb-3 form">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 form">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary form-control rounded-0 ">Submit</button>
              </div>

                                  </form> 
              </motion.div>  </div></motion.div> </> } 
              
              {login && (
                <> 
                  <motion.div
                  initial={{
                    scaleY: 1,
                    x: 100
                  }}
                    animate={{
                      scaley: 0.9,
                      x:0
                    }}
                  >
                  <div
                  
                    className="heading end-0 bottom-0 d-flex justify-content-center align-items-center text-light w-100">
                    <h1>Sign In</h1>
                  </div>

                  <div className="d-flex justify-content-center align-items-center">
                    <form >
                     <div className="mb-3 form">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" />
                      </div>

                      <div className="mb-3 form">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                      </div>

                      <button type="submit" className="btn btn-outline-primary form-control rounded-0">Submit</button>
                    </form>
                    </div> 
                    </motion.div>
                </>
              )}
              </div>
                     </div>
                  </div>
              </motion.div>

          
        
      </>
   
  )
}

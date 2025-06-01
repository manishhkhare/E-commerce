import React, { useState } from 'react'

export default function Forms() {
  const [login, setLogin] = useState(false);
  const [registeration,setRegisteration] = useState(true)
    return (
        <>  <div className='frontPage'>
              <div className='container h-100'>
                <div className='row m-0 '>
                    <div className='col-md-6 col-sm-6 d-flex justify-content-center align-items-center'>
              <div className='text-center '>
                <div className='heading fs-1 fw-bold text-light'>
                  <img src="src/img/—Pngtree—diwali indian family shopping_6938325.png" alt="img"/>
                </div>
                <button className='btn btn-outline-danger  rounded-0 form-control'>Click here</button>
                 
                      </div>
                     </div> 
             <div className='col-md-6 col-sm-6 
                '>
           {registeration && <>  
              <div className='heading end-0 bottom-0 
              d-flex justify-content-center 
              align-items-center text-light w-100 '>
              <h1>Singn Up</h1>
              </div> 
              <div className='
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
              </div> </>} 
              
              {login && (
                <>
                  <div className="heading end-0 bottom-0 d-flex justify-content-center align-items-center text-light w-100">
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
                </>
              )}
              </div>
                     </div>
                  </div>
              </div>

          
        
      </>
   
  )
}

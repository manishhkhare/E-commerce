import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Cart } from './Cart'
import { useNavigate } from 'react-router-dom';
import { CheckOut } from './CheckOut';
import { ArrowBackIos, ArrowDownward } from '@mui/icons-material';

export default function Shoppingitems() {
  const [current, setCurrent] = useState(false,[])
  

  const navigate = useNavigate()
 
  const handlCartItems = () => { 
  
    navigate('myCart', { state: { items: current } })
   
  } 
  
  return (
    <>{current&&
      <div className='itemLayoutOverlay'>
           <div className="itemLayout text-dark p-2">
          <div className="closeBtn float-end ">
            <button type='close' className='btn border-0 p-0' onClick={() => { setCurrent(false); }}><CloseIcon/></button>
           </div>
          <div className="w-100">
              <img key={current.img}
                src={current.img}
                    className="img-fluid"
                    alt="img"
              />
            </div>
              <div className="text-secondary fw-bold">{current.brand}</div>
              <div>{current.name}</div>
            <div>
              <span className="text fw-bold">{current.price} </span>
                <span className="text-secondary text-decoration-line-through">{ current.realprice }</span>
                <span className="text-success fw-bold"> {current.discount}</span>
          </div>
          <div className='pt-4 btn_group '>
            <select className='form-control w-25 focus-0 '
              value={current.size[1]} onChange={
              (e)=>{console.log(setCurrent({...current,size:e.target.value}))}
            }>
              
              <option value="5">sSize<ArrowBackIos fontSize='small'/></option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
                                   
            </select>
            
          <button type='button me-3' className='btn btn-warning rounded-0' onClick={()=>{handlCartItems()}}>Add Cart</button>  
          <button type='button' className='btn btn-danger rounded-0'>Buy Now</button>

          </div>
          
        </div>
           
      </div>
   
       
      
    
    }
          
      {
          
          Cart.map((items, i) => {
            return ( 
              <button className='border-0 p-0' onClick={()=>setCurrent(items)}>
            <div className="box text-dark p-2">
            <div className="w-100">
              <img key={items.img}
                src={items.img}
                    className="img-fluid"
                    
              />
            </div>
              <div className="text-secondary fw-bold">{items.brand}</div>
              <div>{items.name}</div>
            <div>
              <span className="text fw-bold">{items.price} </span>
                <span className="text-secondary text-decoration-line-through">{ items.realprice }</span>
                <span className="text-success fw-bold"> {items.discount}</span>
            </div>
                </div>
                </button>

           ) })
        }    
                 </>
  )
}

import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Cart } from './Cart'
import { useNavigate } from 'react-router-dom';
import { CheckOut } from './CheckOut';
import { ArrowBackIos, ArrowDownward, CrueltyFree } from '@mui/icons-material';
import { motion } from 'motion/react';
import Addressform from '../Forms/Addressform';

export default function Shoppingitems({addItems,setAddItems}) {
  const [current, setCurrent] = useState(false,[]);
  const [buyNow, setBuyNow] = useState(false);

  const navigate = useNavigate()
 
  const handlCartItems = () => { 
  
    setAddItems([...addItems,current]);
    
   
  }  
  const handleBayNow = () => { 
    if (buyNow === true)
    {
      setBuyNow(false)
    } else {
      setBuyNow(true)
      setCurrent(false)
    }
    
  }
  console.log(addItems)
  return (
    <> {
      buyNow && <motion.div
        initial={{
          scale: 0.5,
          x:100
         
      }}
        animate={
          {
            scale: 1,
            x: 0
          }} className='itemLayoutOverlay'>
        <div className="itemLayout text-dark p-2">
          <button className='closeBtn text-end float-end border-0' onClick={()=>setBuyNow(false)}><CloseIcon/></button>
        <Addressform/>
      </div>
    </motion.div>}
      
      { current &&
      <motion.div layoutId={current.name} className='itemLayoutOverlay'>
           <div className="itemLayout text-dark p-2">
          <div className="closeBtn float-end ">
            <motion.button  type='close' className='btn border-0 p-0' onClick={() => { setCurrent(false); }}><CloseIcon/></motion.button>
           </div>
          <motion.div 
            className="w-100">
            <motion.img layoutId={current.img}
              transition={{
               duration:0.05
             }} key={current.img}
                src={current.img}
                    className="img-fluid"
                    alt="img"
              />
            </motion.div>
              <motion.div layoutId={current.brand} className="text-secondary fw-bold">{current.brand}</motion.div>
              <div>{current.name}</div>
            <div>
              <span className="text fw-bold">{current.price} </span>
                <span className="text-secondary text-decoration-line-through">{ current.realprice }</span>
                <span className="text-success fw-bold"> {current.discount}</span>
          </div>
          <div className='pt-4 btn_group '>
            <select className='form-control w-25 focus-0 '
              value={current.size[0]} onChange={
              (e)=>{console.log(setCurrent({...current,size:e.target.value}))}
            }>
              
              <option value="5">sSize<ArrowBackIos fontSize='small'/></option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
                                   
            </select>
            
          <button type='button me-3' className='btn btn-warning rounded-0' onClick={()=>{handlCartItems()}}>Add Cart</button>  
          <button type='button' className='btn btn-danger rounded-0' onClick={()=>{handleBayNow()}}>Buy Now</button>

          </div>
          
        </div>
           
      </motion.div>
   
       
      
    
    }
          
      {
          
          Cart.map((items, i) => {
            return ( 
              <motion.button layoutId={items.name} className='border-0 p-0' onClick={()=>setCurrent(items)}>
            <motion.div className="box text-dark p-2">
            <div className="w-100">
              <img key={items.img}
                src={items.img}
                    className="img-fluid"/>
            </div>
              <div className="text-secondary fw-bold">{items.brand}</div>
              <div>{items.name}</div>
            <div>
              <span className="text fw-bold">{items.price} </span>
                <span className="text-secondary text-decoration-line-through">{ items.realprice }</span>
                <span className="text-success fw-bold"> {items.discount}</span>
            </div>
                </motion.div>
                </motion.button>

           ) })
        }    
                 </>
  )
}

import { legend } from 'motion/react-client';
import React, { useEffect, useState } from 'react';

export const CheckOut = ({ addItems }) => {
  const [quantity, setQuantity] = useState(1);
  const [listItems, setListItems] = useState([])


   
  
    useEffect(() => {
      if (addItems && addItems.length > 0) {
        setListItems(addItems); 
      }
    }, [addItems]);
 console.log()

  const increament = () => {
    setQuantity(quantity + 1);
  };

  const decreament = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  return (
    <div className='myCart'>
      <div className='myCartWraper'>
       { listItems.length === 0 &&
            <div className='w-100 h-100 d-flex pt-5 fs-1 justify-content-center align-items-center'>List items is empty...</div>  

     }
        {listItems.map((item, i) => (
          <div className='Cart' key={i}>
            <div className='boxes d-flex'>
              <div className='img'>
                <img src={item.img} alt='' style={{ height: '200px' }} />
              </div>
              <div className='cartDetail'>
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Price:</strong> ₹{item.price}</p>
                <p><strong>Size:</strong> {item.size}</p>
                <div className='btn_group d-flex gap-2 align-items-center'>
                  <button type='button' className='btn btn-success rounded-0' onClick={increament}>+</button>
                  <input
                    type='text'
                    className='border form-control text-center'
                    value={quantity}
                    readOnly
                    style={{ width: "60px" }}
                  />
                  <button type='button' className='btn btn-danger rounded-0' onClick={decreament}>-</button>
                </div>
              </div>
            </div>
            <button type='submit' className='btn btn-warning w-100 mt-2 rounded-0'>Order</button>
          </div>
        ))} 
        
      </div>
    </div>
  );
};

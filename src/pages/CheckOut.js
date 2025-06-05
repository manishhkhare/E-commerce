import { listClasses, ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export const CheckOut = () => {
    const [quantity, setQuantity] = useState(0);
    const [listItems, setListItems] = useState([
    
    ]);
    const location = useLocation();
    const items = location.state?.items || [];
    useEffect(() => {
        if (items) {
            setListItems([...listItems, items]);// Add the selected item to
         
        }
    }, [items]);
    
  
    const increament = () => {
        if (quantity === 0 || quantity >0) {
         setQuantity(quantity + 1)
     }        
    } 
    const decreament = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }
  return (
      <>
          <div className='myCart'>
              <div className='myCartWraper'>
                
                  {listItems.map((list, i) => {
                      return ( 
                          <>
                                <div className='Cart'>
                            <div className='boxes'>
                            <div className='img' >
                            <img src={list.img} key={list.img} alt='' style={{height:"200px"}}/>
                            </div>
                            <div className='cartDetail'>
                                <p>Name:{list.name}</p>
                                <p>price:{list.price}</p>
                                <p>Size:{list.size}</p>
                            <div className='btn_group d-flex'>
                            <button type='button' className='btn btn-success rounded-0' onClick={()=>increament()}>+</button>
                                <input type='text' className='border form-control ' placeholder={quantity} value={quantity} ></input>
                                <button type='button' className='btn btn-danger rounded-0 btn-small' onClick={()=>decreament()}>-</button>

                            </div>
                            </div> 
                        </div>
                        <button type='submit' className='btn btn-warning w-100 rounded-0'>Order</button> </div></>
  );
})}

      
        <div className='Cart'>C</div>
        <div className='Cart'>D</div>
    </div>
    
</div>
</>
  )
}

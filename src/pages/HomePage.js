import React, { useState } from 'react'
import { Cart }  from './Cart'
import Shoppingitems from './Shoppingitems'
import  SearchBar  from '../Component/SearchBar'

export default function HomePage({searchVarient,isopen}) { 

  return (
      <>
      <div className="homePage">
      <SearchBar isopen={isopen} />
        <div className='homeContainer'> 
          
          <Shoppingitems  />
          
          </div> 
          </div>
       
      </>
  )
}

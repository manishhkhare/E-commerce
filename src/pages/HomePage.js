import React, { useState } from 'react'
import { Cart }  from './Cart'
import Shoppingitems from './Shoppingitems'
import  SearchBar  from '../Component/SearchBar'

export default function HomePage({isopen,addItems,setAddItems}) { 
  const [searchData, setSearchData] = useState(null);
   
 
  return (
      <>
      <div className="homePage">
      <SearchBar isopen={isopen} setSearchData={setSearchData} />
        <div className='homeContainer'> 
        <Shoppingitems addItems={addItems} setAddItems={setAddItems}
        searchData={searchData} />
           </div> 
          </div>
       
      </>
  )
}

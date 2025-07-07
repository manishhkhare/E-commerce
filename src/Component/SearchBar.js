import { Height, Opacity, Search } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import * as motion from "motion/react-client"
import { duration } from '@mui/material'

const SearchBar = ({ isopen,setSearchData }) => { 
  const [input, setInput] = useState(null);
  useEffect(() => {
    setSearchData(input);
  }, [input, setSearchData]);

  const searchBarVarient = {
    open: {
      height: "50px",
      opacity:1
    },
    close: {
      height: "0px",
      
      opacity: 0,
    
    }
  }
  //  console.log(isopen,"isopen or not", searchBarVarient)
  return (
      <>
      <motion.div variants={searchBarVarient}
       
        animate={isopen?"open":"close"} className='searchBar'>
              <input type='text' className='form-control' placeholder='Search here' onChange={(e)=>(setInput(e.target.value))}></input>
              <button type='button' className='btn 
              btn-danger'><Search/></button>
          </motion.div>
        </>
  )
}
export default SearchBar;
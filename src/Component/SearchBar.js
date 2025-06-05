import { Height, Opacity, Search } from '@mui/icons-material'
import React from 'react'
import * as motion from "motion/react-client"

const SearchBar = ({ isopen }) => {
  const searchBarVarient = {
    open: {
      height: "50px",
      opacity:1
    },
    close: {
      height: "0px",
      opacity:0
    }
  }
   console.log(isopen,"isopen or not", searchBarVarient)
  return (
      <>
      <motion.div variants={searchBarVarient}
        animate={isopen?"open":"close"} className='searchBar'>
              <input type='text' className='form-control' placeholder='Search here'></input>
              <button type='button' className='btn 
              btn-danger'><Search/></button>
          </motion.div>
        </>
  )
}
export default SearchBar;
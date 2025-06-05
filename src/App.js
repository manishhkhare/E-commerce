import logo from './logo.svg';
import './App.css';
import Component from './Component';
import Button from '@mui/material/Button';
import { ButtonBase } from '@mui/material';
import Forms from './Forms/Forms';
import { Route, Routes } from 'react-router-dom';
import Haeder from './Component/Haeder';
import HomePage from './pages/HomePage';
import {Cart} from './pages/Cart';
import { CheckOut } from './pages/CheckOut';
import { useState } from 'react';

import { Height } from '@mui/icons-material';


import SearchBar  from './Component/SearchBar';




function App() {
  const [isopen, setIsopen] = useState();
  
  
  return (
    <><Haeder isopen={isopen}
      
      setIsopen={setIsopen} />
     
     
      <Routes>
        <Route path="/Welcome" element={<Forms/>}/>
    
        <Route path="/MyCart" element={<CheckOut/>} />
        <Route path="*" element={<HomePage isopen={isopen} />}/>
      
      </Routes>
   
    </>
    
    
    
  );
}

export default App;

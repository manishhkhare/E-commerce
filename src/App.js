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
import Notifications from './pages/Notifications';
import Footer from './Component/Footer';

function App() {
  const [isopen, setIsopen] = useState();
  const [addItems, setAddItems] = useState([]);
  let items = JSON.stringify(addItems)

  
  return (
    <>
            <Haeder isopen={isopen} setIsopen={setIsopen} />

    <Routes>
      <Route path="/welcome" element={<Forms />} />
      <Route path="/mycart" element={<CheckOut addItems={addItems} />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="*" element={
        <HomePage 
          isopen={isopen} 
          addItems={addItems} 
          setAddItems={setAddItems} 
        />
      } />
    </Routes>

    <Footer />
    </>
    
    
    
  );
}

export default App;

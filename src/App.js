import logo from './logo.svg';
import './App.css';
import Component from './Component';
import Button from '@mui/material/Button';
import { ButtonBase } from '@mui/material';
import Forms from './Forms/Forms';
import { Route, Routes } from 'react-router-dom';
import Haeder from './Component/Haeder';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';



function App() {
  return (
    <><Haeder/>
      <Routes>
        <Route path="/Welcome" element={<Forms/>}/>
    
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Home" element={<HomePage/>}/>
      
      </Routes>
   
</>
    
    
  );
}

export default App;

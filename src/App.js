import './App.css';
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Forms from './Forms/Forms';
import Haeder from './Component/Haeder';
import HomePage from './pages/HomePage';
import { CheckOut } from './pages/CheckOut';
import Notifications from './pages/Notifications';
import Footer from './Component/Footer';

function App() {
  const [isopen, setIsopen] = useState();
  const [addItems, setAddItems] = useState([]);

  const location = useLocation();
  const hideHeaderOnPaths = ['/', '/welcome'];

  const shouldHideHeader = hideHeaderOnPaths.includes(location.pathname.toLowerCase());

  return (
    <>
      {!shouldHideHeader && <Haeder isopen={isopen} setIsopen={setIsopen} />}

      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/welcome" element={<Forms />} />
        <Route path="/mycart" element={<CheckOut addItems={addItems} />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route
          path="/home"
          element={
            <HomePage
              isopen={isopen}
              addItems={addItems}
              setAddItems={setAddItems}
            />
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

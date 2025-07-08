import './App.css';
import { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Forms from './Forms/Forms';
import Haeder from './Component/Haeder';
import HomePage from './pages/HomePage';
import { CheckOut } from './pages/CheckOut';
import Notifications from './pages/Notifications';
import Footer from './Component/Footer';
import Orders from './pages/Order';
import { ToastContainer } from 'react-toastify';
import ErrorPage from './Component/ErrorPage';

function App() {
  const [isopen, setIsopen] = useState();
  const [addItems, setAddItems] = useState([]);
  const location = useLocation();
  const token = localStorage.getItem('token');

  const hideHeaderOnPaths = ['/', '/welcome'];
  const shouldHideHeader = hideHeaderOnPaths.includes(location.pathname.toLowerCase());

  const isErrorPage = location.pathname !== '/welcome'
    && location.pathname !== '/Home'
    && location.pathname !== '/MyCart'
    && location.pathname !== '/Notifications'
    && location.pathname !== '/Orders';

  return (
    <>
      {!shouldHideHeader && !isErrorPage && <Haeder isopen={isopen} setIsopen={setIsopen} />}
      <ToastContainer position="top-center" />
      { isErrorPage ? (
        <ErrorPage />
      ) : (
        <Routes>
          <Route path="/welcome" element={<Forms />} />
          {token ? (
            <>
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
              <Route path="/mycart" element={<CheckOut addItems={addItems} />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/orders" element={<Orders />} />
            </>
          ) : (
            <>
              <Route path="/Home" element={<Navigate to="/welcome" />} />
              <Route path="/MyCart" element={<Navigate to="/welcome" />} />
              <Route path="/Notifications" element={<Navigate to="/welcome" />} />
              <Route path="/Orders" element={<Navigate to="/welcome" />} />
            </>
          )}
        </Routes>
      )}
      {!isErrorPage && <Footer />}
    </>
  );
}

export default App;

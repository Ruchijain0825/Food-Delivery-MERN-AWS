import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import axios from 'axios'


const App = () => {
   axios.defaults.withCredentials=true
  const [showLogin,setShowLogin] = useState(false);
  
 

  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
          <Route path='/order' element={<ProtectedRoute><MyOrders/></ProtectedRoute>}/>
          <Route path='/myorders' element={<ProtectedRoute><PlaceOrder/></ProtectedRoute>}/>
          <Route path='/verify' element={<ProtectedRoute><Verify/></ProtectedRoute>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App

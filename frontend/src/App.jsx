import React, { useState } from 'react'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import FarmerPopup from './components/FarmerPopup/FarmerPopup'
import VendorPopup from './components/VendorPopup/VendorPopup'


const App = () => {

  const [showFarmer, setShowFarmer] = useState(false)

  const [showVendor, setShowVendor] = useState(false)

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showVendor?<VendorPopup setShowVendor={setShowVendor}/>:<></>}
    {showFarmer?<FarmerPopup setShowFarmer={setShowFarmer}/>:<></>}
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowFarmer={setShowFarmer} setShowVendor={setShowVendor} setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
      </Routes>
    </div>
    <Footer/>
    <ToastContainer />
    </>
    
  )
}

export default App
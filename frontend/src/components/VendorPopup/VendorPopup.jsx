import React, { useState } from 'react'
import './VendorPopup.css'
import { useDispatch, useSelector } from 'react-redux';
import { register, reset, login } from '../../features/auth/authSlice';
import { assets } from '../../assets/assets'

const VendorPopup = ({setShowVendor}) => {

    const [vendorState, setVendorState] = useState("Login")
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const dispatch = useDispatch();

    
    const handleLogin = (e) => {
        e.preventDefault()
    
        const userData = {
          Email,
          Password,
          isVendor:true,
        }
    
        dispatch(login(userData))
      }
  return (
    <div className='vendor-popup'>

        <form onSubmit ={handleLogin} className="vendor-popup-container">
            <div className="vendor-popup-title">
                <h2>{vendorState}</h2>
                <img onClick={()=>setShowVendor(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className="vendor-popup-inputs">
                {vendorState==="Login"
                ?<></>:
                <>
                <input type='text' placeholder='Your Name' required/>
                <input type="number" placeholder='Phone Number' required />
                <input type="text" placeholder='Address' required />
                </>}
                <input type="email" placeholder='Email Address' required  value={Email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder='Password' required value={Password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>{vendorState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="vendor-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {
                vendorState==="Login"
                ?<p>Create a new accout? <span onClick={()=>setVendorState("Sign Up")}>Click Here</span></p>
                :<p>Already have an account? <span onClick={()=>setVendorState("Login")}>Login Here</span></p>
            }
        </form>

    </div>
  )
}

export default VendorPopup
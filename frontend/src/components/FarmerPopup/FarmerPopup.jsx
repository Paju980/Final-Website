import React, { useState } from 'react'
import './FarmerPopup.css'
import { assets } from '../../assets/assets'

const FarmerPopup = ({setShowFarmer}) => {
    const [farmerState, setFarmerState] = useState("Login")
  return (
    <div className='farmer-popup'>
        <form action="" className="farmer-popup-container">
            <div className="farmer-popup-title">
                <h2>{farmerState}</h2>
                <img onClick={()=>setShowFarmer(false)} src={assets.cross_icon} alt="" srcset="" />
            </div>
            <div className="farmer-popup-inputs">
                {farmerState==="Login"
                ?<></>
                :<>
                <input type='text' placeholder='Your Name' required/>
                <input type="number" placeholder='Phone Number' required />
                <input type="text" placeholder='Address' required />
                </>}
                
                <input type="email" placeholder='Email Address' required />
                <input type="password" placeholder='Password' required />
            </div>
            <button>{farmerState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="farmer-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to the terms of use & privacy poilcy.</p>
            </div>
            {
                farmerState==="Login"
                ?<p>Create a new Account? <span onClick={()=>setFarmerState("Sign Up")}>Click Here</span></p>
                :<p>Already Have an Account? <span onClick={()=>setFarmerState("Login")}>Login Here</span></p>
            }
        </form>
    </div>
  )
}

export default FarmerPopup
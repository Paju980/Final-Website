import React, { useState,useEffect } from 'react'
import './VendorPopup.css'
import { useDispatch, useSelector } from "react-redux";
import { register, reset, login } from '../../features/auth/authSlice'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from '../../assets/assets'

const VendorPopup = ({setShowVendor}) => {

    const [vendorState, setVendorState] = useState("Login")
    const [UserName, setUserName] = useState("");
    const [Address, setAddress] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfrirmPassword] = useState("");
    const [mobNo, setMobNo] = useState(0);
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState("weak");
    const [agreeToTerms, setAgreeToTerms] = useState(false); // new state variable
    const [forgetPass, setForgetPass] = useState(false); // new state variable
  
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
  
    useEffect(() => {
  
      if (isError) {
        toast.error(message);
      }
      if (isSuccess) {
        if(user && user.status===400){
        toast.error(user.message);
      }
        else if(user)
        toast.success("Welcome " + user.UserName + "!");
      else
        toast.error("Something went wrong");
      }
  
      dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);
    
    const handlePasswordStrength = (event) => {
        const password = event.target.value;
        const strongRegex = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        );
        const mediumRegex = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
        );
        if (strongRegex.test(password)) {
          setPasswordStrength("strong");
        } else if (mediumRegex.test(password)) {
          setPasswordStrength("medium");
        } else {
          setPasswordStrength("weak");
        }
      };
    
      const handleConfirmPassword = (event) => {
        const confirmPassword = event.target.value;
        setValidConfirmPassword(confirmPassword === Password);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!UserName || !Address || !Email || !Password || !mobNo ) {
            toast.error('All fields must be filled');
            return;
          }
          if (!agreeToTerms) {
            toast.error('Please agree to our terms!');
            return;
          }

          if (isNaN(mobNo)) {
            toast.error('Mobile number must be a number');
            return;
          }

        if (Password !== confirmPassword) {
          toast.error('Passwords do not match')
          console.log('Passwords do not match')
        }
        else {
          if (passwordStrength !== "strong") {
            toast.error("Password should be strong");
            console.log('passwordStrength:',passwordStrength);
            return;
          }
          if (!agreeToTerms) {
            toast.error("Please agree to terms and conditions");
            console.log('agreeToTerms:',agreeToTerms);
            return;
          }
          if (mobNo.length !== 10) {
            toast.error("Mobile number should be 10 digits long");
            console.log('Mobile no 10 digit?')
            return;
          }
          
          const formData = {
            UserName: UserName,
            Email: Email,
            MobNo: mobNo,
            Password: Password,
            Address: Address,
            isVendor: true,
          };
          dispatch(register(formData));
    
    
        }
      };
  
      
    const handleLogin = (e) => {
        e.preventDefault()
    
        if (!Email || !Password) {
            toast.error('All fields must be filled');
            return;
          }

          if (!agreeToTerms) {
            toast.error('Please agree to our terms!');
            return;
          }
        const userData = {
          Email,
          Password,
          isVendor:true,
        }
    
        dispatch(login(userData))
      }


  return (
    <div className='vendor-popup'>

        <form onSubmit ={vendorState==='Login'?handleLogin:handleSubmit} className="vendor-popup-container">
            <div className="vendor-popup-title">
                <h2>{vendorState}</h2>
                <img onClick={()=>setShowVendor(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className="vendor-popup-inputs">
                {vendorState==="Login"
                ?<></>:
                <>
                <input type='text' placeholder='Your Name' required value={UserName} onChange={(event)=>{setUserName(event.target.value)}}/>
                <input type="number" placeholder='Phone Number' required value={mobNo} onChange={(event)=>{setMobNo(event.target.value)}} />
                <input type="text" placeholder='Address' required value={Address} onChange={(event)=>setAddress(event.target.value)}/>
                </>}
                <input type="email" placeholder='Email Address' required  value={Email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder='Password' required value={Password} onChange={(event)=>{setPassword(event.target.value)
            handlePasswordStrength(event)} }/>
               {vendorState==='Sign Up' && <input
                  
                          placeholder="Confirm your password"
                          type="password"
                          // type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          id="confirm-password"
                          value={confirmPassword}
                          onChange={(event) => {
                            setConfrirmPassword(event.target.value);
                            handleConfirmPassword(event);
                          }}
                          required
                        />}
                        {!validConfirmPassword && (
                          <p className="password-strength weak">Passwords do not match</p>
                        )}
            </div>
            <button onClick={vendorState==='Sign Up'?handleSubmit:handleLogin}>{vendorState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="vendor-popup-condition">
            <input
                        type="checkbox"
                        name="agreeToTerms"
                        id="agree-to-terms"
                        checked={agreeToTerms}
                        onChange={() => setAgreeToTerms(!agreeToTerms)} // toggle the checkbox state
                        required
                      />
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
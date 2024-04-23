import React, { useState,useEffect } from 'react'
import './FarmerPopup.css'
import { assets } from '../../assets/assets'
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { register, reset, login } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

const FarmerPopup = ({ setShowFarmer }) => {

    const [farmerState, setFarmerState] = useState("Login");
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
            if (user && user.status === 400) {
                toast.error(user.message);
            }
            else if (user)
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
            console.log(Password);
        }
        else {
            if (passwordStrength !== "strong") {
                toast.error("Password should be strong");
                console.log(passwordStrength);
                return;
            }
            if (!agreeToTerms) {
                toast.error("Please agree to terms and conditions");
                console.log('agree')
                return;
            }
            if (mobNo.length !== 10) {
                toast.error("Mobile number should be 10 digits long");
                console.log('mob');
                return;
            }

            const formData = {
                UserName: UserName,
                Email: Email,
                MobNo: mobNo,
                Password: Password,
                Address: Address,
                isVendor: false,
            };
            // console.log(UserName,Email,mobNo,Password,Address);
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
            isVendor: false,
        }

        dispatch(login(userData))
    }

    return (
        <div className='farmer-popup'>
            <form onSubmit={farmerState === 'Sign Up' ? handleSubmit : handleLogin} className="farmer-popup-container">
                <div className="farmer-popup-title">
                    <h2>{farmerState}</h2>
                    <img onClick={() => setShowFarmer(false)} src={assets.cross_icon} alt="" srcset="" />
                </div>
                <div className="farmer-popup-inputs">
                    {farmerState === "Login"
                        ? <></>
                        : <>
                            <input type='text' placeholder='Your Name' required value={UserName} onChange={(event) => setUserName(event.target.value)}
                            />
                            <input type="number" placeholder='Phone Number' required onChange={(event) => setMobNo(event.target.value)}
                                value={mobNo}
                            />
                            <input type="text" placeholder='Address' required onChange={(event) => setAddress(event.target.value)}
                                value={Address} />
                        </>}

                    <input type="email" placeholder='Email Address' required onChange={(event) => setEmail(event.target.value)}
                        value={Email} />
                    <input type="password" placeholder='Password' required onChange={(event) => {setPassword(event.target.value)
                    handlePasswordStrength(event);}}
                        value={Password} />
                    
                 
                   { farmerState==='Sign Up'  &&<input type="password" placeholder=' Confirm Password' required onChange={(event) => {setConfrirmPassword(event.target.value);
                     handleConfirmPassword(event);
                    
                    }}
                        value={confirmPassword} />}
                            {!validConfirmPassword && (
                          <p className="password-strength weak">Passwords do not match</p>
                        )}
                </div>
                <button onClick={farmerState === 'Sign Up' ? handleSubmit : handleLogin}>{farmerState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="farmer-popup-condition">
                    <input type="checkbox"     name="agreeToTerms"
                        id="agree-to-terms"
                        checked={agreeToTerms}
                        onChange={() => setAgreeToTerms(!agreeToTerms)} // toggle the checkbox state
                        required/>
                    <p>By continuing, I agree to the terms of use & privacy poilcy.</p>
                </div>
                {
                    farmerState === "Login"
                        ? <p>Create a new Account? <span onClick={() => setFarmerState("Sign Up")}>Click Here</span></p>
                        : <p>Already Have an Account? <span onClick={() => setFarmerState("Login")}>Login Here</span></p>
                }
            </form>
        </div>
    )
}

export default FarmerPopup
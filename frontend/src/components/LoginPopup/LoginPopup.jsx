import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset, login } from '../../features/auth/authSlice';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const [UserName, setUserName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfrirmPassword] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const dispatch = useDispatch();

    const handlePasswordStrength = (event) => {
        const password = event.target.value;
        const strongRegex = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        );
        if (strongRegex.test(password)) {
            setPasswordStrength("strong");
        } else {
            setPasswordStrength("weak");
        }
    };

    const handleConfirmPassword = (event) => {
        const confirmPassword = event.target.value;
        setValidConfirmPassword(confirmPassword === Password);
    };

    const handleSubmit = async (e) => {
        console.log(Email,)
        e.preventDefault();
        if (Password !== confirmPassword) {
            toast.error('Passwords do not match')
        }
        else {
            if (passwordStrength !== "strong") {
                toast.error("Password should be strong");
                return;
            }
            if (!agreeToTerms) {
                toast.error("Please agree to terms and conditions");
                return;
            }
            const formData = {
                UserName: UserName,
                Email: Email,
                Password: Password,
            };
            dispatch(register(formData));
        }
    };

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(Email,Password);
        const userData = {
            Email,
            Password,
            isVendor:false,
        }

        dispatch(login(userData))
    }

    return (
        <div className='login-pop'>
            <form className="login-popup-container" onSubmit={()=>{handleLogin}}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" srcset="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input type="text" placeholder='Your Name' required onChange={(event) => setUserName(event.target.value)} />}
                    <input type="email" placeholder='Your Email' required onChange={(event) => setEmail(event.target.value)} />
                    <input type="password" placeholder='Password' required onChange={(event) => setPassword(event.target.value)} />
                    {currState !== "Login" && <input type="password" placeholder='Confirm Password' required onChange={handleConfirmPassword} />}
                </div>
                <button onClick={(e)=>{handleLogin}}>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required onChange={() => setAgreeToTerms(!agreeToTerms)} />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => {
                        setCurrState("Sign Up");
                
                }}>Click Here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup;
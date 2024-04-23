import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo1} alt="" srcset="" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni incidunt modi ratione voluptates suscipit laudantium esse fuga commodi minima at dolorem tempore, animi illo voluptatem dolor sequi voluptas quos. Ullam!</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" srcset="" />
                    <img src={assets.twitter_icon} alt="" srcset="" />
                    <img src={assets.linkedin_icon} alt="" srcset="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-1234567890</li>
                    <li>contact@temp.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 TBI - All Right Reserved.</p>
    </div>
  )
}

export default Footer
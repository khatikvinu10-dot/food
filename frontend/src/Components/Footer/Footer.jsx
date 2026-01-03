import React from 'react';
import './Footer.css'
import { assets } from '../../assets/assets';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-contant">
        <div className="footer-contain-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, culpa alias consequuntur mollitia nam officiis iure sequi illo porro dolor, corporis sed animi ab recusandae?</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-contain-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>privacy policy</li>
            </ul>
        </div>
        <div className="footer-contain-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-7073-538-821</li>
                <li>kahtikvinu10@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">copyright 2025 @ Tomato - All Right Reserved.</p>
    </div>
  );
}

export default Footer;

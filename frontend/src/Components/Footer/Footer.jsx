import React from 'react';
import './Footer.css'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = ({ url }) => {

  return (
    <div className='footer' id='footer'>
      <div className="footer-contant">
        <div className="footer-contain-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, culpa alias consequuntur mollitia nam officiis iure sequi illo porro dolor, corporis sed animi ab recusandae?</p>
          <div className="footer-social-icons">
           <Link to="facebook"> <img src={assets.facebook_icon} alt="" /></Link> 
           <Link to="twitter"><img src={assets.twitter_icon} alt="" /></Link> 
            <Link to="linkedin"><img src={assets.linkedin_icon} alt="" /></Link>
          </div>
        </div>
        <div className="footer-contain-center">
          <h2>COMPANY</h2>
          <ul>

            <li><Link to="/">Home</Link></li>
            <li><Link to="/About us">About us</Link></li>
            <li><Link to="/Delivery">Delivery</Link></li>
            <li><Link to="/privacy policy">privacy policy</Link></li>
          </ul>
        </div>
        <div className="footer-contain-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li><Link to="Contact Us">+91-7073-538-821</Link></li>
            <li><Link to="Contact Us">kahtikvinu10@gmail.com</Link></li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">copyright 2025 @ Tomato - All Right Reserved.</p>
    </div>
  );
}

export default Footer;

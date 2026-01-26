import React from 'react';
import './AppDownload.css'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Expreience Download <br /> Tomato App</p>
      <div className="app-download-platfroms">
       <Link to="playStore"><img src={assets.play_store} alt="" /></Link>
      <Link to="appleStore"><img src={assets.app_store} alt="" /></Link>
      </div>
    </div>
  );
}

export default AppDownload;

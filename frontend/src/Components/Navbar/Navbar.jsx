import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets, food_list } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';



const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("Home");

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }
    const [search, setSearch] = useState("");



    const handleSearch = () => {
        if (!search.trim()) return;

        navigate(`/Search?q=${encodeURIComponent(search)}`);
    };



    return (
        <div className="navbar">
            <Link to='/'><img src={assets.logo} alt="logo" className="logo" /></Link>

            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("Mobile App")} className={menu === "Mobile App" ? "active" : ""}>Mobile App</a>
                <a href='#footer' onClick={() => setMenu("Contact Us")} className={menu === "Contact Us" ? "active" : ""}>Contact Us</a>
            </ul>

            <div className="navbar-right">
                <div className="search-box">
                    <input type="text" placeholder="Search food..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { handleSearch(search.trim()); } }} />

                    <button onClick={() => handleSearch(search.trim())} className="search-btn">
                        <img src={assets.search_icon} alt="search" />
                    </button>
                </div>


                <div className="navbar-search-icon">
                    <Link to='/cart'> <img src={assets.basket_icon} alt="basket" className="icon" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>

                    </div>}
            </div>
        </div>
    );
};

export default Navbar;

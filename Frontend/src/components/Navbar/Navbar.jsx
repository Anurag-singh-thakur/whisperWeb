import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.jpg'
import {FaTimes , FaBars} from 'react-icons/fa';
const Navbar = () => {

    const [isOpen , setIsOpen] = useState(false) ;
    const navigate = useNavigate();
    const toggleMenu = ()=>{
        setIsOpen(!isOpen);
    }

  return (
    <nav className="navbar">
      <div className="logo">
        <img onClick={ ()=>{navigate("/")}} src={logo} alt="Logo" />
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        {
            isOpen ? <FaTimes /> :<FaBars/>
        }
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

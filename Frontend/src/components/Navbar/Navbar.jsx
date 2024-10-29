import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg'
import { FaTimes, FaBars, FaHome, FaComments, FaSignInAlt, FaUserPlus, FaUser } from 'react-icons/fa';
const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <img onClick={() => { navigate("/") }} src={logo} alt="Logo" />
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        {
          isOpen ? <FaTimes /> : <FaBars />
        }
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li className='wrapper'>
          <FaHome />
          <Link to="/">Home</Link>
        </li>
        <li className='wrapper'>
          <FaComments />
          <Link to="/chat">Chat</Link>
        </li>
        <li className='wrapper'>
          <FaUser />
          <Link to="/profile">Profile</Link>
        </li>
        <li className='wrapper'>
          <FaSignInAlt />
          <Link to="/login">Login</Link>
        </li>
        <li className='wrapper'>
          <FaUserPlus />
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

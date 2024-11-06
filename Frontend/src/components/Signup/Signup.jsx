import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!'); // Use toast for error
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password
      });
      console.log('Response data:', response.data);

      if (response.data.success) {
        toast.success('Signup successful!'); // Use toast for success
        navigate('/login');
      } else {
        toast.error('Signup failed!'); // Use toast for error
        console.log('Signup failed:', response.data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred. Please try again.'); // Use toast for error
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2>Signup</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <div className="signup-input-group">
            <FaUser className="signup-icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="signup-input-group">
            <FaEnvelope className="signup-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="signup-input-group">
            <FaLock className="signup-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="signup-input-group">
            <FaLock className="signup-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-cta-button">Signup</button>
        </form>
        <p className="signup-login-link">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Signup;
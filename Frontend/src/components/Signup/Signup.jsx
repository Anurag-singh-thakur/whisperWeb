import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Signing up with:', email, password);
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2>Signup</h2>
        <form onSubmit={handleSignup} className="signup-form">
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

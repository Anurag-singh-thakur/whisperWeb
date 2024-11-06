import React, { useState } from 'react';
import './LoginPage.css'
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = response.data;
      // Store the token and user ID in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id); // Store user ID

      // Redirect to the profile or home page
      window.location.href = '/profile'; // Adjust the redirect as needed
      toast.success('Login successful!'); // Use toast for success
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.'); // Use toast for error
    }
  };

  
    return (
      <div className="auth-container"> {/* Change this to match your CSS */}
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
              <div className="input-group">
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                  />
              </div>
              <div className="input-group">
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                  />
              </div>
              <button type="submit" className="cta-button">Login</button>
          </form>
      </div>
  
  );
};

export default LoginPage;
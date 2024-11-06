import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [disabledUsers, setDisabledUsers] = useState(new Set());
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/users');
        const filteredUsers = response.data.filter(user => user._id !== userId);
        setUsers(filteredUsers);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [userId]);

  const handleConnect = async (connectId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/connect', 
        { connectId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Connection request sent!');
      setDisabledUsers(prev => new Set(prev).add(connectId));
    } catch (error) {
      console.error('Error sending connection request:', error);
      alert('Failed to send connection request.');
    }
  };

  return (
    <div className="users-page">
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="user-item">
            {user.profilePicture && (
              <img src={user.profilePicture} alt={`${user.username}'s profile`} className="profile-pic" />
            )}
            <span>{user.username}</span>
            <button 
              onClick={() => handleConnect(user._id)} 
              disabled={disabledUsers.has(user._id)}
            >
              {disabledUsers.has(user._id) ? 'Request Sent' : 'Connect'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;

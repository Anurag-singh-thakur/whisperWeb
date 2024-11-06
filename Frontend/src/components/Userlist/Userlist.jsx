import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(''); // Assuming user ID is stored in some state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const sendFriendRequest = async (connectId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/connect', {
        userId,
        connectId,
      });
      if (response.data.success) {
        alert('Friend request sent!');
      } else {
        alert('Failed to send friend request.');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div className="user-list">
      <h2>Active Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.username}
            <button onClick={() => sendFriendRequest(user._id)} className="connect-button">Connect</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

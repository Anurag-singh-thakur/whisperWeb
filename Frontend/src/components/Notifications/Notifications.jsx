import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheck, FaTimesCircle } from 'react-icons/fa'; // Import icons
import './Notifications.css';
import axios from 'axios';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); // Retrieve the token

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(`http://localhost:5000/api/auth/notifications/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the headers
                    }
                });
                console.log('Fetched Notifications:', response.data.notifications); // Log notifications
                setNotifications(response.data.notifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [userId, token]);

    const handleResponse = async (connectionRequestId, action) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.post(`http://localhost:5000/api/auth/connection-request/${connectionRequestId}`, 
                { action },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert(`Connection request ${action}ed!`);
            // Optionally, refresh notifications after response
            // fetchNotifications();
        } catch (error) {
            console.error('Error responding to connection request:', error);
        }
    };

    const handleClose = (notificationId) => {
        setNotifications((prev) => prev.filter(notification => notification._id !== notificationId)); // Remove the specific notification
    };

    return (
        <div className="notifications">
            {notifications.map((notification) => (
                <div className="notification" key={notification._id}>
                    <button className="close-btn" onClick={() => handleClose(notification._id)}>
                        <FaTimes />
                    </button>
                    <p>{notification.message}</p>
                    <div className="notification-actions">
                        <button className="accept" onClick={() => handleResponse(notification.connectionRequestId, 'accept')}>
                            <FaCheck />
                        </button>
                        <button className="reject" onClick={() => handleResponse(notification.connectionRequestId, 'reject')}>
                            <FaTimesCircle />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notification;
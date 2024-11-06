import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for notifications
import './Profile.css'; // Import the CSS file

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
  const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

  // Function to fetch user profile
  const fetchUserProfile = async () => {
    console.log('Fetching profile for user ID:', userId); // Log the user ID
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      setUser(response.data);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setProfilePicture(response.data.profilePicture); // Assuming the backend returns the profile picture URL
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to fetch user profile.'); // Notify user of the error
    }
  };

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on component mount
  }, [userId, token]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      await axios.put(`http://localhost:5000/api/auth/profile/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      toast.success('Profile updated successfully!'); // Notify user of success
      setIsModalOpen(false); // Close the modal
      fetchUserProfile(); // Refetch the user profile to get updated data
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.'); // Notify user of the error
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        toast.success('Account deleted successfully!'); // Notify user of success
        window.location.href = '/login'; // Redirect to login page
      } catch (error) {
        console.error('Error deleting account:', error);
        toast.error('Failed to delete account.'); // Notify user of the error
      }
    }
  };

  return (
    <div className="profile-container">
      {user ? (
        <>
          <div className="profile-header">
            <h2>{user.username}'s Profile</h2>
            {user.profilePicture && <img src={user.profilePicture} alt="Profile" className="profile-picture" />}
          </div>
          <div className="profile-info">
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
          </div>
          <div className="profile-buttons">
            <button onClick={() => setIsModalOpen(true)} className="profile-cta-button">Update Profile</button>
            <button onClick={handleDeleteAccount} className="delete-profile">Delete Account</button>
          </div>

          {/* Modal for updating profile */}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                <h2>Update Profile</h2>
                <form onSubmit={handleProfileUpdate}>
                  <div className="profile-input-group">
                    <label>Username:</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="profile-input-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="profile-input-group">
                    <label>Profile Picture:</label>
                    <input
                      type="file"
                      onChange={(e) => setProfilePicture(e.target.files[0])}
                    />
                  </div>
                  <button type="submit" className="profile-cta-button">Save Changes</button>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
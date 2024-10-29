import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaCamera, FaTrashAlt, FaUserFriends } from 'react-icons/fa';
import './Profile.css';
import profile_icon from '../../assets/profile_icon.png';
const Profile = () => {
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [profilePicture, setProfilePicture] = useState(profile_icon);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log('Password changed');
  };

  const handleDeleteProfile = () => {
    console.log('Profile deleted');
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePicture(e.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
      </div>
      <div className="profile-picture-section">
        <img src={profilePicture} alt="Profile" className="profile-picture" />
        <div className="profile-change-picture">
          <label htmlFor="file-input">
            <FaCamera className="profile-icon-camera" />
          </label>
          <input id="file-input" type="file" onChange={handleProfilePictureChange} />
        </div>
      </div>
      <div className="profile-stats">
        <div className="profile-stat">
          <FaUserFriends className="profile-stat-icon" />
          <div>
            <p className="profile-stat-count">{followers}</p>
            <p className="profile-stat-label">Followers</p>
          </div>
        </div>
        <div className="profile-stat">
          <FaUserFriends className="profile-stat-icon" />
          <div>
            <p className="profile-stat-count">{following}</p>
            <p className="profile-stat-label">Following</p>
          </div>
        </div>
      </div>
      <div className="profile-details-section">
        <div className="profile-input-group">
          <FaUser className="profile-icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="profile-input-group">
          <FaEnvelope className="profile-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={handleChangePassword} className="profile-cta-button change-password">
          <FaLock className="profile-icon-button" /> Change Password
        </button>
        <button onClick={handleDeleteProfile} className="profile-cta-button delete-profile">
          <FaTrashAlt className="profile-icon-button" /> Delete Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import "../../styles/account.css";
import { FaCamera, FaLock, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    if (!username.trim() || !email.trim()) {
      setMessage("Please fill all fields.");
      return;
    }

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const currentEmail = localStorage.getItem("email");

    const updatedAccounts = accounts.map((acc) => {
      if (acc.email === currentEmail) {
        return { ...acc, username, email };
      }
      return acc;
    });

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    setMessage("Account information updated successfully");
  };

  // رفع صورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("profileImage", reader.result);
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    localStorage.removeItem("profileImage");
    setProfileImage("");
  };

  return (
    <div className="account-container">
      <h2>My Account</h2>

      {message && <p className="message">{message}</p>}

      <div className="profile-section">
        <div className="profile-pic-wrapper">
  {profileImage ? (
    <div className="profile-image-container">
      <img src={profileImage} alt="Profile" className="profile-image" />
      
      <button
        className="delete-image-btn"
        title="Remove photo"
        onClick={handleRemoveImage}
      >
        <FaTrash />
      </button>

      <label htmlFor="profile-upload" className="edit-icon" title="Change photo">
        <FaCamera />
      </label>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  ) : (
    <div className="profile-placeholder">
      {username.charAt(0).toUpperCase()}
      <label htmlFor="profile-upload" className="edit-icon" title="Change photo">
        <FaCamera />
      </label>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  )}
</div>

        <p className="username-display">{username}</p>
      </div>

      <div className="account-form">
        <h3>Update Info</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button onClick={handleSave}>Save Changes</button>
      </div>

      <div className="password-section">
        <div className="password-link" onClick={() => navigate("/change-password")}>
          <FaLock className="password-icon" />
          <span>Password Settings</span>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

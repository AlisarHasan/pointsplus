import React, { useState } from "react";
import "../../styles/changePassword.css";
import { useNavigate } from "react-router-dom";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match!");
      return;
    }

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const currentEmail = localStorage.getItem("email");
    const accountIndex = accounts.findIndex(acc => acc.email === currentEmail);

    if (accountIndex === -1 || accounts[accountIndex].password !== currentPassword) {
      setMessage("Old password is incorrect.");
      return;
    }

    accounts[accountIndex].password = newPassword;
    localStorage.setItem("accounts", JSON.stringify(accounts));
    setMessage("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="password-page-container">
      <div className="password-form-card">
        <h2>Change Password</h2>

        {message && <p className="message">{message}</p>}

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
<div className="button-group">
  <button onClick={handleChangePassword}>Update Password</button>
  <button 
    className="cancel-btn" 
    onClick={() => navigate("/account")}
  >
    Cancel
  </button>
</div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;

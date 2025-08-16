import React from "react";
import "../../styles/confirmdelete.css";

const ConfirmPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="close-btn" onClick={onCancel} title="close">✖</button>
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          <button className="confirm-btn" onClick={onConfirm}>yes</button>
          <button className="cancel-btn" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
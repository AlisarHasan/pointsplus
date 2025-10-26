import React from "react";
import "../../styles/notification.css";

export default function Notification({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="notification">
      <p>{message}</p>
      <button onClick={onClose}>close</button>
    </div>
  );
}
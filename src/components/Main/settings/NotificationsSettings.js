import React, { useEffect, useState } from "react";
import "../../../styles/notification.css"

const NotificationsSettings = () => {
  const [enabled, setEnabled] = useState(
    localStorage.getItem("notificationsEnabled") === "true"
  );
  const [notificationType, setNotificationType] = useState(
    localStorage.getItem("notificationType") || "push"
  );

  useEffect(() => {
    localStorage.setItem("notificationsEnabled", enabled.toString());
    localStorage.setItem("notificationType", notificationType);
  }, [enabled, notificationType]);

  const handleToggle = () => {
    if (!enabled) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setEnabled(true);
        } else {
          alert("Notification permission denied from browser");
        }
      });
    } else {
      setEnabled(false);
    }
  };

  return (
    <div className="n-settings">
      <h2>Notification Settings </h2>

      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={enabled} onChange={handleToggle} />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">
          {enabled ? "Activited" : "Not Activited"}
        </span>
      </div>

      <div className="reminder-section">
        <label className="reminder-label">Reminder Type</label>
        <select
          value={notificationType}
          onChange={(e) => setNotificationType(e.target.value)}
          disabled={!enabled}
        >
          <option value="push">Instant notification</option>
          <option value="email">Email</option>
          <option value="inApp">In-app only</option>
        </select>
      </div>
    </div>
  );
};

export default NotificationsSettings;
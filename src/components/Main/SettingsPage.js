import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/settings.css";


const SettingsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="settings-container">
            <ul className="settings-list" >
                <li><button onClick={() => navigate("/notifications-settings")}>Notificaions</button></li>
                <li><button>Themes</button></li>
                <li><button>Language</button></li>
                <li><button onClick={() => navigate("/general-settings")} >General Settings</button></li>
                <li><button>Share With Friends</button></li>
                <li><button onClick={() => navigate("/feedback")}>Feedback & Notes</button></li>
            </ul>
        </div>

    );

}
export default SettingsPage;
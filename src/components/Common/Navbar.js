import React, { useState, useEffect, useRef } from "react";
import { FaTasks, FaCoins, FaCog, FaMeteor } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

const Navbar = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const username = localStorage.getItem("username") || "U";
  const firstLetter = username.charAt(0).toUpperCase();
  const menuRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (page) => currentPath.includes(page);


  return (
    <nav className="navbar" ref={menuRef}>
      <div className="nav-section">
        <div
          className="user-icon"
          onClick={() => setMenuOpen(!menuOpen)}
          title="My Account"
        >
          {firstLetter}
        </div>
        {menuOpen && (
          <div className="user-menu">
            <button
              onClick={() => {
                navigate("/account");
                setMenuOpen(false);
              }}
            >
              Privacy
            </button>
            <button
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        )}
      </div>

      <div className="nav-items">
        <button
          className={`nav-btn ${isActive("tasks") && !isActive("tasks-list") ? "active" : ""}`}
          onClick={() => {
            navigate("/tasks");
          }}
          title="Tasks Today"
        >
          <FaTasks />
          <p className="label">Today's Tasks</p>
        </button>

        <button
          className={`nav-btn ${isActive("tasks-list") ? "active" : ""}`}
          onClick={() => {
            navigate("/tasks-list");
          }}
          title="All Tasks"
        >
          <FaMeteor />
          <p className="label">All Tasks</p>
        </button>

        <button
          className={`nav-btn ${isActive("points") ? "active" : ""}`}
          onClick={() => {
            navigate("/points");
          }}
          title="My Points"
          
        >
          <FaCoins />
          <p className="label">My Points</p>
        </button>

          <button
            className={`nav-btn ${isActive("settings") ? "active" : ""}`}
            onClick={() => {
            navigate("/settings-page");
          }} 
                     title="Settings"
            style={{ justifyContent: "center" }}
          >
            <FaCog />
            <p className="label">Settings</p>
          </button>

            
      </div>
    </nav>
  );
};

export default Navbar;
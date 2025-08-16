import React, { useState } from "react";
import Navbar from "../Common/Navbar";
import "../../styles/main.css";
import TasksToday from "./TasksToday.js";
import Points from "../Main/Points";
import TasksList from "./TasksList";
import AddTask from "./AddTask";
import { Route, Routes, useNavigate } from "react-router-dom";
import EditTask from "./EditTask";
import SettingsPage from "./SettingsPage";
import NotificationsSettings from "./settings/NotificationsSettings";
import GeneralSettings from "./settings/GeneralSettings";
import Feedback from "./settings/Feedback";


const MainPage = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState("tasks");
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };



  return (
    <div className="main-page" style={{ display: "flex" }}>  {/* لتقسيم الشاشة الى قسمسن  */}
      <Navbar
        onLogout={onLogout}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <main 
        style={{
          flexGrow: 1,//حتى يأخذ مساحة الشاشة بعد النافبار
          padding: "1.5rem",
          overflow: "auto",
          height: "100%",
          boxSizing: "border-box",
          WebkitOverflowScrolling: "touch",
          touchAction:"pan-y"
        }}
      >
        <Routes>
  <Route path="/tasks" element={<TasksToday />} />
  <Route path="/add-task" element={<AddTask />} />
  <Route path="/tasks-list" element={<TasksList />} /> 
  <Route path="/edit/:id" element={<EditTask />} />
  <Route path="/points" element={<Points />} />
  <Route path="/settings-page" element={<SettingsPage />} />
  <Route path="/notifications-settings" element={<NotificationsSettings />} />
  <Route path="/general-settings" element={<GeneralSettings />} />
  <Route path="/feedback" element={<Feedback />} />
  <Route path="/account" />
</Routes>
        </main>
    </div>
  );
};

export default MainPage;
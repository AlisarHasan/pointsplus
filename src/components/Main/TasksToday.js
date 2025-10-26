
import React, { useEffect, useState, useCallback } from "react";
import { FaBell, FaPlus } from "react-icons/fa";
import "../../styles/tasksToday.css";
import { useNavigate } from "react-router-dom";

const TasksToday = () => {
  const [filteredTasks, setFilteredTasks] = useState({
    Morning: [],
    Afternoon: [],
    Evening: [],
    "any time": [],
  });

  const navigate = useNavigate();

  const today = new Date();
  const todayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const todayDateStr = today.toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().slice(0, 5);

 const showNotification = useCallback((title, note) => {
  const isEnabled = localStorage.getItem("notificationsEnabled") === "true";
  if (!isEnabled) return;

  if (Notification.permission === "granted") {
    new Notification(title, {
      body: note || "Let's go!",
      icon: "/notification-icon.png",
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, {
          body: note || "Let's go!",
          icon: "/notification-icon.png",
        });
      }
    });
  }
}, []);

  const loadTasks = useCallback(() => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");

    const matched = saved.filter((task) => {
      const matchDay = task.days.includes(todayName);
      const matchDateRange =
        (!task.startDate || todayDateStr >= task.startDate) &&
        (!task.endDate || todayDateStr <= task.endDate);
      return matchDay && matchDateRange;
    });

    const grouped = {
      Morning: [],
      Afternoon: [],
      Evening: [],
      "any time": [],
    };

    matched.forEach((task) => {
      const time = task.time || "any time";
      if (!task.doneDates) task.doneDates = {};
      grouped[time] = [...(grouped[time] || []), task];

      if (task.reminder && task.reminderTime === currentTime) {
        showNotification(task.title, task.reminderNote);
      }
    });

    setFilteredTasks(grouped);
  }, [todayName, todayDateStr, currentTime, showNotification]);
useEffect(() => {
  loadTasks(); // تشغيل أولي

  const interval = setInterval(() => {
    loadTasks();
  }, 60000); // كل 60 ثانية

  return () => clearInterval(interval);
}, [loadTasks]);


  const handleToggleDone = (taskId) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const updated = allTasks.map((task) => {
      if (task.id === taskId) {
        if (!task.doneDates) task.doneDates = {};
        const current = task.doneDates[todayDateStr] || false;
        task.doneDates[todayDateStr] = !current;
      }
      return task;
    });

    localStorage.setItem("tasks", JSON.stringify(updated));

    setFilteredTasks((prev) => {
      const newGrouped = { ...prev };
      for (const time in newGrouped) {
        newGrouped[time] = newGrouped[time].map((task) =>
          task.id === taskId
            ? {
                ...task,
                doneDates: {
                  ...task.doneDates,
                  [todayDateStr]: !task.doneDates?.[todayDateStr],
                },
              }
            : task
        );
      }
      return newGrouped;
    });
  };

  const timeOrder = ["Morning", "Afternoon", "Evening", "any time"];

  return (
    <div className="tasks-today-container">
      <div className="header">
        <h2>Your Tasks Today</h2>
        <button className="add-btn" onClick={() => navigate("/add-task")}>
          <FaPlus />
        </button>
      </div>

      <div className="mytasks">
        {timeOrder.map((time) =>
          filteredTasks[time].length > 0 ? (
            <div key={time} className="time-section">
              <button type="" className="time-title" >{time}</button>
              <ul className="task-list">
                {filteredTasks[time].map((task) => (
                  <li className="task-item" key={task.id}>
                    <div className="task-lift">
                      {task.reminder && (
                        <span className="task-time">
                          <FaBell color="#ebeb04ff"/>
                        </span>
                      )}
                    </div>
                    <div className="task-title">{task.title}</div>
                    <div className="task-right">
                      <input
                        type="checkbox"
                        checked={
                          task.doneDates &&
                          task.doneDates[todayDateStr] === true
                        }
                        onChange={() => handleToggleDone(task.id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        )}

        {Object.values(filteredTasks).flat().length === 0 && (
          <p className="no-tasks">No tasks for today..</p>
        )}
      </div>
    </div>
    
  );
};

export default TasksToday;  
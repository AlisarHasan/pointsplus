import React, { useState } from "react";
import "../../styles/addtask.css";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
 const [task, setTask] = useState({
  title: "",
  days: [],
  startDate: "",
  endDate: "",
  time: "any time",
  reminder: false,
  reminderTime: "",
  reminderNote: "",
  doneDates: {} 
});

  const navigate = useNavigate();

  const toggleDay = (day) => {
    setTask((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTask = { ...task, id: Date.now() };
    saved.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(saved));
    navigate("/tasks");
  };

  return (
    <div className="add-task-form">
      <h2 className="header">Add Task</h2>
      <input
        type="text"
        placeholder="task title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <p className="days">Days:</p>
      <div className="days-picker">
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
          <button
            key={day}
            className={task.days.includes(day) ? "active" : ""}
            onClick={() => toggleDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <label>From :</label>
      <input
        type="date"
        value={task.startDate}
        onChange={(e) => setTask({ ...task, startDate: e.target.value })}
      />

      <label>To :</label>
      <input
        type="date"
        value={task.endDate}
        onChange={(e) => setTask({ ...task, endDate: e.target.value })}
      />

      <label>Do that :  </label>
      <select
        value={task.time}
        onChange={(e) => setTask({ ...task, time: e.target.value })}
      >
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Evening">Evening</option>
        <option value="any time">any time</option>
      </select>

      <div style={{ margin: " 0" }}>
        <div className="reminder-toggle"> 
          {task.reminder ? (
            <MdToggleOn
              size={40}
              color="#48f6e5"
              style={{ cursor: "pointer" }}
              onClick={() => setTask({ ...task, reminder: false })}
            />
          ) : (
            <MdToggleOff
              size={40}
              color="#ccc"
              style={{ cursor: "pointer" }}
              onClick={() => setTask({ ...task, reminder: true })}
            />
          )}
        </div>

        {task.reminder && (
          <div className="reminder-section">
            <input
              type="time"
              value={task.reminderTime}
              onChange={(e) =>
                setTask({ ...task, reminderTime: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Encouraging Note"
              value={task.reminderNote}
              onChange={(e) =>
                setTask({ ...task, reminderNote: e.target.value })
              }
            />
          </div>
        )}
      </div>

      <button className="save-btn" onClick={handleSave}>Save</button>
    </div>
  );
};

export default AddTask;
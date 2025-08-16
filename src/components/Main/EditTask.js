import React, { useState, useEffect } from "react";
import "../../styles/addtask.css";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    const current = saved.find((t) => t.id === parseInt(id)); 
    if (current) {
      setTask(current);
      setReminder(current.reminder);
    }
  }, [id]);

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    const index = saved.findIndex((t) => t.id === parseInt(id));
    if (index !== -1) {
      saved[index] = task;
      localStorage.setItem("tasks", JSON.stringify(saved));
      navigate("/tasks");
    }
  };

  const toggleDay = (day) => {
    setTask((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  if (!task) return <p>Loading task...</p>;

  return (
    <div className="add-task-form">
      <h2 className="header">Edit Task</h2>

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

      <label>Do that:</label>
      <select
        value={task.time}
        onChange={(e) => setTask({ ...task, time: e.target.value })}
      >
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Evening">Evening</option>
        <option value="any time">any time</option>
      </select>

      <div >
        {reminder ? (
          <MdToggleOn
            size={40}
            color="#48f6e5"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setReminder(false);
              setTask({ ...task, reminder: false });
            }}
          />
        ) : (
          <MdToggleOff
            size={40}
            color="#ccc"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setReminder(true);
              setTask({ ...task, reminder: true });
            }}
          />
        )}

        {reminder && (
          <div className="reminder-section">
            <input
              type="time"
              value={task.reminderTime}
              onChange={(e) =>
                setTask({ ...task, reminderTime: e.target.value })}
            />
            <input
              type="text"
              placeholder="Encouraging Note"
              value={task.reminderNote}
              onChange={(e) =>
                setTask({ ...task, reminderNote: e.target.value })}
            />
          </div>
        )}
      </div>

      <button className="save-btn" onClick={handleSave}>Edit</button>
    </div>
  );
};

export default EditTask;
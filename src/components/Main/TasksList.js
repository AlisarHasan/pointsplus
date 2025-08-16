import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/taskslist.css";
import ConfirmPopup from "../Common/ConfirmDeleteModel";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const TasksList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [showPopup, setShowPopup] = useState(false);
  const [taskToDeleteIndex, setTaskToDeleteIndex] = useState(null);

  const confirmDelete = (index) => {
    setTaskToDeleteIndex(index);
    setShowPopup(true);
  };

  const handleDeleteConfirmed = () => {
    if (taskToDeleteIndex !== null) {
      const updated = [...tasks];
      updated.splice(taskToDeleteIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(updated));
      setTasks(updated);
      setShowPopup(false);
      setTaskToDeleteIndex(null);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
    setTaskToDeleteIndex(null);
  };

  return (
    <div className="tasks-list">
      <h2>All Tasks</h2>
      {tasks.length === 0 ? (
        <p>There are no tasks</p>
       ) : (
        tasks.map((task, index) => (
          <div key={index} className="task-title-card">
            <li>{task.title}</li>
            <div className="task-buttons">
              <button onClick={() => navigate(`/edit/${task.id}`)}><FaPencil size={17} /></button>
              <button className="delete" onClick={() => confirmDelete(index)}><FaTrash size={17} /></button>
            </div>
          </div>
        ))
      )}

      {showPopup && (
        <ConfirmPopup
          message=" Are you sure you want to delete this task ? "
          onConfirm={handleDeleteConfirmed}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default TasksList;
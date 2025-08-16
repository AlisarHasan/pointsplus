import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/points.css";
import { FaCoins } from "react-icons/fa";

const Points = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stats, setStats] = useState({ total: 0, done: 0 });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    const selectedDateStr = selectedDate.toISOString().split("T")[0];
    const selectedDayName = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const filtered = saved.filter((task) => {
      const inDateRange =
        (!task.startDate || selectedDateStr >= task.startDate) &&
        (!task.endDate || selectedDateStr <= task.endDate);
      const isSameDay = task.days.includes(selectedDayName);
      return inDateRange && isSameDay;
    });

    const done = filtered.filter(
      (task) => task.doneDates?.[selectedDateStr]
    ).length;

    setStats({
      total: filtered.length,
      done: done,
    });
  }, [selectedDate]);

  const percentage =
    stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <div className="points-container">
      <h2 className="points-title">Your Progress</h2>
      <div className="points-section">
      <div className="calender-section">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
      />
      </div>

      <div className="cards">
      <div className="stats-card">
        <h2 className="points-today">{stats.done} <FaCoins /></h2>
        <h3>{selectedDate.toDateString()}</h3>
        <p>{stats.done} / {stats.total} tasks completed</p>
        <div className="progress-bar">
          <div
            className="filled"
            style={{ width: `${percentage}%` }}
          >
            {percentage}%
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Points;
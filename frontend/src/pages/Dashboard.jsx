import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function Dashboard() {
  const colleges = JSON.parse(localStorage.getItem("colleges") || "[]");
const deadlines = JSON.parse(localStorage.getItem("deadlines") || "[]");
const achievements = JSON.parse(localStorage.getItem("achievements") || "[]");
const essays = JSON.parse(localStorage.getItem("essays") || "[]");
const applications = JSON.parse(localStorage.getItem("applications") || "[]");
const tests = JSON.parse(localStorage.getItem("tests") || "[]");
  const navigate = useNavigate()
    return (
      <div className="dashboard">
      <h1>Welcome back!</h1>
      <p>Here's an overview of your college applications.</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>My Colleges</h2>
          <p>{colleges.length}</p>
        </div>

        <div className="dashboard-card">
          <h2>Upcoming Deadlines</h2>
          <p>{deadlines.length}</p>
        </div>

        <div className="dashboard-card">
          <h2>Applications</h2>
          <p>{achievements.length}</p>
        </div>
      </div>

      <div className="quick-actions">
  <h2>Quick Actions</h2>

  <div className="action-buttons">
    <button onClick={() => navigate("/colleges")}>Add College</button>
    <button onClick={() => navigate("/achievements")}>Add Achievement</button>
    <button onClick={() => navigate("/deadlines")}>Add Deadline</button>
    <button onClick={() => navigate("/essays")}>Start an Essay</button>
  </div>
</div>

      <div className="dashboard-section">
  <h2>Upcoming Deadlines</h2>

    {deadlines.map((deadline) => 
    (<div className="deadline-item deadline-card" key={deadline.name}>
      <span>{deadline.name}</span>
      <span>{deadline.date}</span>
    </div>)
    )}

    </div>
  </div>
  );
}
  
  export default Dashboard;
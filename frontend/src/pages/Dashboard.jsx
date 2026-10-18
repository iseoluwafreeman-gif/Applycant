import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function Dashboard() {
  const colleges = JSON.parse(localStorage.getItem("colleges") || "[]");
const deadlines = JSON.parse(localStorage.getItem("deadlines") || "[]");
const achievements = JSON.parse(localStorage.getItem("achievements") || "[]");
const essays = JSON.parse(localStorage.getItem("essays") || "[]");
const applications = JSON.parse(localStorage.getItem("applications") || "[]");
const tests = JSON.parse(localStorage.getItem("tests") || "[]");

const notStartedApplications = applications.filter(
  (application) => application.status === "Not Started"
).length;

const inProgressApplications = applications.filter(
  (application) => application.status === "In Progress"
).length;

const submittedApplications = applications.filter(
  (application) => application.status === "Submitted"
).length;

function getDaysUntil(date) {
  const today = new Date();
  const deadlineDate = new Date(date);

  const difference = deadlineDate - today;

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

function getApplicationPriority(application) {
  if (application.status === "Submitted" || 
      application.status === "Accepted" || 
      application.status === "Rejected") {
    return 0;
  }

  const daysUntil = getDaysUntil(application.deadline);

  if (daysUntil < 0) {
    return 100;
  }

  if (daysUntil <= 7) {
    return 90;
  }

  if (daysUntil <= 14) {
    return 70;
  }

  if (daysUntil <= 30) {
    return 50;
  }

  return 30;
}

function getEssayPriority(essay) {
  if (essay.status === "Complete") {
    return 0;
  }

  const matchingApplication = applications.find(
    (application) =>
      application.name.trim().toLowerCase() ===
      essay.college.trim().toLowerCase()
  );

  if (!matchingApplication) {
    return 20;
  }

  const daysUntil = getDaysUntil(matchingApplication.deadline);

  if (daysUntil < 0) {
    return 100;
  }

  if (daysUntil <= 7) {
    return 95;
  }

  if (daysUntil <= 14) {
    return 80;
  }

  if (daysUntil <= 30) {
    return 60;
  }

  return 40;
}



const prioritizedApplications = applications
  .map((application) => ({
    ...application,
    priority: getApplicationPriority(application)
  }))
  .filter((application) => application.priority > 0)
  .sort((a, b) => b.priority - a.priority)
  .slice(0, 3);

  const prioritizedEssays = essays
  .map((essay) => ({
    ...essay,
    priority: getEssayPriority(essay)
  }))
  .filter((essay) => essay.priority > 0)
  .sort((a, b) => b.priority - a.priority)
  .slice(0, 3);

  const priorityTasks = [
    ...prioritizedApplications.map((application) => ({
      name: application.name,
      type: "Application",
      status: application.status,
      deadline: application.deadline,
      priority: application.priority
    })),
  
    ...prioritizedEssays.map((essay) => ({
      name: essay.title,
      type: "Essay",
      status: essay.status,
      deadline: applications.find(
        (application) =>
          application.name.trim().toLowerCase() ===
          essay.college.trim().toLowerCase()
      )?.deadline || "",
      priority: essay.priority
    }))
  ]
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);

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
          <h2>Safeties</h2>
          <p>{colleges.filter((college) => college.category === "Safety").length}</p>
        </div>

        <div className="dashboard-card">
          <h2>Targets</h2>
          <p>{colleges.filter((college) => college.category === "Target").length}</p>
        </div>

        <div className="dashboard-card">
          <h2>Reaches</h2>
          <p>{colleges.filter((college) => college.category === "Reach").length}</p>
        </div>

        <div className="dashboard-card">
          <h2>Applications</h2>
          <p>{applications.length}</p>
        </div>
</div>
<div className="dashboard-section">
  <h2>Application Progress</h2>

  <div className="progress-summary">
    <div>
      <h3>Not Started</h3>
      <p>{notStartedApplications}</p>
    </div>

    <div>
      <h3>In Progress</h3>
      <p>{inProgressApplications}</p>
    </div>

    <div>
      <h3>Submitted</h3>
      <p>{submittedApplications}</p>
    </div>
  </div>
</div>


<div className="dashboard-section">
  <h2>What Should I Work On?</h2>
  <p>Focus on the tasks that need your attention first.</p>

  {priorityTasks.length === 0 ? (
    <p>You're all caught up! 🎉</p>
  ) : (
    priorityTasks.map((task, index) => {
      const daysUntil = task.deadline
        ? getDaysUntil(task.deadline)
        : null;

      return (
        <div
          className="deadline-item deadline-card"
          key={`${task.type}-${task.name}`}
        >
          <div>
            <h3>{index + 1}. {task.name}</h3>
            <p>{task.type} · {task.status}</p>
          </div>

          <div>
            {!task.deadline
              ? "No deadline set"
              : daysUntil < 0
              ? "Overdue"
              : daysUntil === 0
              ? "Due today"
              : daysUntil === 1
              ? "Due tomorrow"
              : `Due in ${daysUntil} days`}
          </div>
        </div>
      );
    })
  )}
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

  {deadlines
    .filter((deadline) => getDaysUntil(deadline.date) >= 0)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((deadline) => {
      const daysUntil = getDaysUntil(deadline.date);

      return (
        <div className="deadline-item deadline-card" key={deadline.name}>
          <div>
            <span>{deadline.name}</span>
            <p>{deadline.type}</p>
          </div>

          <span>
            {daysUntil === 0
              ? "Due today"
              : daysUntil === 1
              ? "Due tomorrow"
              : `Due in ${daysUntil} days`}
          </span>
        </div>
      );
    })}
</div>
  </div>
  );
}
  
  export default Dashboard;
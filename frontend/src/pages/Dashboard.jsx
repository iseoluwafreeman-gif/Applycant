function Dashboard() {
    return (
      <div className="dashboard">
      <h1>Welcome back!</h1>
      <p>Here's an overview of your college applications.</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>My Colleges</h2>
          <p>0</p>
        </div>

        <div className="dashboard-card">
          <h2>Upcoming Deadlines</h2>
          <p>0</p>
        </div>

        <div className="dashboard-card">
          <h2>Applications</h2>
          <p>0</p>
        </div>
      </div>

      <div className="quick-actions">
  <h2>Quick Actions</h2>

  <div className="action-buttons">
    <button>Add College</button>
    <button>Add Achievement</button>
    <button>Add Deadline</button>
    <button>Start an Essay</button>
  </div>
</div>

      <div className="dashboard-section">
  <h2>Upcoming Deadlines</h2>

    <div className="deadline-item">
      <span>Common App</span>
      <span>November 1</span>
    </div>

  <div className="deadline-item">
        <span>Early Action</span>
        <span>November 1</span>
      </div>
    </div>
  </div>
  );
}
  
  export default Dashboard;
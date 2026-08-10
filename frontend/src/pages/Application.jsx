import { useState, useEffect } from "react"


function Application() {

  const [showForm, setShowForm] = useState(false)
  const [collegeName, setCollegeName] = useState("")
  const [applicationType, setApplicationType] = useState("Early Decision");
  const [applicationStatus, setApplicationStatus] = useState("Not Started");
  const [applicationDeadline, setApplicationDeadline] = useState("");

const [applications, setApplications] = useState(() => {
  const savedApplications = localStorage.getItem("applications")
  return savedApplications ? JSON.parse(savedApplications) : []
});

  function addApplication() {
    const newApplication = {
      name: collegeName,
      type: applicationType,
      status: applicationStatus,
      deadline: applicationDeadline
    }

    setApplications([...applications, newApplication])
    setShowForm(false)
    setCollegeName("")
    setApplicationType("Early Decision")
    setApplicationStatus("Not Started")
    setApplicationDeadline("")
    
  }

  function deleteApplication(name) {
    setApplications(applications.filter((application) => application.name !== name))
  }

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications))
  }, [applications])

    return (
      <div className="application">
      <div className="page-header">
        <div>
          <h1>Applications</h1>
          <p>Track the progress of your college applications.</p>
        </div>

        <button className="primary-button" onClick={() => setShowForm(true)}>
          + Add Application
        </button>
      </div>

      {showForm && (
        <div className="application-form">
        <h2>Add an Application</h2>

        <input
          type="text"
          placeholder="College name"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
        />

        <select value={applicationType}
          onChange={(e) => setApplicationType(e.target.value)}>
          <option value="Early Decision">Early Decision</option>
          <option value="Early Action">Early Action</option>
          <option value="Regular Decision">Regular Decision</option>
          <option value="Rolling">Rolling</option>
        </select>

        <select value={applicationStatus}
          onChange={(e) => setApplicationStatus(e.target.value)}>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Submitted">Submitted</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input
          type="date"
          value={applicationDeadline}
          onChange={(e) => setApplicationDeadline(e.target.value)}
        />

        <button className="primary-button" onClick={addApplication}>
          Add Application
        </button>
        </div>
      )
      }
      <div className="application-list">
        {
        applications.map((application) => (
          <div className="application-card">
          <div>
            <h2>{application.name}</h2>
            <p>{application.type}</p>
            <p>Deadline: {application.deadline}</p>
          </div>

          <span>{application.status}</span>

          <button
      className="primary-button"
      onClick={() => deleteApplication(application.name)}
    >
      Delete
    </button>
        </div>
        ))
        }
        
</div>
    </div>
    )
  }
  
  export default Application;
import { useState, useEffect } from "react" 

function Deadlines() {
  const [showForm, setShowForm] = useState(false)
  const [deadlineName, setDeadlineName] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineType, setDeadlineType] = useState("Application");
  const [deadlines, setDeadlines] = useState(() => {
    const savedDeadlines = localStorage.getItem("deadlines")
    return savedDeadlines ? JSON.parse(savedDeadlines) : []
  })

  useEffect(() => {
    localStorage.setItem("deadlines", JSON.stringify(deadlines))
  }, [deadlines])

  function addDeadline() {
    const newDeadline = {
      name: deadlineName,
      date: deadlineDate,
      type: deadlineType
    };

    setDeadlines([...deadlines, newDeadline])
    
    setDeadlineName("");
  setDeadlineDate("");
  setDeadlineType("Application");
  setShowForm(false);
  }

  function deleteDeadline(name) {
    setDeadlines(deadlines.filter((deadline) => deadline.name !== name))
  }

    return (
      <div className="deadlines">
      <div className="page-header">
        <div>
          <h1>Deadlines</h1>
          <p>Keep track of important college application dates.</p>
        </div>

        <button className="primary-button" onClick={() => setShowForm(true)}>
          + Add Deadline
        </button>
      </div>

      {showForm && (
        <div className="college-form">
        <h2>Add a Deadline</h2>
        <input
      type="text"
      placeholder="Deadline name"
      value={deadlineName}
      onChange={(e) => setDeadlineName(e.target.value)}
    />

    <input
      type="date"
      value={deadlineDate}
      onChange={(e) => setDeadlineDate(e.target.value)}
    />

    <select value={deadlineType} onChange={(e) => setDeadlineType(e.target.value)}>
      <option value="Application">Application</option>
      <option value="Scholarship">Scholarship</option>
      <option value="Test">Test</option>
      <option value="Other">Other</option>
    </select>

    <button className="primary-button" onClick={addDeadline}>
      Add Deadline
    </button>

    
  </div>
      )}

      <div className="deadline-list">
      {
      deadlines.map((deadline) => (
        <div className="deadline-card" key={deadline.name}>
        <div>
          <h2>{deadline.name}</h2>
          <p>{deadline.date}</p>
        </div>

        <span>{deadline.type}</span>

        <button onClick={() => deleteDeadline(deadline.name)} className="primary-button"> Delete </button>
        </div>
      ))
      }
  
</div>
    </div>
  );
  }
  
  export default Deadlines;
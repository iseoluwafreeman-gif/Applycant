import { useState, useEffect } from "react"

function Testing() {
  const [showForm, setShowForm] = useState(false);
const [testType, setTestType] = useState("SAT");
const [testScore, setTestScore] = useState("");
const [testDate, setTestDate] = useState("");
const [tests, setTests] = useState(() => {
  const savedTests = localStorage.getItem("tests")

  return savedTests ? JSON.parse(savedTests) : []
});

function addTest() {
  const newTest = {
    type: testType,
    score: testScore,
    date: testDate
  }

  setTests([...tests, newTest])
  setTestType("SAT");
  setTestScore("");
  setTestDate("");
  setShowForm(false);
}

function deleteTest(date, type) {
  setTests(tests.filter((test) => test.date !== date || test.type !== type))
}

useEffect(() => {
  localStorage.setItem("tests", JSON.stringify(tests))
}, [tests])

    return (
      <div className="testing">
      <div className="page-header">
        <div>
          <h1>Testing</h1>
          <p>Track your SAT and ACT scores and test dates.</p>
        </div>

        <button className="primary-button" onClick={() => setShowForm(true)}>
          + Add Test
        </button>
      </div>
      {showForm && (
  <div className="test-form">
    <h2>Add a Test</h2>

    <select
      value={testType}
      onChange={(e) => setTestType(e.target.value)}
    >
      <option value="SAT">SAT</option>
      <option value="ACT">ACT</option>
    </select>

    <input
      type="number"
      placeholder="Score"
      value={testScore}
      onChange={(e) => setTestScore(e.target.value)}
    />

    <input
      type="date"
      value={testDate}
      onChange={(e) => setTestDate(e.target.value)}
    />

    <button className="primary-button" onClick={addTest}>
      Add Test
    </button>
  </div>
)}

      <div className="test-list">
  {tests.map((test) => (<div className="test-card" key={test.date + test.type}>
    <div>
      <h2>{test.type}</h2>
      <p>{test.date}</p>
    </div>

    <strong>{test.score}</strong>

    <button
      className="primary-button"
      onClick={() => deleteTest(test.date, test.type)}
    >
      Delete
    </button>
  </div>))}
  </div>
  </div>)
  

  }
  
  export default Testing;
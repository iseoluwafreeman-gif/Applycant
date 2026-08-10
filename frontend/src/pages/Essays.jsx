import { useState, useEffect } from "react"

function Essays() {

  const [showForm, setShowForm] = useState(false)
  const [essayTitle, setEssayTitle] = useState("");
  const [essayCollege, setEssayCollege] = useState("");
  const [essayStatus, setEssayStatus] = useState("Draft");
  const [essayPrompt, setEssayPrompt] = useState("");

  const [essays, setEssays] = useState(() => {
    const savedEssays = localStorage.getItem("essays")
    return savedEssays ? JSON.parse(savedEssays) : []
  });

  function addEssay() {
    const newEssay = {
      title: essayTitle,
      college: essayCollege,
      status: essayStatus,
      prompt: essayPrompt
    }

    setEssays([...essays, newEssay])

    setShowForm(false)
    setEssayTitle("")
    setEssayCollege("")
    setEssayStatus("Draft")
    setEssayPrompt("")
  }

  function deleteEssay(title) {
    setEssays(essays.filter((essay) => essay.title !== title))
  }

  useEffect(() => {
    localStorage.setItem("essays", JSON.stringify(essays))
  }, [essays])

    return (
      <div className="essays">
      <div className="page-header">
        <div>
          <h1>Essays</h1>
          <p>Keep track of your college essays and drafts.</p>
        </div>

        <button className="primary-button" onClick={() => setShowForm(true)}>
          + Add Essay
        </button>
      </div>

      {showForm && (
        <div className="essay-form">
        <h2>Add an Essay</h2>
    
        <input
          type="text"
          placeholder="Essay title"
          value={essayTitle}
          onChange={(e) => setEssayTitle(e.target.value)}
        />
    
        <input
          type="text"
          placeholder="College"
          value={essayCollege}
          onChange={(e) => setEssayCollege(e.target.value)}
        />
    
        <select value={essayStatus} onChange={(e) => setEssayStatus(e.target.value)}>
          <option value="Draft">Draft</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>
    
        <textarea
          placeholder="Essay prompt"
          rows="5"
          value={essayPrompt}
          onChange={(e) => setEssayPrompt(e.target.value)}
        />
    
        <button className="primary-button" onClick={addEssay}>
          Add Essay
        </button>
      </div>
      )}

<div className="essay-list">
 {
 essays.map((essay) => (
  <div className="essay-card">
  <div>
    <h2>{essay.title}</h2>
    <p>{essay.college}</p>
  </div>

  <span>{essay.status}</span>

  <button className="primary-button" onClick={() => deleteEssay(essay.title)}>
   Delete
  </button>
</div>
 ))
 }
  
</div>
    </div>
    )
  }
  
  export default Essays;
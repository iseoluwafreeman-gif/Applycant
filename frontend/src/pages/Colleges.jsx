import {useEffect, useState} from "react"


function Colleges() {
  const [showForm, setShowForm] = useState(false)
  const [collegeName, setCollegeName] = useState("");
  const [category, setCategory] = useState("Safety");
  const [colleges, setColleges] = useState(() => {
    const savedColleges = localStorage.getItem("colleges");
  
    return savedColleges ? JSON.parse(savedColleges) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("colleges", JSON.stringify(colleges));
  }, [colleges]);

  function addCollege() {
    const newCollege = {
      name: collegeName,
      category: category
    };

    setColleges([...colleges, newCollege])
    setCollegeName("")
    setCategory("Safety")
    setShowForm(false)
  }

  function deleteCollege(name) {
    setColleges(colleges.filter((college) => college.name !== name))
  }
    return (
      <div className="colleges">
        <div className="page-header">
          <h1>My Colleges</h1>
          <button className="primary-button" onClick={() => setShowForm(true)}> + Add College </button>
          
        </div>
        {showForm && (
          <div className="college-form">
          <h2>Add a College</h2>
          <input type="text" placeholder="College name" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Safety">Safety</option>
          <option value="Target">Target</option>
          <option value="Reach">Reach</option>
          </select>

          <button className='primary-button' onClick={addCollege}>
            Add College
          </button>
          </div>
        )
        }

        <p>Keep track of the colleges you're applying to.</p>

        <div className="college-sections">
        <section>
          <h2>Safeties</h2>
          {colleges.filter((college) => college.category == "Safety")
          .map((college) => (
            <div className='college-card' key={college.name}><span>{college.name}</span>
            <button onClick={() => deleteCollege(college.name)}>
            Delete
            </button>
            </div>
          ))}
        </section>
        <section>
          <h2>Targets</h2>
          {
          colleges.filter((college) => college.category == "Target")
          .map((college) => 
          (<div className='college-card' key={college.name}><span>{college.name}</span> <button onClick={() => deleteCollege(college.name)}>
          Delete
          </button></div>
            
          )
          )
          }
        </section>
        <section>
          <h2>Reaches</h2>
          {colleges
    .filter((college) => college.category === "Reach")
    .map((college) => (
      <div className="college-card" key={college.name}>
        <span>{college.name}</span>
        <button onClick={() => deleteCollege(college.name)}>
          Delete
          </button>
      </div>
    ))}
        </section>
        </div>
      </div>
    )
  }
  
  export default Colleges;
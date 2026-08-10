import { useState, useEffect } from "react"

function Achievements() {

  const [showForm, setShowForm] = useState(false)
  const [achievementName, setAchievementName] = useState("")
  const [achievementDescription, setAchievementDescription] = useState("")
  const [achievementType, setAchievementType] = useState("Award")

  const [achievements, setAchievements] = useState(() => {
    const savedAchievements = localStorage.getItem("achievements")
    return savedAchievements ? JSON.parse(savedAchievements) : []
  })

  useEffect(() => {
    localStorage.setItem("achievements", JSON.stringify(achievements))
  }, [achievements])

  function addAchievement() {
    const newAchievement = {
      name: achievementName,
      description: achievementDescription,
      type: achievementType
    }
    setAchievements([...achievements, newAchievement])
    setAchievementName("")
    setAchievementDescription("")
    setAchievementType("Award")
    setShowForm(false)
  }

  function deleteAchievement(name) {
    setAchievements(achievements.filter((achievement) => achievement.name !== name ))
  }

    return (
    <div className="achievements">
      <div className="page-header">
      <div>
      <h1> Achievements </h1>
      <p>Keep track of your awards, accomplishments, and activities</p>
      </div>

      <button className="primary-button" onClick={() => setShowForm(true)}> + Add Achievement </button>
      </div>

      {showForm && (
        <div className="achievement-form">
        <h2>Add an Achievement</h2>

        <input type="text" placeholder="Achievement name" value={achievementName} onChange={(e) => setAchievementName(e.target.value)}/>
        <input type="text" placeholder="Description" value={achievementDescription} onChange={(e) => setAchievementDescription(e.target.value)}/>

        <select value={achievementType} onChange={(e) => setAchievementType(e.target.value)}>
          <option value="Award">Award</option>
          <option value="Activity">Activity</option>
          <option value="Leadership">Leadership</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Other">Other</option>
        </select>

        <button className="primary-button" onClick={addAchievement}>
          Add Achievement
        </button>
        </div>
      )}
      <div className="achievement-list">

      { achievements.map((achievement) => (
        <div className="achievement-card">
        <div>
          <h2>{achievement.name}</h2>
          <p>{achievement.description}e</p>
        </div>
    
        <span>{achievement.type}</span>

        <button onClick={() => deleteAchievement(achievement.name)} className="primary-button"> Delete </button>
      </div>
      ))
      }
  
</div>
    </div>
    );
  }
  
  export default Achievements;
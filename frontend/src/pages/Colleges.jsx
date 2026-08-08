function Colleges() {
    return (
      <div className="colleges">
        <div className="page-header">
          <h1>My Colleges</h1>
          <button className="primary-button"> + Add College </button>
          
        </div>

        <p>Keep track of the colleges you're applying to.</p>

        <div className="college-sections">
        <section>
          <h2>Safeties</h2>
        </section>
        <section>
          <h2>Targets</h2>
        </section>
        <section>
          <h2>Reaches</h2>
        </section>
        </div>
      </div>
    )
  }
  
  export default Colleges;
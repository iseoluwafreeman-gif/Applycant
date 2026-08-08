import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">Applycant</Link>

      <div className="navbar-right">
      <Link to="/dashboard" className="text-white">Dashboard</Link>
      <Link to="/colleges" className="text-white">Profile</Link>
  
      </div>
    </header>
  );
}

export default Navbar;
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">

        <Link to="/" className="logo">
        <div className="logo-icon">
            <span className="shop-icon">🏪</span>
          </div>
          Localio
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard/my-business">Businesses</Link>
          <Link to="/about">About</Link>
          <Link to="/dashboard/settings">Contact</Link>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="nav-login-btn">
           <span className="user-icon">👤</span> Login
          </Link>

          <Link to="/register" className="nav-register-btn">
            Register Business
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
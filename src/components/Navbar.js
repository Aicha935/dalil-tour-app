import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "../styles/Navbar.css";

function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">📍 دليلك السياحي</h2>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>المدن</Link>
        </li>
        {user && (
          <>
            <li>
              <Link to="/add" onClick={() => setMenuOpen(false)}>➕ إضافة</Link>
            </li>
            <li>
              <Link to="/favorites" onClick={() => setMenuOpen(false)}>❤️ المفضلة</Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>👤 حسابي</Link>
            </li>
          </>
        )}
        {!user ? (
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>🔐 دخول</Link>
          </li>
        ) : (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 خروج
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

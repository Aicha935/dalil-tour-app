import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// الصفحات
import Cities from "./pages/Cities";
import Places from "./pages/Places";
import Login from "./pages/Login";
import AddPlace from "./pages/AddPlace";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import PlaceDetails from "./pages/PlaceDetails";

// أنماط
import "./App.css";
import "./styles/Navbar.css";

// السياق والمصادقة
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

// ✅ مكون شريط التنقل مع زر الهامبرجر
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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">📍 دليلك السياحي</h2>

      {/* زر الهامبرجر */}
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* قائمة التنقل */}
      <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={closeMenu}>المدن</Link></li>

        {user && (
          <>
            <li><Link to="/add" onClick={closeMenu}>➕ إضافة</Link></li>
            <li><Link to="/favorites" onClick={closeMenu}>❤️ المفضلة</Link></li>
            <li><Link to="/profile" onClick={closeMenu}>👤 حسابي</Link></li>
          </>
        )}

        {!user ? (
          <li><Link to="/login" onClick={closeMenu}>🔐 دخول</Link></li>
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Cities />} />
          <Route path="/city/:cityId" element={<Places />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<ProtectedRoute><AddPlace /></ProtectedRoute>} />
          <Route path="/place/:placeId" element={<PlaceDetails />} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

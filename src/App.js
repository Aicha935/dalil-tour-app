import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// استيراد الصفحات
import Cities from "./pages/Cities";
import Places from "./pages/Places";
import Login from "./pages/Login";
import AddPlace from "./pages/AddPlace";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  return (
    <Router>
      {/* ✅ Navbar */}
      <nav className="navbar">
        <h2>📍 دليلك السياحي</h2>
        <ul>
          <li><Link to="/">المدن</Link></li>
          <li><Link to="/add">إضافة مكان</Link></li>
          <li><Link to="/favorites">المفضلة</Link></li>
          <li><Link to="/profile">الملف الشخصي</Link></li>
          <li><Link to="/login">تسجيل الدخول</Link></li>
        </ul>
      </nav>

      {/* ✅ التوجيه بين الصفحات */}
      <Routes>
        <Route path="/" element={<Cities />} />
        <Route path="/city/:cityId" element={<Places />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddPlace />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

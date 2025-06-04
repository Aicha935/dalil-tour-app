import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
        alert("✅ تم إنشاء الحساب بنجاح");
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        alert("✅ تم تسجيل الدخول بنجاح");
      }

      navigate("/");
    } catch (err) {
      alert("❌ خطأ: " + err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>{isRegister ? "إنشاء حساب جديد" : "تسجيل الدخول"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isRegister ? "إنشاء حساب" : "دخول"}</button>
        </form>
        <button onClick={() => setIsRegister(!isRegister)} className="toggle-button">
          {isRegister ? "🔁 تسجيل الدخول" : "🆕 إنشاء حساب"}
        </button>
      </div>
    </div>
  );
}

export default Login;

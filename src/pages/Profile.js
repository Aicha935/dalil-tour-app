import React from "react";
import { useAuth } from "../AuthContext";
import { auth } from "../firebase";
import { signOut, sendPasswordResetEmail } from "firebase/auth";
import "../styles/Profile.css";

function Profile() {
  const { user } = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      alert("📩 تم إرسال رابط تغيير كلمة المرور إلى بريدك.");
    } catch (error) {
      console.error("❌ خطأ:", error);
      alert("حدث خطأ أثناء إرسال رابط التغيير.");
    }
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <h2>❌ لم تقم بتسجيل الدخول</h2>
          <p>يرجى تسجيل الدخول لعرض ملفك الشخصي.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <img
          className="profile-avatar"
          src={`https://ui-avatars.com/api/?name=${user.email}&background=0077b6&color=fff&size=256`}
          alt="Avatar"
        />
        <h2>👤 مرحبًا بك</h2>
        <p className="profile-email">📧 {user.email}</p>
        <p className="profile-uid">🆔 {user.uid}</p>

        <div className="profile-buttons">
          <button className="reset-btn" onClick={handlePasswordReset}>
            🔒 تغيير كلمة المرور
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

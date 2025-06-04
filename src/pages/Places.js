import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";

function Places() {
  const { cityId } = useParams();
  const [places, setPlaces] = useState([]);
  const { user } = useAuth();

  // جلب الأماكن الخاصة بالمدينة
  useEffect(() => {
    const fetchPlaces = async () => {
      const q = query(collection(db, "places"), where("cityId", "==", cityId));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlaces(data);
    };

    fetchPlaces();
  }, [cityId]);

  // دالة الحفظ في المفضلة
  const saveToFavorites = async (place) => {
    if (!user) {
      alert("يجب تسجيل الدخول لحفظ المكان");
      return;
    }

    try {
      const favRef = doc(db, "favorites", user.uid, "places", place.id);
      await setDoc(favRef, place);
      alert("✅ تم حفظ المكان في المفضلة");
    } catch (error) {
      console.error("❌ خطأ في الحفظ:", error);
      alert("حدث خطأ أثناء الحفظ في المفضلة");
    }
  };

  return (
    <div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "24px",
  padding: "20px",
  fontFamily: "Tahoma, sans-serif",
  direction: "rtl"
}}>
  {places.map(place => (
    <div
      key={place.id}
      style={{
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s",
        height: "100%"
      }}
    >
      <Link to={`/place/${place.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{
          width: "100%",
          height: "240px",
          overflow: "hidden"
        }}>
          <img
  src={place.imageUrl}
  alt={place.name}
  style={{
    width: "100%",
    maxHeight: "400px",
    height: "auto",
    objectFit: "cover",
    borderRadius: "12px",
    display: "block",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  }}
/>

          
        </div>
        <div style={{
          padding: "20px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <h3 style={{ margin: "0 0 10px", color: "#0077b6" }}>{place.name}</h3>
          <p style={{ color: "#444", fontSize: "14px", lineHeight: "1.6", minHeight: "60px" }}>
            {place.description}
          </p>
        </div>
      </Link>

      <button
        onClick={() => saveToFavorites(place)}
        style={{
          backgroundColor: "#ff4081",
          color: "white",
          border: "none",
          padding: "12px",
          fontSize: "15px",
          cursor: "pointer",
          borderTop: "1px solid #eee",
          borderRadius: "0 0 15px 15px"
        }}
      >
        ❤️ حفظ في المفضلة
      </button>
    </div>
  ))}
</div>

  );
}

export default Places;

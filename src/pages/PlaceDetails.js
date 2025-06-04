import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const placeRef = doc(db, "places", placeId);
        const docSnap = await getDoc(placeRef);
        if (docSnap.exists()) {
          setPlace({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("❌ خطأ في تحميل التفاصيل:", error);
      }
    };

    fetchPlace();
  }, [placeId]);

  const saveToFavorites = async () => {
    if (!user) {
      alert("يجب تسجيل الدخول لحفظ المكان");
      return;
    }

    try {
      const favRef = doc(db, "favorites", user.uid, "places", place.id);
      await setDoc(favRef, place);
      alert("✅ تم الحفظ في المفضلة");
    } catch (err) {
      alert("❌ حدث خطأ في الحفظ");
    }
  };

  if (!place) return <p style={{ padding: "30px" }}>⏳ جاري تحميل التفاصيل...</p>;

  return (
    <div style={{
  width: "100%",
  maxWidth: "800px",
  margin: "auto",
  marginBottom: "25px",
  borderRadius: "15px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
}}>
      <button onClick={() => navigate(-1)} style={{
        marginBottom: "20px",
        background: "#ccc",
        padding: "8px 14px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
      }}>
        ⬅️ رجوع
      </button>

      <img
    src={place.imageUrl}
    alt={place.name}
    style={{
      width: "100%",
      height: "auto",
      display: "block",
      objectFit: "contain"
    }}
  />
      <h2 style={{ color: "#0077b6" }}>{place.name}</h2>
      <p style={{ color: "#333", marginBottom: "20px" }}>{place.description}</p>

      <button onClick={saveToFavorites} style={{
        backgroundColor: "#ff4081",
        color: "white",
        padding: "12px 20px",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer"
      }}>
        ❤️ حفظ في المفضلة
      </button>
    </div>
  );
}

export default PlaceDetails;

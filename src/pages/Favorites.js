import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

function Favorites() {
  const { user } = useAuth();
  const [places, setPlaces] = useState([]);

  const fetchFavorites = async () => {
    if (!user) return;
    const snapshot = await getDocs(collection(db, "favorites", user.uid, "places"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPlaces(data);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const removeFromFavorites = async (placeId) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "favorites", user.uid, "places", placeId));
      alert("🗑️ تم إزالة المكان من المفضلة");
      fetchFavorites();
    } catch (err) {
      alert("❌ حدث خطأ أثناء الحذف");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Tahoma, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>❤️ الأماكن المفضلة لديك</h2>

      {places.length === 0 ? (
        <p style={{ textAlign: "center" }}>لا توجد أماكن محفوظة.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px"
        }}>
          {places.map(place => (
            <div key={place.id} style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s"
            }}>
              <img
                src={place.imageUrl}
                alt={place.name}
                style={{ width: "100%", height: "220px", objectFit: "cover" }}
              />
              <div style={{ padding: "20px", flexGrow: 1 }}>
                <h3 style={{ margin: "0 0 10px", color: "#023e8a" }}>{place.name}</h3>
                <p style={{ color: "#444" }}>{place.description}</p>
              </div>
              <button
                onClick={() => removeFromFavorites(place.id)}
                style={{
                  backgroundColor: "#d00000",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}
              >
                ❌ إزالة من المفضلة
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

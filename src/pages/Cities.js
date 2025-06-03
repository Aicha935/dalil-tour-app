import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function Cities() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const snapshot = await getDocs(collection(db, "cities"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCities(data);
    };
    fetchCities();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🌍 المدن السياحية</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "15px"
      }}>
        {cities.map(city => (
          <Link key={city.id} to={`/city/${city.id}`} style={{ textDecoration: "none", color: "black" }}>
            <div style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}>
              <img src={city.imageUrl} alt={city.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={{ padding: "10px", textAlign: "center", fontWeight: "bold" }}>{city.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Cities;

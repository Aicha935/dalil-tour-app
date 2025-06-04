import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../styles/Cities.css";

function Cities() {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      const snapshot = await getDocs(collection(db, "cities"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCities(data);
    };
    fetchCities();
  }, []);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cities-container">
      <h2 className="cities-title">🌍 استكشف المدن السياحية</h2>

      <input
        type="text"
        placeholder="🔍 ابحث عن مدينة..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="city-grid">
        {filteredCities.map(city => (
          <Link key={city.id} to={`/city/${city.id}`} className="city-card">
            <img src={city.imageUrl} alt={city.name} className="city-image" />
            <div className="city-name">{city.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Cities;

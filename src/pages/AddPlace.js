import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function AddPlace() {
  const [place, setPlace] = useState({
    name: "",
    description: "",
    imageUrl: "",
    cityId: ""
  });

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const snapshot = await getDocs(collection(db, "cities"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCities(data);
    };
    fetchCities();
  }, []);

  const handleChange = (e) => {
    setPlace({ ...place, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "places"), place);
      alert("✅ تم إضافة المكان بنجاح!");
      setPlace({ name: "", description: "", imageUrl: "", cityId: "" });
    } catch (err) {
      alert("❌ حدث خطأ أثناء الإضافة");
      console.error(err);
    }
  };

  const backgroundStyle = {
    backgroundImage: 'url("/images/tourism-bg.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "Tahoma, sans-serif",
    direction: "rtl",
    color: "#333"
  };

  const formStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    maxWidth: "500px",
    margin: "auto",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#0077b6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  };

  return (
    <div style={backgroundStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>➕ إضافة مكان سياحي جديد</h2>
        <input
          type="text"
          name="name"
          placeholder="اسم المكان"
          value={place.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <textarea
          name="description"
          placeholder="وصف المكان"
          value={place.description}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="رابط الصورة"
          value={place.imageUrl}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <select
          name="cityId"
          value={place.cityId}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">اختر المدينة</option>
          {cities.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
        <button type="submit" style={buttonStyle}>✅ إضافة</button>
      </form>
    </div>
  );
}

export default AddPlace;

import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");

  const fetchUser = async () => {
    setLoading(true);
    try {
      const url = gender
        ? `https://randomuser.me/api/?gender=${gender}`
        : "https://randomuser.me/api/";
      const response = await axios.get(url);
      const data = response.data.results[0];
      const userData = {
        photo: data.picture.large,
        fullName: `${data.name.first} ${data.name.last}`,
        email: data.email,
        phone: data.phone,
        city: data.location.city,
        country: data.location.country,
        gender: data.gender,
      };
      setUser(userData);
      await axios.post("http://localhost:8080/saveUser", userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    setLoading(false);
  };

  return (
    <div style={styles.appBg} className="text-light min-vh-100 py-5">
      <div className="container">
        <h2 className="text-center mb-5 display-4 fw-bold" style={styles.title}>
          🌟 Random User Generator
        </h2>

        <div className="d-flex justify-content-center mb-4 gap-3 flex-wrap">
          <select
            className="form-select w-auto shadow"
            style={styles.select}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button
            className="btn fw-bold shadow px-4"
            style={styles.button}
            onClick={fetchUser}
          >
            🚀 Generate User
          </button>
        </div>

        {loading && <div className="text-center fs-4">⏳ Loading...</div>}

        {user && (
          <div className="card mx-auto" style={styles.card}>
            <img src={user.photo} className="card-img-top" alt="User" />
            <div className="card-body text-dark">
              <h5 className="card-title text-center" style={styles.name}>{user.fullName}</h5>
              <p className="card-text">
                <strong>Email:</strong> {user.email}<br />
                <strong>Phone:</strong> {user.phone}<br />
                <strong>Location:</strong> {user.city}, {user.country}<br />
                <strong>Gender:</strong> {user.gender}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ✨ Inline CSS Styles with Vibrant Theme
const styles = {
  appBg: {
    background: "linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)",
    minHeight: "100vh"
  },
  title: {
    color: "#fff",
    textShadow: "2px 2px 5px rgba(0,0,0,0.2)"
  },
  button: {
    backgroundColor: "#ff4b2b",
    color: "#fff",
    border: "none",
    transition: "all 0.3s",
    boxShadow: "0 4px 15px rgba(255,75,43,0.5)",
  },
  select: {
    backgroundColor: "#fff",
    color: "#333",
    fontWeight: "bold"
  },
  card: {
    width: "20rem",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    backgroundColor: "#ffffff",
    transition: "transform 0.3s ease",
    animation: "fadeIn 0.8s"
  },
  name: {
    color: "#ff4b2b",
    fontWeight: "bold"
  }
};

export default App;

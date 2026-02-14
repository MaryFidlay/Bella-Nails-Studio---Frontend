import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // URL do backend no Railway
      // const API_URL = "https://bella-nails-studio-backend-production-6905.up.railway.app";
      
  const API_URL = process.env.REACT_APP_API_URL;
  console.log("API_URL:", process.env.REACT_APP_API_URL);

      const response = await fetch(
        `${API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );


      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();

    
      localStorage.setItem("loggedAdmin", JSON.stringify(data.admin));
      localStorage.setItem("adminToken", data.token);

      navigate("/admin-schedule");
    } catch (err) {
      console.error(err);
      alert("Invalid admin credentials!");
    }
  };

  return (
    <div className="admin-login-container">
      <a href="/" id="companyName">
        Bella Nails Studio
      </a>

      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Admin Sign In</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default AdminLogin;

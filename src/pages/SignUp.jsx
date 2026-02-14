import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔐 URL do backend no Railway
  // const API_URL = "https://bella-nails-studio-backend-production-6905.up.railway.app";

  const API_URL = process.env.REACT_APP_API_URL;
  console.log("API_URL:", process.env.REACT_APP_API_URL);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert("✅ Registration successful!");
      navigate("/signIn");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="signUp-container">
      <a href="/" id="companyName">Bella Nails Studio</a>
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="form-footer">
          Already have an account? <a href="/signIn">Sign In</a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;

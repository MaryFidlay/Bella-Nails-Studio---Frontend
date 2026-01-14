import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

export default function Home() {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) setLoggedUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedUser(null);
  };

  return (
    <div className="home-container">
    
      <h1
        // id="companyName"
        // onClick={() => navigate("/")}
        // style={{ cursor: "pointer" }}
      >
        Bella Nails Studio!
      </h1>

      <p className="form-m">Manicure and Pedicure</p>
      {/* <p>
        Schedule your appointments easily and quickly. Login or register to get
        started!
      </p> */}

      <p className="home-subtitle">
  Schedule your appointments easily and quickly. Login or register to get started!
</p>

      <div id="actionButtons">
        {!loggedUser ? (
          <>
            <button onClick={() => navigate("/signIn")}>Sign In</button>
            <button onClick={() => navigate("/signUp")}>Sign Up</button>
            <button onClick={() => navigate("/admin-login")}>
              Admin Sign In
            </button>
          </>
        ) : (
          <>
            <p>Welcome, {loggedUser.name}!</p>
            <button onClick={() => navigate("/schedule")}>
              Go to Schedule
            </button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}




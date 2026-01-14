// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "../styles/style.css"


// function SignIn() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const users = JSON.parse(localStorage.getItem("users") || "[]");
//     const user = users.find(
//       (u) => u.email === email.trim() && u.password === password.trim()
//     );

//     if (user) {
//       localStorage.setItem("loggedInUser", JSON.stringify(user));
//       alert(`Welcome, ${user.name}!`);
//       navigate("/schedule");
//     } else {
//       alert("Invalid email or password!");
//     }
//   };

//   return (
//     <div className="signIn-container">
//       <Link to="/" id="companyName">Bella Nails Studio</Link>
      

//       <div className="form-container">
//         <form onSubmit={handleSubmit}>

//         <h2 className="form-title">User Log In</h2>

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Sign In</button>
     

//       <p className="form-footer">
//         Don't have an account? <Link to="/signUp">Sign Up</Link>
//       </p>
//       </form>
//       </div>
//     </div>
//   );
// }

// export default SignIn;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/style.css";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password!");
        return;
      }

      // Salva token JWT no localStorage
      localStorage.setItem("loggedInUser", JSON.stringify({ name: data.name, email: data.email }));
      localStorage.setItem("token", data.token);
      

      alert(`Welcome, ${data.name}!`);
      navigate("/schedule");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="signIn-container">
      <Link to="/" id="companyName">Bella Nails Studio</Link>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">User Log In</h2>

          <input
            type="email"
            placeholder="Email"
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

          {error && <p style={{ color: "red" }}>{error}</p>}

          <p className="form-footer">
            Don't have an account? <Link to="/signUp">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;

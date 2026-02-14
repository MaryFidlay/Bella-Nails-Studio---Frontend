import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminLogin from "./pages/AdminLogin";
import Schedule from "./pages/Schedule";
import AdminSchedule from "./pages/AdminSchedule";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-schedule" element={<AdminSchedule />} />
    </Routes>
  );
}

export default App;
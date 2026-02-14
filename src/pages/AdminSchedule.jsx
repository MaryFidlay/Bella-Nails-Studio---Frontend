import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "../styles/style.css";

function AdminSchedule() {
  const navigate = useNavigate();

  const [loggedAdmin, setLoggedAdmin] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [appointmentsForDay, setAppointmentsForDay] = useState([]);

  // 🔐 URL do backend no Railway
  // const API_URL = "https://bella-nails-studio-backend-production-6905.up.railway.app";
  
  const API_URL = process.env.REACT_APP_API_URL;
  console.log("API_URL:", process.env.REACT_APP_API_URL);


  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("loggedAdmin"));
    const token = localStorage.getItem("adminToken");

    if (!admin || !token) {
      alert("You must be logged in as admin!");
      navigate("/admin-login");
      return;
    }

    setLoggedAdmin(admin);
    fetchAppointments(token);
  }, [navigate]);


  const fetchAppointments = async (token) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch appointments");

      const data = await response.json();

      const grouped = {};
      data.forEach((a) => {
        if (!grouped[a.date]) grouped[a.date] = [];
        grouped[a.date].push(a);
      });

      setAppointments(grouped);
    } catch (err) {
      console.error(err);
      alert("Error fetching appointments");
    }
  };


  useEffect(() => {
    if (selectedDate && appointments[selectedDate]) {
      setAppointmentsForDay(appointments[selectedDate]);
    } else {
      setAppointmentsForDay([]);
    }
  }, [selectedDate, appointments]);


  const cancelAppointment = async (id) => {
    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch(`${API_URL}/api/admin/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to cancel");

   
      setAppointmentsForDay((prev) => prev.filter((a) => a._id !== id));

      setAppointments((prev) => {
        const updated = { ...prev };
        updated[selectedDate] = updated[selectedDate].filter((a) => a._id !== id);
        if (updated[selectedDate].length === 0) delete updated[selectedDate];
        return updated;
      });

      alert("❌ Appointment cancelled successfully");
    } catch (err) {
      console.error(err);
      alert("Error cancelling appointment");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedAdmin");
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="admin-schedule-container">
      {loggedAdmin && <h1 id="welcomeAdmin">Welcome, {loggedAdmin.name}!</h1>}

      <label>Select a date:</label>
      <Flatpickr
        value={selectedDate}
        onChange={([date]) => setSelectedDate(date.toISOString().split("T")[0])}
        options={{ minDate: "today" }}
      />

      <div className="allAppointments">
        <h3>Appointments for selected date:</h3>

        {appointmentsForDay.length === 0 ? (
          <p>No appointments for this date.</p>
        ) : (
          appointmentsForDay.map((a) => (
            <div className="appointment-row" key={a._id}>
              <span className="appointment-info">
                {a.time} - {a.user}
              </span>

              <button className="cancel-btn" onClick={() => cancelAppointment(a._id)}>
                Cancel
              </button>
            </div>
          ))
        )}
      </div>

      <button id="logoutAdminBtn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminSchedule;

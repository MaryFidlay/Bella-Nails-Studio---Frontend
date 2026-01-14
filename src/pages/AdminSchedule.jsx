// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/flatpickr.min.css";

// import "../styles/style.css"

// function AdminSchedule() {
//   const navigate = useNavigate();
//   const [loggedAdmin, setLoggedAdmin] = useState(null);
//   const [appointments, setAppointments] = useState({});
//   const [selectedDate, setSelectedDate] = useState("");
//   const [appointmentsForDay, setAppointmentsForDay] = useState([]);

  
//   useEffect(() => {
//     const admin = JSON.parse(localStorage.getItem("loggedAdmin"));
//     if (!admin) {
//       alert("You must be logged in as admin!");
//       navigate("/admin-login");
//       return;
//     }
//     setLoggedAdmin(admin);

  
//     const storedAppointments = JSON.parse(
//       localStorage.getItem("appointments") || "{}"
//     );
//     setAppointments(storedAppointments);
//   }, [navigate]);

 
//   useEffect(() => {
//     if (selectedDate && appointments) {
//       const list = appointments[selectedDate] || [];
//       setAppointmentsForDay(list);
//     }
//   }, [selectedDate, appointments]);

//   const handleLogout = () => {
//     localStorage.removeItem("loggedAdmin");
//     navigate("/");
//   };

//   const cancelAppointment = (time) => {
//     const updated = { ...appointments };
//     updated[selectedDate] = updated[selectedDate].filter(
//       (a) => a.time !== time
//     );
//     if (updated[selectedDate].length === 0) delete updated[selectedDate];
//     localStorage.setItem("appointments", JSON.stringify(updated));
//     setAppointments(updated);
//     alert(`❌ Appointment at ${time} on ${selectedDate} has been cancelled.`);
//   };

//   const getClientPhone = (userName) => {
//     const users = JSON.parse(localStorage.getItem("users") || "[]");
//     const client = users.find((u) => u.name === userName);
//     return client ? client.phone : "N/A";
//   };



  
//   return (
//     <div className="admin-schedule-container">

//       {loggedAdmin && <h1 id="welcomeAdmin">Welcome, {loggedAdmin.name}!</h1>}

//       <label htmlFor="adminDate">Select a date:</label>
//       <Flatpickr
//         value={selectedDate}
//         onChange={([date]) => setSelectedDate(date.toISOString().split("T")[0])}
//         options={{ minDate: "today", inline: true }}
//       />

//       <div className="allAppointments">
//         <h3>Appointments for selected date:</h3>
//         <div id="appointmentsContainer">
//           {appointmentsForDay.length === 0 ? (
//             <p>No appointments for this date.</p>
//           ) : (
//             appointmentsForDay.map((a) => (
//               <div key={a.time}>
//                 {a.time} - {a.user} ({getClientPhone(a.user)})
//                 <button
//                   style={{ marginLeft: "10px" }}
//                   onClick={() => cancelAppointment(a.time)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <button onClick={handleLogout} id="logoutAdminBtn">
//         Logout
//       </button>
//     </div>
//   );
// }

// export default AdminSchedule;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import "../styles/style.css";

// function AdminSchedule() {
//   const navigate = useNavigate();

//   const [loggedAdmin, setLoggedAdmin] = useState(null);
//   const [appointments, setAppointments] = useState({});
//   const [selectedDate, setSelectedDate] = useState("");
//   const [appointmentsForDay, setAppointmentsForDay] = useState([]);


//   useEffect(() => {
//     const admin = JSON.parse(localStorage.getItem("loggedAdmin"));
//     const token = localStorage.getItem("adminToken");

//     if (!admin || !token) {
//       alert("You must be logged in as admin!");
//       navigate("/admin-login");
//       return;
//     }

//     setLoggedAdmin(admin);
//     fetchAppointments(token);
//   }, [navigate]);

  
//   const fetchAppointments = async (token) => {
//     try {
//       const response = await fetch(
//         "http://localhost:5001/api/admin/appointments",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) throw new Error("Failed to fetch appointments");

//       const data = await response.json();

      
//       const grouped = {};
//       data.forEach((a) => {
//         if (!grouped[a.date]) grouped[a.date] = [];
//         grouped[a.date].push(a);
//       });

//       setAppointments(grouped);
//     } catch (err) {
//       console.error(err);
//       alert("Error fetching appointments");
//     }
//   };

 
//   useEffect(() => {
//     if (selectedDate && appointments[selectedDate]) {
//       setAppointmentsForDay(appointments[selectedDate]);
//     } else {
//       setAppointmentsForDay([]);
//     }
//   }, [selectedDate, appointments]);


//   const cancelAppointment = async (id) => {
//     const token = localStorage.getItem("adminToken");

//     try {
//       const API_URL = "https://bella-nails-studio-backend-production-6905.up.railway.app";
//       const response = await fetch(
//         `http://localhost:5001/api/admin/appointments/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) throw new Error("Failed to cancel");

    
//       setAppointmentsForDay((prev) =>
//         prev.filter((a) => a._id !== id)
//       );

//       setAppointments((prev) => {
//         const updated = { ...prev };
//         updated[selectedDate] = updated[selectedDate].filter(
//           (a) => a._id !== id
//         );
//         if (updated[selectedDate].length === 0) delete updated[selectedDate];
//         return updated;
//       });

//       alert("❌ Appointment cancelled successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Error cancelling appointment");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("loggedAdmin");
//     localStorage.removeItem("adminToken");
//     navigate("/");
//   };

//   return (
//     <div className="admin-schedule-container">
//       {loggedAdmin && (
//         <h1 id="welcomeAdmin">Welcome, {loggedAdmin.name}!</h1>
//       )}

//       <label>Select a date:</label>
//       <Flatpickr
//         value={selectedDate}
//         onChange={([date]) =>
//           setSelectedDate(date.toISOString().split("T")[0])
//         }

//         options={{ minDate: "today" }}
      


        
//       />

//       <div className="allAppointments">
//         <h3>Appointments for selected date:</h3>

//         {appointmentsForDay.length === 0 ? (
//           <p>No appointments for this date.</p>
//         ) : (
//           appointmentsForDay.map((a) => (

       

//             <div className="appointment-row" key={a._id}>
//   <span className="appointment-info">
//     {a.time} - {a.user}
//   </span>

//   <button
//     className="cancel-btn"
//     onClick={() => cancelAppointment(a._id)}
//   >
//     Cancel
//   </button>
// </div>


//           ))
//         )}
//       </div>

//       <button id="logoutAdminBtn" onClick={handleLogout}>
//         Logout
//       </button>
//     </div>
//   );
// }

// export default AdminSchedule;



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
  const API_URL = "https://bella-nails-studio-backend-production-6905.up.railway.app";

  // 🔐 Verifica login + carrega agendamentos do backend
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

  // 📡 Busca todos os agendamentos
  const fetchAppointments = async (token) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch appointments");

      const data = await response.json();

      // Agrupa por data
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

  // 📅 Atualiza lista do dia selecionado
  useEffect(() => {
    if (selectedDate && appointments[selectedDate]) {
      setAppointmentsForDay(appointments[selectedDate]);
    } else {
      setAppointmentsForDay([]);
    }
  }, [selectedDate, appointments]);

  // ❌ Cancela agendamento (ADMIN)
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

      // Atualiza frontend sem recarregar tudo
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

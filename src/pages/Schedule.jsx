// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import "../styles/style.css";


// const availableTimes = [
//   "08:00",
//   "09:00",
//   "10:00",
//   "11:00",
//   "14:00",
//   "15:00",
//   "16:00",
//   "17:00",
// ];

// function Schedule() {
//   const navigate = useNavigate();

//   const [loggedUser, setLoggedUser] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [userAppointments, setUserAppointments] = useState([]);

 
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (!user) {
//       alert("You must be logged in to schedule!");
//       navigate("/signIn"); // Rota de login
//       return;
//     }

//     setLoggedUser(user);
//     fetchAppointments(user);
//   }, [navigate]);

  
//   const fetchAppointments = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You must be logged in!");
//       navigate("/signIn");
//       return;
//     }

//     try {
//       const API_URL = "https://bella-nails-studio---backend.up.railway.app";
//       const response = await fetch("http://localhost:5001/api/appointments", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) throw new Error("Failed to fetch appointments");

//       const data = await response.json();

     
//       if (Array.isArray(data)) {
//         setAppointments(data); 
//       } else {
//         setAppointments([]); 
//         alert("No appointments found or invalid response format");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error fetching appointments");
//     }
//   };

 
//   useEffect(() => {
//     if (!loggedUser) return;

//     const myAppointments = [];

   
//     if (Array.isArray(appointments)) {
//       appointments.forEach((appointment) => {
//         if (appointment.user === loggedUser.name) {
//           myAppointments.push({
//             date: appointment.date,
//             time: appointment.time,
//           });
//         }
//       });

//       setUserAppointments(myAppointments); 
//     }
//   }, [appointments, loggedUser]);


//   const saveAppointment = async (date, time) => {
//     if (!loggedUser || !date) return;

//     const token = localStorage.getItem("token");
//     if (!token) return;
//     console.log("Sending appointment data: ", { date, time });

//     try {
//       const API_URL = "https://bella-nails-studio---backend.up.railway.app";
//       const response = await fetch("http://localhost:5001/api/appointments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ date, time }),
//       });

//       if (!response.ok) throw new Error("Failed to save appointment");

//       const updatedAppointments = await response.json();
//       setAppointments(updatedAppointments); 
//       alert(`✅ Appointment confirmed on ${date} at ${time}`);
//     } catch (err) {
//       console.error(err);
//       alert("Error saving appointment");
//     }
//   };


//   const cancelAppointment = async (date, time) => {
//     if (!loggedUser) return;

//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       const API_URL = "https://bella-nails-studio---backend.up.railway.app";
//       const response = await fetch("http://localhost:5001/api/appointments", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ date, time }),
//       });

//       if (!response.ok) throw new Error("Failed to cancel appointment");

//       const updatedAppointments = await response.json();
//       setAppointments(updatedAppointments); 
//       alert(`❌ Appointment cancelled on ${date} at ${time}`);
//     } catch (err) {
//       console.error(err);
//       alert("Error cancelling appointment");
//     }
//   };


//   const timesForSelectedDate = () => {
//     const bookedTimes = appointments
//       .filter((appointment) => appointment.date === selectedDate)
//       .map((appointment) => appointment.time);

//     return availableTimes.map((time) => ({
//       time,
//       booked: bookedTimes.includes(time),
//     }));
//   };


//   const handleLogout = () => {
//     localStorage.removeItem("loggedInUser");
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="schedule-container">
//       {loggedUser && (
//         <h1 className="welcome" id="welcome">
//           Welcome, {loggedUser.name}!
//         </h1>
//       )}

//       <label htmlFor="date">Select a date:</label>

//       <Flatpickr
//         value={selectedDate}
//         onChange={([date]) => {
//           if (!date) return;
//           setSelectedDate(date.toISOString().split("T")[0]);
//         }}
//         options={{ minDate: "today" }}
//       />

//       <div className="times">
//         <h3>Available Times:</h3>

//         <div id="timesContainer">
//           {selectedDate ? (
//             timesForSelectedDate().map((t) => (
         

//               <button
//                 key={t.time}
//                 disabled={t.booked}
//                 style={t.booked ? { backgroundColor: "#ff9999" } : {}}
//                 onClick={() => {
//                   console.log(
//                     "Calling saveAppointment with:",
//                     selectedDate,
//                     t.time
//                   ); 
//                   saveAppointment(selectedDate, t.time);
//                 }}
//               >
//                 {t.time} {t.booked ? "(booked)" : ""}
//               </button>
//             ))
//           ) : (
//             <p>Please select a date.</p>
//           )}
//         </div>
//       </div>

//       <div className="myAppointments">
//         <h3>Your Appointments:</h3>

//         <div id="myAppointments">
//           {userAppointments.length === 0 ? (
//             <p>No appointments yet.</p>
//           ) : (
//             userAppointments.map((a) => (
//               <div key={`${a.date}-${a.time}`}>
//                 {a.date} at {a.time}{" "}
//                 <button onClick={() => cancelAppointment(a.date, a.time)}>
//                   Cancel
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <button id="logoutBtn" onClick={handleLogout}>
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Schedule;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "../styles/style.css";

// Horários disponíveis para agendamento
const availableTimes = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

function Schedule() {
  const navigate = useNavigate();

  const [loggedUser, setLoggedUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [userAppointments, setUserAppointments] = useState([]);

  // 🔐 URL do backend no Railway
  const API_URL = "https://bella-nails-studio-backend-production-6905.up.railway.app";

  // 🔐 Verifica login e carrega agendamentos ao iniciar
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("You must be logged in to schedule!");
      navigate("/signIn"); // Rota de login
      return;
    }

    setLoggedUser(user);
    fetchAppointments();
  }, [navigate]);

  // 📅 Função para buscar os agendamentos do backend
  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in!");
      navigate("/signIn");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch appointments");

      const data = await response.json();

      if (Array.isArray(data)) {
        setAppointments(data); // Salva agendamentos no estado
      } else {
        setAppointments([]);
        alert("No appointments found or invalid response format");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching appointments");
    }
  };

  // 📅 Atualiza lista de agendamentos do usuário
  useEffect(() => {
    if (!loggedUser) return;

    const myAppointments = [];

    if (Array.isArray(appointments)) {
      appointments.forEach((appointment) => {
        if (appointment.user === loggedUser.name) {
          myAppointments.push({
            date: appointment.date,
            time: appointment.time,
          });
        }
      });

      setUserAppointments(myAppointments);
    }
  }, [appointments, loggedUser]);

  // 📅 Função para salvar agendamento
  const saveAppointment = async (date, time) => {
    if (!loggedUser || !date) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, time }),
      });

      if (!response.ok) throw new Error("Failed to save appointment");

      const updatedAppointments = await response.json();
      setAppointments(updatedAppointments); // Atualiza a lista de agendamentos
      alert(`✅ Appointment confirmed on ${date} at ${time}`);
    } catch (err) {
      console.error(err);
      alert("Error saving appointment");
    }
  };

  // 📅 Função para cancelar agendamento
  const cancelAppointment = async (date, time) => {
    if (!loggedUser) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/appointments`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, time }),
      });

      if (!response.ok) throw new Error("Failed to cancel appointment");

      const updatedAppointments = await response.json();
      setAppointments(updatedAppointments); // Atualiza a lista de agendamentos
      alert(`❌ Appointment cancelled on ${date} at ${time}`);
    } catch (err) {
      console.error(err);
      alert("Error cancelling appointment");
    }
  };

  // 📅 Retorna horários disponíveis para o dia selecionado
  const timesForSelectedDate = () => {
    const bookedTimes = appointments
      .filter((appointment) => appointment.date === selectedDate)
      .map((appointment) => appointment.time);

    return availableTimes.map((time) => ({
      time,
      booked: bookedTimes.includes(time),
    }));
  };

  // 🔑 Função de logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    navigate("/"); // Redireciona para a página inicial
  };

  return (
    <div className="schedule-container">
      {loggedUser && (
        <h1 className="welcome" id="welcome">
          Welcome, {loggedUser.name}!
        </h1>
      )}

      <label htmlFor="date">Select a date:</label>

      <Flatpickr
        value={selectedDate}
        onChange={([date]) => {
          if (!date) return;
          setSelectedDate(date.toISOString().split("T")[0]);
        }}
        options={{ minDate: "today" }}
      />

      <div className="times">
        <h3>Available Times:</h3>

        <div id="timesContainer">
          {selectedDate ? (
            timesForSelectedDate().map((t) => (
              <button
                key={t.time}
                disabled={t.booked}
                style={t.booked ? { backgroundColor: "#ff9999" } : {}}
                onClick={() => saveAppointment(selectedDate, t.time)}
              >
                {t.time} {t.booked ? "(booked)" : ""}
              </button>
            ))
          ) : (
            <p>Please select a date.</p>
          )}
        </div>
      </div>

      <div className="myAppointments">
        <h3>Your Appointments:</h3>

        <div id="myAppointments">
          {userAppointments.length === 0 ? (
            <p>No appointments yet.</p>
          ) : (
            userAppointments.map((a) => (
              <div key={`${a.date}-${a.time}`}>
                {a.date} at {a.time}{" "}
                <button onClick={() => cancelAppointment(a.date, a.time)}>
                  Cancel
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <button id="logoutBtn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Schedule;

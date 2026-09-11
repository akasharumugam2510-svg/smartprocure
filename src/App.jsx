import "./App.css";
import { useState } from "react";
const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "https://smartprocure-production.up.railway.app";

/* =========================================================
   LOGIN / REGISTER PAGE
========================================================= */

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!mobile || !password) {
      setError("Please enter mobile number and password.");
      return;
    }

    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/farmers/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Invalid mobile number or password."
        );
        return;
      }

      setError("");
      onLogin(data.farmer);

    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to server.");
    }
  };

  /* =========================================================
     REGISTER
  ========================================================= */

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (
      !name ||
      !mobile ||
      !password ||
      !city ||
      !district
    ) {
      setError("Please fill all registration details.");
      return;
    }

    if (mobile.length !== 10) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (password.length < 4) {
      setError(
        "Password must contain at least 4 characters."
      );
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/farmers/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            mobile,
            password,
            village: city,
            district,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Registration failed."
        );
        return;
      }

      setSuccess(
        "Account created successfully. You can now login."
      );

      // Clear fields
      setName("");
      setCity("");
      setDistrict("");
      setPassword("");
      setMobile("");

      // Switch to login
      setIsRegister(false);

    } catch (error) {
      console.error("Registration error:", error);

      setError(
        "Unable to connect to server."
      );
    }
  };

  /* =========================================================
     LOGIN / REGISTER UI
  ========================================================= */

  return (
    <div className="login-page">

      {/* =====================================================
          LEFT SIDE - EXACT AGRI-ZEN IMAGE
      ===================================================== */}

      <div className="farming-section">

    <img
  src="https://drive.google.com/thumbnail?id=1noXdRP1WvYycJQgJ12Q1rUQplg3DJqFc&sz=w1000"
  alt="SmartProcure"
  style={{ width: "100%", height: "auto" }}
/>

      </div>


      {/* =====================================================
          RIGHT SIDE - LOGIN / REGISTER
      ===================================================== */}

      <div className="login-section">

        <div className="login-card">

          {/* LOGO */}
          {/* TITLE */}

          <h2>
            {isRegister
              ? "Create your account"
              : "Login to your account"}
          </h2>


          <p className="login-subtitle">
            {isRegister
              ? "Register as a farmer to continue"
              : "Enter your mobile number and password"}
          </p>


          {/* =================================================
              REGISTER FIELDS
          ================================================= */}

          {isRegister && (
            <>
              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="login-input"
              />


              <label>
                City / Village
              </label>

              <input
                type="text"
                placeholder="Enter City / Village"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                className="login-input"
              />


              <label>
                District
              </label>

              <input
                type="text"
                placeholder="Enter district"
                value={district}
                onChange={(e) =>
                  setDistrict(e.target.value)
                }
                className="login-input"
              />
            </>
          )}


          {/* =================================================
              MOBILE NUMBER
          ================================================= */}

          <label>
            Mobile Number
          </label>

          <input
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={mobile}
            maxLength={10}
            onChange={(e) => {
              const value =
                e.target.value.replace(/\D/g, "");

              setMobile(value);
            }}
            className="login-input"
          />


          {/* =================================================
              PASSWORD
          ================================================= */}

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder={
              isRegister
                ? "Create password"
                : "Enter password"
            }
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="login-input"
          />


          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}


          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          {success && (
            <p className="success-message">
              {success}
            </p>
          )}


          {/* =================================================
              MAIN BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={
              isRegister
                ? handleRegister
                : handleLogin
            }
            className="login-button"
          >
            {isRegister
              ? "Create Account"
              : "Sign In →"}
          </button>


          {/* =================================================
              LOGIN / REGISTER SWITCH
          ================================================= */}

          <div className="switch-account">

            <span>
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </span>

            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
                setSuccess("");
              }}
            >
              {isRegister
                ? "Login"
                : "Sign Up"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   LOGIN / REGISTER PAGE
========================================================= */

  /* =======================================================
     LOGIN / REGISTER UI
  ======================================================= */


function RoleSelection({ onSelectRole, onBack }) {
  const roles = [
    {
      id: "farmer",
      icon: "👨‍🌾",
      title: "Farmer",
      description:
        "Book procurement slots and track your produce.",
    },
    {
      id: "centre",
      icon: "🏢",
      title: "Procurement Centre",
      description:
        "Manage farmers, queues and procurement.",
    },
    {
      id: "admin",
      icon: "📊",
      title: "District Admin",
      description:
        "Monitor district-wide procurement operations.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f8f1",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        <button
          onClick={onBack}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "16px",
            marginBottom: "25px",
          }}
        >
          ← Back
        </button>

        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <h1 style={{ color: "#246b2a" }}>
            Welcome to SmartProcure
          </h1>

          <p style={{ color: "#666" }}>
            Select your role to continue
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "20px",
          }}
        >
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "18px",
                padding: "28px 20px",
                textAlign: "center",
                cursor: "pointer",
                boxShadow:
                  "0 5px 20px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "45px",
                  marginBottom: "15px",
                }}
              >
                {role.icon}
              </div>

              <h2
                style={{
                  margin: "5px 0",
                  color: "#246b2a",
                }}
              >
                {role.title}
              </h2>

              <p
                style={{
                  color: "#666",
                  lineHeight: "1.5",
                }}
              >
                {role.description}
              </p>

              <div
                style={{
                  color: "#2e7d32",
                  fontWeight: "bold",
                  marginTop: "15px",
                }}
              >
                Continue →
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FARMER HOME
========================================================= */

function Home({ booking, setPage, farmer }) {
  return (
    <div className="page-container">
      <div className="welcome-section">
        <p className="small-text">
          Good morning 👋
        </p>

        <h1>
          Welcome, {farmer?.name || "Farmer"} 👋
        </h1>

        <p className="muted-text">
          Manage your procurement easily with
          SmartProcure.
        </p>
      </div>

      <div
        style={{
          background: "#2e7d32",
          color: "white",
          borderRadius: "18px",
          padding: "22px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                opacity: 0.8,
              }}
            >
              Current Booking
            </p>

            <h2 style={{ margin: "7px 0" }}>
              {booking.centre}
            </h2>

            <p style={{ margin: 0 }}>
              {booking.date} • {booking.time}
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <small>Token</small>

            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              {booking.token}
            </div>
          </div>
        </div>

        <button
          onClick={() => setPage("queue")}
          style={{
            marginTop: "18px",
            padding: "10px 18px",
            border: "none",
            borderRadius: "9px",
            cursor: "pointer",
            background: "white",
            color: "#2e7d32",
            fontWeight: "bold",
          }}
        >
          View Live Queue
        </button>
      </div>

      <div className="section-header">
        <h2>Quick Actions</h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, 1fr)",
          gap: "15px",
        }}
      >
        <button
          onClick={() => setPage("book")}
          className="action-card"
        >
          <span>📅</span>
          <strong>Book Slot</strong>
          <small>Schedule procurement</small>
        </button>

        <button
          onClick={() => setPage("bookings")}
          className="action-card"
        >
          <span>📋</span>
          <strong>My Bookings</strong>
          <small>View your bookings</small>
        </button>

        <button
          onClick={() => setPage("queue")}
          className="action-card"
        >
          <span>🎫</span>
          <strong>Live Queue</strong>
          <small>Check your position</small>
        </button>

        <button
          onClick={() => setPage("payments")}
          className="action-card"
        >
          <span>💳</span>
          <strong>Payments</strong>
          <small>Track payments</small>
        </button>
      </div>

      <div
        className="section-header"
        style={{ marginTop: "25px" }}
      >
        <h2>AI Recommendation 🤖</h2>
      </div>

      <div
        style={{
          background: "#fff8e1",
          borderRadius: "15px",
          padding: "18px",
          border: "1px solid #ffe082",
        }}
      >
        <strong>
          Recommended Centre: Centre B - Salem
        </strong>

        <p style={{ marginBottom: 0 }}>
          AI predicts approximately{" "}
          <b>18 minutes</b> waiting time based
          on current queue conditions.
        </p>
      </div>

      <div
        className="section-header"
        style={{ marginTop: "25px" }}
      >
        <h2>Recent Activity</h2>
      </div>

      <div className="booking-card">
        <div>
          <strong>
            Slot booked successfully
          </strong>
          <p>Centre B - Salem</p>
        </div>

        <span>✓</span>
      </div>

      <div className="booking-card">
        <div>
          <strong>Payment received</strong>
          <p>₹12,450</p>
        </div>

        <span>✓</span>
      </div>
    </div>
  );
}

/* =========================================================
   BOOK SLOT
========================================================= */

function BookSlot({
  booking,
  setBooking,
  setPage,
  farmer,
}) {
  const [centre, setCentre] = useState(
    booking.centre || ""
  );

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [bookingConfirmed, setBookingConfirmed] =
    useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const centres = [
    {
      name: "Centre A - Salem",
      distance: "8 km",
      wait: "35 min",
      recommendation: false,
    },
    {
      name: "Centre B - Salem",
      distance: "12 km",
      wait: "18 min",
      recommendation: true,
    },
    {
      name: "Centre C - Salem",
      distance: "16 km",
      wait: "42 min",
      recommendation: false,
    },
  ];

  /* =======================================================
     CONFIRM BOOKING
  ======================================================= */

  const confirmBooking = async () => {
    setError("");

    if (!centre || !date || !time) {
      setError(
        "Please select centre, date and time."
      );
      return;
    }

    if (!farmer?.id) {
      setError(
        "Farmer information is missing. Please login again."
      );
      return;
    }

    const formattedDate = date;

const newToken =
  "B" +
  String(
    Math.floor(Math.random() * 800) + 100
  );

    setLoading(true);

    try {
       console.log("SENDING REQUEST TO BACKEND");
      const response = await fetch(
        
        `${API_BASE_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            farmer_id: farmer.id,
            centre: centre,
            booking_date: formattedDate,
            booking_time: time,
            token: newToken,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to create booking."
        );
        setLoading(false);
        return;
      }

      setBooking({
        centre,
        date: formattedDate,
        time,
        token: newToken,
        confirmed: true,
      });

      setBookingConfirmed(true);
      setError("");
    } catch (error) {
      console.error(
        "Booking error:",
        error
      );

      setError(
        "Unable to connect to server."
      );
    }

    setLoading(false);
  };

  /* =======================================================
     BOOKING SUCCESS
  ======================================================= */

  if (bookingConfirmed) {
    return (
      <div className="page-container">
        <div
          style={{
            textAlign: "center",
            paddingTop: "30px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#e8f5e9",
              color: "#2e7d32",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "42px",
              margin: "0 auto 20px",
            }}
          >
            ✓
          </div>

          <h1>Booking Confirmed!</h1>

          <p className="muted-text">
            Your procurement slot has been
            successfully booked.
          </p>

          <div
            style={{
              background: "#f1f8e9",
              borderRadius: "18px",
              padding: "25px",
              marginTop: "25px",
              textAlign: "left",
            }}
          >
            <p>
              <strong>Centre:</strong>{" "}
              {booking.centre}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {booking.date}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {booking.time}
            </p>

            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                padding: "15px",
                background: "white",
                borderRadius: "12px",
              }}
            >
              <small>
                Your Token Number
              </small>

              <div
                style={{
                  fontSize: "38px",
                  fontWeight: "bold",
                  color: "#2e7d32",
                }}
              >
                {booking.token}
              </div>
            </div>
          </div>

          <button
            className="primary-button"
            onClick={() =>
              setPage("bookings")
            }
            style={{
              width: "100%",
              marginTop: "20px",
            }}
          >
            View My Booking
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     BOOKING FORM
  ======================================================= */

  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>Book Procurement Slot</h1>
        <p>
          Select your preferred centre, date
          and time.
        </p>
      </div>

      <h2>1. Select Centre</h2>

      <div>
        {centres.map((item) => (
          <button
            key={item.name}
            onClick={() =>
              setCentre(item.name)
            }
            style={{
              width: "100%",
              textAlign: "left",
              padding: "17px",
              marginBottom: "12px",
              borderRadius: "14px",
              border:
                centre === item.name
                  ? "2px solid #2e7d32"
                  : "1px solid #ddd",
              background:
                centre === item.name
                  ? "#f1f8e9"
                  : "white",
                  color: "#222",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <strong>
                {item.name}
              </strong>

              {item.recommendation && (
                <span
                  style={{
                    color: "#2e7d32",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  🤖 AI Recommended
                </span>
              )}
            </div>

            <p
              style={{
                margin: "8px 0 0",
                color: "#666",
              }}
            >
              📍 {item.distance}
              &nbsp; • &nbsp; ⏱️{" "}
              {item.wait} wait
            </p>
          </button>
        ))}
      </div>

      <h2 style={{ marginTop: "25px" }}>
        2. Select Date
      </h2>

      <input
        type="date"
        value={date}
        min={
          new Date()
            .toISOString()
            .split("T")[0]
        }
        onChange={(e) =>
          setDate(e.target.value)
        }
        style={{
          width: "100%",
          padding: "13px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxSizing: "border-box",
        }}
      />

      <h2 style={{ marginTop: "25px" }}>
        3. Select Time
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, 1fr)",
          gap: "10px",
        }}
      >
        {[
          "09:00 AM - 09:30 AM",
          "09:30 AM - 10:00 AM",
          "10:00 AM - 10:30 AM",
          "10:30 AM - 11:00 AM",
          "11:00 AM - 11:30 AM",
          "11:30 AM - 12:00 PM",
        ].map((slot) => (
          <button
            key={slot}
            onClick={() =>
              setTime(slot)
            }
            style={{
              padding: "13px 8px",
              borderRadius: "10px",
              border:
                time === slot
                  ? "2px solid #2e7d32"
                  : "1px solid #ddd",
              background:
                time === slot
                  ? "#e8f5e9"
                  : "white",
                  color: "#222",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            {slot}
          </button>
        ))}
      </div>

      {error && (
        <p
          style={{
            color: "#d32f2f",
            marginTop: "15px",
          }}
        >
          {error}
        </p>
      )}

      <button
        onClick={confirmBooking}
        className="primary-button"
        disabled={loading}
        style={{
          width: "100%",
          marginTop: "25px",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading
          ? "Confirming..."
          : "Confirm Booking"}
      </button>
    </div>
  );
}

/* =========================================================
   MY BOOKINGS
========================================================= */

function MyBookings({ booking, setPage, farmer }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!farmer?.id) return;
   fetch(`${API_BASE_URL}/api/bookings/${farmer.id}`)
      .then((response) => response.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Failed to fetch bookings:", error));
  }, [farmer]);
  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>My Bookings</h1>
        <p>View your procurement bookings.</p>
      </div>
      <div className="booking-card">
        <div>
          <span style={{ background: "#e8f5e9", color: "#2e7d32", padding: "5px 10px", borderRadius: "20px", fontSize: "12px" }}>CONFIRMED</span>
          <h2>{booking.centre}</h2>
          <p>📅 {booking.date}</p>
          <p>⏰ {booking.time}</p>
          <p>🎫 Token: <strong>{booking.token}</strong></p>
        </div>
        <button onClick={() => setPage("queue")} className="primary-button">Track Queue</button>
      </div>
      <h2 style={{ marginTop: "30px" }}>Booking History</h2>
      {bookings.length === 0 ? (
        <div className="booking-card"><p style={{ margin: 0, color: "#666" }}>No booking history found.</p></div>
      ) : (
        bookings.map((item) => (
          <div className="booking-card" key={item.id}>
            <div>
              <strong>{item.centre}</strong>
              <p>{item.booking_date} • {item.booking_time}</p>
              <p>🎫 Token: <strong>{item.token}</strong></p>
            </div>
            <span style={{ color: "#2e7d32", fontWeight: "bold" }}>{item.status}</span>
          </div>
        ))
      )}
    </div>
  );
}

/* =========================================================
   QUEUE
========================================================= */

function Queue({ booking }) {
  const queue = [
    {
      token: "B021",
      farmer: "Farmer 21",
      status: "Processing",
    },
    {
      token: "B022",
      farmer: "Farmer 22",
      status: "Waiting",
    },
    {
      token: "B023",
      farmer: "Farmer 23",
      status: "Waiting",
    },
    {
      token: booking.token,
      farmer: "You",
      status: "Waiting",
    },
  ];

  const yourIndex = queue.findIndex(
    (item) =>
      item.token === booking.token
  );

  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>Live Queue</h1>
        <p>
          Track your position in real time.
        </p>
      </div>

      <div
        style={{
          background: "#e8f5e9",
          padding: "22px",
          borderRadius: "18px",
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <p style={{ margin: 0 }}>
          Your Token
        </p>

        <h1
          style={{
            fontSize: "42px",
            color: "#2e7d32",
            margin: "8px",
          }}
        >
          {booking.token}
        </h1>

        <p style={{ margin: 0 }}>
          Approximately{" "}
          <strong>
            {Math.max(yourIndex, 1) *
              12}{" "}
            minutes
          </strong>{" "}
          remaining
        </p>
      </div>

      <h2>Current Queue</h2>

      {queue.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "16px",
            background:
              item.token ===
              booking.token
                ? "#f1f8e9"
                : "white",
            border:
              item.token ===
              booking.token
                ? "2px solid #2e7d32"
                : "1px solid #eee",
            borderRadius: "13px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "#2e7d32",
            }}
          >
            {index + 1}
          </div>

          <div style={{ flex: 1 }}>
            <strong>
              {item.token}
            </strong>

            <p
              style={{
                margin: "4px 0",
                color: "#666",
              }}
            >
              {item.farmer}
            </p>
          </div>

          <span
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color:
                item.status ===
                "Processing"
                  ? "#ef6c00"
                  : "#777",
            }}
          >
            {item.status}
          </span>
        </div>
      ))}

      <div
        style={{
          marginTop: "25px",
          padding: "18px",
          background: "#fff8e1",
          borderRadius: "14px",
        }}
      >
        🤖{" "}
        <strong>
          AI Queue Prediction
        </strong>

        <p style={{ marginBottom: 0 }}>
          Based on current processing
          speed, your estimated waiting
          time is around{" "}
          <strong>36 minutes</strong>.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PAYMENTS
========================================================= */

function Payments() {
  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>Payments</h1>
        <p>
          Track your procurement payments.
        </p>
      </div>

      <div
        style={{
          background: "#2e7d32",
          color: "white",
          borderRadius: "18px",
          padding: "25px",
          marginBottom: "25px",
        }}
      >
        <p style={{ opacity: 0.8 }}>
          Total Received
        </p>

        <h1 style={{ margin: "5px 0" }}>
          ₹12,450
        </h1>

        <p style={{ marginBottom: 0 }}>
          Last payment: 02 Sep 2026
        </p>
      </div>

      <h2>Payment History</h2>

      <div className="booking-card">
        <div>
          <strong>
            Procurement Payment
          </strong>

          <p>
            02 Sep 2026 • Centre A
          </p>
        </div>

        <strong
          style={{ color: "#2e7d32" }}
        >
          +₹12,450
        </strong>
      </div>

      <div className="booking-card">
        <div>
          <strong>
            Procurement Payment
          </strong>

          <p>
            25 Aug 2026 • Centre B
          </p>
        </div>

        <strong
          style={{ color: "#2e7d32" }}
        >
          +₹9,850
        </strong>
      </div>

      <div
        style={{
          marginTop: "25px",
          background: "#f5f5f5",
          padding: "18px",
          borderRadius: "14px",
        }}
      >
        <strong>
          Payment Status
        </strong>

        <p style={{ marginBottom: 0 }}>
          All recent payments have been
          successfully processed.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   FARMER MORE
========================================================= */

/* =========================================================
   FARMER MORE - FULL DETAILS
========================================================= */

function More({ onLogout, farmer }) {
  const [activePage, setActivePage] = useState("menu");
  const [selectedLanguage, setSelectedLanguage] =
    useState("English");

  const farmerName = farmer?.name || "Akash A";
  const farmerMobile = farmer?.mobile || "9876543211";
  const farmerVillage =
    farmer?.village || farmer?.city || "Chennai";
  const farmerDistrict =
    farmer?.district || "Chennai";

  /* ================= BACK BUTTON ================= */

  const goBack = () => {
    setActivePage("menu");
  };

  /* ================= PAGE HEADER ================= */

  const PageHeader = ({ icon, title, subtitle }) => (
    <div
      style={{
        marginBottom: "22px",
      }}
    >
      <button
        onClick={goBack}
        style={{
          border: "none",
          background: "transparent",
          color: "#087a3d",
          fontSize: "25px",
          cursor: "pointer",
          padding: "0",
          marginBottom: "10px",
        }}
      >
        ←
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "32px" }}>
          {icon}
        </span>

        <div>
          <h1
            style={{
              margin: 0,
              color: "#087a3d",
              fontSize: "25px",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              margin: "5px 0 0",
              color: "#666",
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "15px",
          color: "#333",
        }}
      >
        SmartProcure
      </p>
    </div>
  );

  /* =====================================================
     MENU
  ===================================================== */

  if (activePage === "menu") {
    const options = [
      {
        icon: "👤",
        title: "My Profile",
        description: "View your farmer account details",
        page: "profile",
      },
      {
        icon: "🌾",
        title: "My Farm Details",
        description: "View your farm and agriculture details",
        page: "farm",
      },
      {
        icon: "📊",
        title: "Dashboard",
        description: "View procurement activity summary",
        page: "dashboard",
      },
      {
        icon: "📄",
        title: "Documents",
        description: "View procurement related documents",
        page: "documents",
      },
      {
        icon: "🔔",
        title: "Notifications",
        description: "View booking and procurement updates",
        page: "notifications",
      },
      {
        icon: "❓",
        title: "Help & Support",
        description: "Get help with SmartProcure",
        page: "help",
      },
      {
        icon: "⚙️",
        title: "Settings",
        description: "Manage application settings",
        page: "settings",
      },
      {
        icon: "🌐",
        title: "Language",
        description: "Choose your preferred language",
        page: "language",
      },
    ];

    return (
      <div className="page-container">
        <div className="page-heading">
          <h1>More</h1>
          <p>
            Account, support and application settings
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {options.map((item) => (
            <button
              key={item.page}
              onClick={() =>
                setActivePage(item.page)
              }
              style={{
                width: "100%",
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "16px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                textAlign: "left",
                cursor: "pointer",
                boxShadow:
                  "0 3px 12px rgba(0,0,0,0.05)",
              }}
            >
              <span
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "#e8f5e9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "25px",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </span>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    color: "#087a3d",
                    fontSize: "16px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#777",
                    fontSize: "13px",
                  }}
                >
                  {item.description}
                </p>
              </div>

              <span
                style={{
                  fontSize: "24px",
                  color: "#999",
                }}
              >
                ›
              </span>
            </button>
          ))}
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
          style={{
            marginTop: "25px",
            width: "100%",
          }}
        >
          🚪 Logout
        </button>
      </div>
    );
  }

  /* =====================================================
     MY PROFILE
  ===================================================== */

  if (activePage === "profile") {
    return (
      <div className="page-container">
        <PageHeader
          icon="👤"
          title="My Profile"
          subtitle="Your SmartProcure account information"
        />

        <div
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "25px",
            boxShadow:
              "0 5px 18px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "25px",
            }}
          >
            <div
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "50%",
                background: "#e8f5e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                fontSize: "38px",
              }}
            >
              👨‍🌾
            </div>

            <h2
              style={{
                margin: 0,
                color: "#087a3d",
              }}
            >
              {farmerName}
            </h2>

            <p
              style={{
                color: "#777",
                margin: "5px 0",
              }}
            >
              Registered Farmer
            </p>
          </div>

          {[
            ["👤", "Full Name", farmerName],
            ["📱", "Mobile Number", farmerMobile],
            ["📍", "Village / City", farmerVillage],
            ["🏛️", "District", farmerDistrict],
            ["🌾", "Account Type", "Farmer"],
            ["✅", "Account Status", "Active"],
          ].map(([icon, label, value]) => (
            <div
              key={label}
              style={{
                padding: "15px 0",
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "20px" }}>
                {icon}
              </span>

              <div style={{ flex: 1 }}>
                <small style={{ color: "#777" }}>
                  {label}
                </small>

                <div
                  style={{
                    fontWeight: "700",
                    marginTop: "3px",
                  }}
                >
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* =====================================================
     MY FARM DETAILS
  ===================================================== */

  if (activePage === "farm") {
    return (
      <div className="page-container">
        <PageHeader
          icon="🌾"
          title="My Farm Details"
          subtitle="Your agriculture information"
        />

        <div
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "22px",
            boxShadow:
              "0 5px 18px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              color: "#087a3d",
              marginTop: 0,
            }}
          >
            Farm Information
          </h2>

          {[
            ["👨‍🌾", "Farmer", farmerName],
            ["📍", "Location", farmerVillage],
            ["🏛️", "District", farmerDistrict],
            ["🌱", "Primary Crop", "Paddy"],
            ["📦", "Procurement Category", "Food Grains"],
            ["🏢", "Preferred Centre", "Centre B - Salem"],
            ["📅", "Current Season", "Kharif 2026"],
            ["✅", "Farm Status", "Active"],
          ].map(([icon, label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                gap: "12px",
                padding: "14px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span style={{ fontSize: "21px" }}>
                {icon}
              </span>

              <div>
                <small style={{ color: "#777" }}>
                  {label}
                </small>

                <div
                  style={{
                    fontWeight: "700",
                    marginTop: "3px",
                  }}
                >
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "18px",
            background: "#f1f8e9",
            padding: "18px",
            borderRadius: "15px",
          }}
        >
          🌱 <strong>SmartProcure Insight</strong>

          <p
            style={{
              marginBottom: 0,
              color: "#555",
            }}
          >
            Your farm information helps SmartProcure
            provide suitable procurement centre
            recommendations.
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     DASHBOARD
  ===================================================== */

  if (activePage === "dashboard") {
    return (
      <div className="page-container">
        <PageHeader
          icon="📊"
          title="Dashboard"
          subtitle="Your procurement activity overview"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2, 1fr)",
            gap: "12px",
          }}
        >
          {[
            ["📋", "12", "Total Bookings"],
            ["✅", "8", "Completed"],
            ["📅", "3", "Upcoming"],
            ["❌", "1", "Cancelled"],
          ].map(([icon, number, label]) => (
            <div
              key={label}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: "28px" }}>
                {icon}
              </div>

              <h2
                style={{
                  margin: "8px 0 3px",
                  color: "#087a3d",
                }}
              >
                {number}
              </h2>

              <small style={{ color: "#666" }}>
                {label}
              </small>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "white",
            marginTop: "18px",
            padding: "20px",
            borderRadius: "16px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#087a3d",
            }}
          >
            📈 Procurement Summary
          </h2>

          <p>Completed procurements: 8</p>
          <p>Upcoming appointments: 3</p>
          <p>Cancelled appointments: 1</p>

          <div
            style={{
              marginTop: "15px",
              padding: "15px",
              background: "#e8f5e9",
              borderRadius: "12px",
            }}
          >
            🤖 <strong>AI Recommendation</strong>

            <p style={{ marginBottom: 0 }}>
              Based on your booking history, Centre B
              is currently recommended for your next
              procurement visit.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =====================================================
     DOCUMENTS
  ===================================================== */

  if (activePage === "documents") {
    return (
      <div className="page-container">
        <PageHeader
          icon="📄"
          title="Documents"
          subtitle="Your procurement records"
        />

        {[
          [
            "📄",
            "Procurement Booking Receipt",
            "Booking confirmation document",
            "Available",
          ],
          [
            "📄",
            "Farmer Registration Details",
            "Registered farmer information",
            "Available",
          ],
          [
            "📄",
            "Procurement Transaction Record",
            "Previous procurement transactions",
            "Available",
          ],
          [
            "📄",
            "Payment Receipt",
            "Procurement payment records",
            "Available",
          ],
        ].map(
          ([icon, title, description, status]) => (
            <div
              key={title}
              style={{
                background: "white",
                padding: "18px",
                borderRadius: "15px",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                boxShadow:
                  "0 3px 12px rgba(0,0,0,0.05)",
              }}
            >
              <span style={{ fontSize: "27px" }}>
                {icon}
              </span>

              <div style={{ flex: 1 }}>
                <strong>{title}</strong>

                <p
                  style={{
                    margin: "5px 0",
                    color: "#777",
                    fontSize: "13px",
                  }}
                >
                  {description}
                </p>
              </div>

              <span
                style={{
                  background: "#e8f5e9",
                  color: "#2e7d32",
                  padding: "5px 9px",
                  borderRadius: "8px",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              >
                {status}
              </span>
            </div>
          )
        )}
      </div>
    );
  }

  /* =====================================================
     NOTIFICATIONS
  ===================================================== */

  if (activePage === "notifications") {
    return (
      <div className="page-container">
        <PageHeader
          icon="🔔"
          title="Notifications"
          subtitle="Latest SmartProcure updates"
        />

        {[
          [
            "✅",
            "Booking Confirmed",
            "Your procurement slot has been successfully confirmed.",
            "Recent",
          ],
          [
            "📅",
            "Upcoming Slot Reminder",
            "Your procurement appointment is approaching.",
            "Reminder",
          ],
          [
            "📢",
            "Procurement Centre Update",
            "Centre B - Salem has updated its operating schedule.",
            "Update",
          ],
          [
            "💳",
            "Payment Processed",
            "Your recent procurement payment has been processed.",
            "Payment",
          ],
        ].map(
          ([icon, title, message, type]) => (
            <div
              key={title}
              style={{
                background: "white",
                padding: "18px",
                borderRadius: "15px",
                marginBottom: "12px",
                boxShadow:
                  "0 3px 12px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ fontSize: "24px" }}>
                  {icon}
                </span>

                <strong
                  style={{
                    color: "#087a3d",
                  }}
                >
                  {title}
                </strong>

                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "11px",
                    color: "#777",
                  }}
                >
                  {type}
                </span>
              </div>

              <p
                style={{
                  margin: "10px 0 0 34px",
                  color: "#555",
                }}
              >
                {message}
              </p>
            </div>
          )
        )}
      </div>
    );
  }

  /* =====================================================
     HELP & SUPPORT
  ===================================================== */

  if (activePage === "help") {
    return (
      <div className="page-container">
        <PageHeader
          icon="❓"
          title="Help & Support"
          subtitle="SmartProcure assistance"
        />

        <div
          style={{
            background: "white",
            padding: "22px",
            borderRadius: "18px",
            boxShadow:
              "0 5px 18px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#087a3d",
            }}
          >
            How can we help?
          </h2>

          {[
            ["📅", "How to book a procurement slot?"],
            ["🎫", "How to check my token?"],
            ["📋", "How to view my bookings?"],
            ["💳", "How to check payment status?"],
            ["🏢", "How to select a procurement centre?"],
          ].map(([icon, question]) => (
            <button
              key={question}
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "10px",
                textAlign: "left",
                background: "#f8faf8",
                border: "1px solid #eee",
                borderRadius: "12px",
                cursor: "pointer",
                color: "#222",
              }}
            >
              {icon} {question}
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: "18px",
            background: "#e8f5e9",
            padding: "20px",
            borderRadius: "16px",
          }}
        >
          <h3>📞 SmartProcure Support</h3>

          <p>
            Need additional assistance?
          </p>

          <p>
            <strong>Support:</strong>{" "}
            SmartProcure Help Centre
          </p>

          <p style={{ marginBottom: 0 }}>
            Our support team can help with booking,
            account and procurement related issues.
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     SETTINGS
  ===================================================== */

  if (activePage === "settings") {
    return (
      <div className="page-container">
        <PageHeader
          icon="⚙️"
          title="Settings"
          subtitle="Manage your SmartProcure preferences"
        />

        {[
          [
            "🔔",
            "Notifications",
            "Receive booking and procurement updates",
          ],
          [
            "📅",
            "Booking Reminders",
            "Get reminders before scheduled slots",
          ],
          [
            "🔐",
            "Account Security",
            "Your account information is protected",
          ],
          [
            "🌐",
            "Language",
            "Current language: " + selectedLanguage,
          ],
        ].map(([icon, title, description]) => (
          <div
            key={title}
            style={{
              background: "white",
              padding: "18px",
              borderRadius: "15px",
              marginBottom: "12px",
              display: "flex",
              gap: "14px",
              alignItems: "center",
              boxShadow:
                "0 3px 12px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontSize: "25px" }}>
              {icon}
            </span>

            <div>
              <strong>{title}</strong>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#777",
                  fontSize: "13px",
                }}
              >
                {description}
              </p>
            </div>
          </div>
        ))}

        <div
          style={{
            background: "#f1f8e9",
            padding: "18px",
            borderRadius: "15px",
            marginTop: "18px",
          }}
        >
          <strong>🛡️ Privacy & Security</strong>

          <p style={{ marginBottom: 0 }}>
            SmartProcure keeps your account and
            procurement information protected.
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     LANGUAGE
  ===================================================== */

  if (activePage === "language") {
    const languages = [
      {
        name: "English",
        native: "English",
        icon: "🇬🇧",
      },
      {
        name: "Tamil",
        native: "தமிழ்",
        icon: "🇮🇳",
      },
      {
        name: "Hindi",
        native: "हिन्दी",
        icon: "🇮🇳",
      },
    ];

    return (
      <div className="page-container">
        <PageHeader
          icon="🌐"
          title="Language"
          subtitle="Choose your preferred language"
        />

        <div
          style={{
            background: "white",
            padding: "22px",
            borderRadius: "18px",
            boxShadow:
              "0 5px 18px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#087a3d",
            }}
          >
            Select Language
          </h2>

          <p style={{ color: "#666" }}>
            Select one language for the SmartProcure
            application.
          </p>

          {/* ENGLISH */}
          <button
            onClick={() =>
              setSelectedLanguage("English")
            }
            style={{
              width: "100%",
              padding: "18px",
              marginTop: "12px",
              borderRadius: "14px",
              border:
                selectedLanguage === "English"
                  ? "2px solid #2e7d32"
                  : "1px solid #ddd",
              background:
                selectedLanguage === "English"
                  ? "#e8f5e9"
                  : "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              color: "#222",
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: "25px" }}>
              🇬🇧
            </span>

            <div style={{ flex: 1 }}>
              <strong>English</strong>
              <p
                style={{
                  margin: "4px 0 0",
                  color: "#777",
                }}
              >
                English
              </p>
            </div>

            {selectedLanguage === "English" && (
              <span>✓</span>
            )}
          </button>

          {/* TAMIL */}
          <button
            onClick={() =>
              setSelectedLanguage("Tamil")
            }
            style={{
              width: "100%",
              padding: "18px",
              marginTop: "12px",
              borderRadius: "14px",
              border:
                selectedLanguage === "Tamil"
                  ? "2px solid #2e7d32"
                  : "1px solid #ddd",
              background:
                selectedLanguage === "Tamil"
                  ? "#e8f5e9"
                  : "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              color: "#222",
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: "25px" }}>
              🇮🇳
            </span>

            <div style={{ flex: 1 }}>
              <strong>Tamil</strong>
              <p
                style={{
                  margin: "4px 0 0",
                  color: "#777",
                }}
              >
                தமிழ்
              </p>
            </div>

            {selectedLanguage === "Tamil" && (
              <span>✓</span>
            )}
          </button>

          {/* HINDI */}
          <button
            onClick={() =>
              setSelectedLanguage("Hindi")
            }
            style={{
              width: "100%",
              padding: "18px",
              marginTop: "12px",
              borderRadius: "14px",
              border:
                selectedLanguage === "Hindi"
                  ? "2px solid #2e7d32"
                  : "1px solid #ddd",
              background:
                selectedLanguage === "Hindi"
                  ? "#e8f5e9"
                  : "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              color: "#222",
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: "25px" }}>
              🇮🇳
            </span>

            <div style={{ flex: 1 }}>
              <strong>Hindi</strong>
              <p
                style={{
                  margin: "4px 0 0",
                  color: "#777",
                }}
              >
                हिन्दी
              </p>
            </div>

            {selectedLanguage === "Hindi" && (
              <span>✓</span>
            )}
          </button>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#f1f8e9",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            Selected Language:{" "}
            <strong>{selectedLanguage}</strong>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
/* =========================================================
   PROCUREMENT CENTRE DASHBOARD
========================================================= */

function ProcurementCentre({
  onLogout,
}) {
  const [processingStep, setProcessingStep] =
    useState(1);

  const [currentToken, setCurrentToken] =
    useState("B021");

  const steps = [
    "Arrival",
    "Weighing",
    "Quality Check",
    "Complete",
  ];

  const queue = [
    {
      token: "B021",
      name: "Ramesh",
      crop: "Paddy",
    },
    {
      token: "B022",
      name: "Suresh",
      crop: "Paddy",
    },
    {
      token: "B023",
      name: "Kumar",
      crop: "Wheat",
    },
    {
      token: "B024",
      name: "Murugan",
      crop: "Paddy",
    },
  ];

  const nextStep = () => {
    if (processingStep < 4) {
      setProcessingStep(
        processingStep + 1
      );
    }
  };

  const callNext = () => {
    const number =
      parseInt(
        currentToken.substring(1)
      ) + 1;

    setCurrentToken(
      "B" +
        String(number).padStart(3, "0")
    );

    setProcessingStep(1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7f5",
        paddingBottom: "30px",
      }}
    >
      <div
        style={{
          background: "#2e7d32",
          color: "white",
          padding: "25px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  opacity: 0.8,
                }}
              >
                Procurement Centre
              </p>

              <h1
                style={{
                  margin: "5px 0",
                }}
              >
                Centre B - Salem
              </h1>
            </div>

            <button
              onClick={onLogout}
              style={{
                background:
                  "rgba(255,255,255,0.15)",
                color: "white",
                border:
                  "1px solid rgba(255,255,255,0.4)",
                padding: "9px 15px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "25px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
          }}
        >
          {[
            [
              "📅",
              "42",
              "Today's Bookings",
            ],
            [
              "⏳",
              "8",
              "Waiting",
            ],
            [
              "🎫",
              currentToken,
              "Current Token",
            ],
            [
              "✓",
              "34",
              "Completed",
            ],
          ].map(
            ([icon, value, label]) => (
              <div
                key={label}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "15px",
                  boxShadow:
                    "0 3px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    fontSize: "25px",
                  }}
                >
                  {icon}
                </div>

                <h2
                  style={{
                    margin: "8px 0",
                  }}
                >
                  {value}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#666",
                  }}
                >
                  {label}
                </p>
              </div>
            )
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          {/* CURRENT FARMER */}

          <div
            style={{
              background: "white",
              padding: "22px",
              borderRadius: "16px",
            }}
          >
            <h2>Current Farmer</h2>

            <div
              style={{
                background: "#f1f8e9",
                padding: "15px",
                borderRadius: "12px",
              }}
            >
              <p style={{ margin: 0 }}>
                Token
              </p>

              <h1
                style={{
                  color: "#2e7d32",
                  margin: "5px 0",
                }}
              >
                {currentToken}
              </h1>

              <p>Farmer: Ramesh</p>
              <p>Crop: Paddy</p>
            </div>

            <h3
              style={{
                marginTop: "25px",
              }}
            >
              Processing Progress
            </h3>

            {steps.map(
              (step, index) => (
                <div
                  key={step}
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "10px",
                    marginBottom:
                      "12px",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius:
                        "50%",
                      background:
                        index + 1 <=
                        processingStep
                          ? "#2e7d32"
                          : "#ddd",
                      color:
                        index + 1 <=
                        processingStep
                          ? "white"
                          : "#666",
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                    }}
                  >
                    {index + 1}
                  </div>

                  <span>{step}</span>
                </div>
              )
            )}

            <button
              onClick={nextStep}
              disabled={
                processingStep === 4
              }
              className="primary-button"
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "12px",
              }}
            >
              {processingStep === 4
                ? "Processing Complete"
                : "Complete Current Step"}
            </button>

            <button
              onClick={callNext}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "12px",
                border:
                  "1px solid #2e7d32",
                borderRadius: "8px",
                background: "white",
                color: "#2e7d32",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              📢 Call Next Farmer
            </button>
          </div>

          {/* AI QUEUE */}

          <div
            style={{
              background: "white",
              padding: "22px",
              borderRadius: "16px",
            }}
          >
            <h2>
              AI Queue Prediction 🤖
            </h2>

            <div
              style={{
                background: "#fff8e1",
                padding: "18px",
                borderRadius: "12px",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                }}
              >
                Expected Peak
              </h3>

              <p>
                Highest queue expected
                between{" "}
                <strong>
                  11:00 AM - 1:00 PM
                </strong>
                .
              </p>

              <p>
                Predicted waiting time:
                <strong>
                  {" "}
                  42 minutes
                </strong>
              </p>

              <p>
                Recommended action:
                <strong>
                  {" "}
                  Add one processing
                  counter.
                </strong>
              </p>
            </div>

            <h2
              style={{
                marginTop: "25px",
              }}
            >
              Today's Queue
            </h2>

            {queue.map((item) => (
              <div
                key={item.token}
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  padding: "13px 0",
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                <div>
                  <strong>
                    {item.token}
                  </strong>

                  <div
                    style={{
                      color: "#666",
                    }}
                  >
                    {item.name} •{" "}
                    {item.crop}
                  </div>
                </div>

                <span
                  style={{
                    color: "#777",
                  }}
                >
                  Waiting
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#fff3e0",
            padding: "18px",
            borderRadius: "14px",
            marginTop: "20px",
          }}
        >
          ⚠️{" "}
          <strong>
            Centre Alert
          </strong>

          <p
            style={{
              marginBottom: 0,
            }}
          >
            Queue is expected to
            increase during the
            afternoon. Consider opening
            an additional counter.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DISTRICT ADMIN DASHBOARD
========================================================= */

function DistrictAdmin({
  onLogout,
}) {
  const centreData = [
    {
      name: "Centre A - Salem",
      farmers: 310,
      bookings: 52,
      procurement: "28.4 T",
      performance: "94%",
    },
    {
      name: "Centre B - Salem",
      farmers: 428,
      bookings: 68,
      procurement: "35.8 T",
      performance: "97%",
    },
    {
      name: "Centre C - Salem",
      farmers: 275,
      bookings: 41,
      procurement: "21.6 T",
      performance: "91%",
    },
    {
      name: "Centre D - Salem",
      farmers: 235,
      bookings: 25,
      procurement: "10.6 T",
      performance: "89%",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7f5",
        paddingBottom: "30px",
      }}
    >
      <div
        style={{
          background: "#1b5e20",
          color: "white",
          padding: "25px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  opacity: 0.8,
                }}
              >
                SmartProcure
              </p>

              <h1
                style={{
                  margin: "5px 0",
                }}
              >
                District Admin Dashboard
              </h1>

              <p
                style={{
                  margin: 0,
                }}
              >
                Salem District
              </p>
            </div>

            <button
              onClick={onLogout}
              style={{
                background:
                  "rgba(255,255,255,0.15)",
                color: "white",
                border:
                  "1px solid rgba(255,255,255,0.4)",
                padding: "9px 15px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "25px auto",
          padding: "0 20px",
        }}
      >
        {/* STAT CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          {[
            [
              "🏢",
              "24",
              "Procurement Centres",
            ],
            [
              "👨‍🌾",
              "1,248",
              "Registered Farmers",
            ],
            [
              "📅",
              "186",
              "Today's Bookings",
            ],
            [
              "🌾",
              "96.4 T",
              "Today's Procurement",
            ],
          ].map(
            ([icon, value, label]) => (
              <div
                key={label}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "15px",
                }}
              >
                <div
                  style={{
                    fontSize: "25px",
                  }}
                >
                  {icon}
                </div>

                <h2
                  style={{
                    margin: "8px 0",
                  }}
                >
                  {value}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#666",
                  }}
                >
                  {label}
                </p>
              </div>
            )
          )}
        </div>

        {/* TARGET / FORECAST */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "22px",
              borderRadius: "16px",
            }}
          >
            <h2>
              District Procurement
              Target
            </h2>

            <div
              style={{
                height: "16px",
                background: "#e0e0e0",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: "100%",
                  background: "#2e7d32",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginTop: "10px",
              }}
            >
              <strong>
                96.4 T
              </strong>

              <span>
                Target: 120 T
              </span>
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "22px",
              borderRadius: "16px",
            }}
          >
            <h2>
              AI District Forecast 🤖
            </h2>

            <p>
              Today's expected
              procurement:
              <strong>
                {" "}
                112 T
              </strong>
            </p>

            <p>
              Tomorrow's predicted
              demand:
              <strong>
                {" "}
                +14%
              </strong>
            </p>

            <p
              style={{
                marginBottom: 0,
              }}
            >
              Recommendation:
              <strong>
                {" "}
                Increase staffing at
                Centre B.
              </strong>
            </p>
          </div>
        </div>

        {/* TABLE */}

        <div
          style={{
            background: "white",
            padding: "22px",
            borderRadius: "16px",
            marginTop: "20px",
            overflowX: "auto",
          }}
        >
          <h2>
            Centre Performance
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
              minWidth: "650px",
            }}
          >
            <thead>
              <tr>
                <th style={tableHeader}>
                  Centre
                </th>

                <th style={tableHeader}>
                  Farmers
                </th>

                <th style={tableHeader}>
                  Bookings
                </th>

                <th style={tableHeader}>
                  Procurement
                </th>

                <th style={tableHeader}>
                  Performance
                </th>
              </tr>
            </thead>

            <tbody>
              {centreData.map(
                (centre) => (
                  <tr
                    key={centre.name}
                  >
                    <td style={tableCell}>
                      <strong>
                        {centre.name}
                      </strong>
                    </td>

                    <td style={tableCell}>
                      {centre.farmers}
                    </td>

                    <td style={tableCell}>
                      {centre.bookings}
                    </td>

                    <td style={tableCell}>
                      {centre.procurement}
                    </td>

                    <td
                      style={{
                        ...tableCell,
                        color: "#2e7d32",
                        fontWeight:
                          "bold",
                      }}
                    >
                      {centre.performance}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* ALERTS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              background: "#fff3e0",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3>
              ⚠️ Alerts
            </h3>

            <p>
              Centre B queue is above
              the normal threshold.
            </p>

            <p>
              Two centres require
              additional staff during
              afternoon hours.
            </p>
          </div>

          <div
            style={{
              background: "#e8f5e9",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3>
              📈 System Status
            </h3>

            <p>
              All centres connected.
            </p>

            <p>
              Booking system:
              Operational
            </p>

            <p>
              AI prediction engine:
              Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TABLE STYLES
========================================================= */

const tableHeader = {
  textAlign: "left",
  padding: "13px",
  borderBottom:
    "2px solid #eee",
};

const tableCell = {
  padding: "13px",
  borderBottom:
    "1px solid #eee",
};

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);
    const [farmer, setFarmer] = useState(null);

  const [
    showRoleSelection,
    setShowRoleSelection,
  ] = useState(false);

  const [role, setRole] =
    useState("");

  const [page, setPage] =
    useState("home");

  const [booking, setBooking] =
    useState({
      centre: "Centre B - Salem",
      date: "10 Sep 2026",
      time: "10:30 AM - 11:00 AM",
      token: "B024",
      confirmed: true,
    });

  /* =======================================================
     LOGIN
  ======================================================= */
if (!isLoggedIn) {
  return (
    <Login
      onLogin={(farmerData) => {
        setFarmer(farmerData);
        setIsLoggedIn(true);
        setPage("home");
      }}
      onRegister={() => setPage("register")}
    />
  );
}
if (page === "register") {
  return (
    <Register
      onBack={() => setPage("home")}
      onRegistered={() => setPage("home")}
    />
  );
}

  /* =======================================================
     ROLE SELECTION
  ======================================================= */

  if (
    showRoleSelection ||
    !role
  ) {
    return (
      <RoleSelection
        onBack={() => {
          setIsLoggedIn(false);
          setShowRoleSelection(
            false
          );
          setFarmer(null);
        }}
        onSelectRole={(
          selectedRole
        ) => {
          setRole(selectedRole);

          setShowRoleSelection(
            false
          );

          if (
            selectedRole ===
            "farmer"
          ) {
            setPage("home");
          }

          if (
            selectedRole ===
            "centre"
          ) {
            setPage("centre");
          }

          if (
            selectedRole ===
            "admin"
          ) {
            setPage("admin");
          }
        }}
      />
    );
  }

  /* =======================================================
     LOGOUT
  ======================================================= */

  const logout = () => {
    setIsLoggedIn(false);
    setRole("");
    setPage("home");
    setShowRoleSelection(
      false
    );
    setFarmer(null);
  };

  /* =======================================================
     PROCUREMENT CENTRE
  ======================================================= */

  if (role === "centre") {
    return (
      <ProcurementCentre
        onLogout={logout}
      />
    );
  }

  /* =======================================================
     DISTRICT ADMIN
  ======================================================= */

  if (role === "admin") {
    return (
      <DistrictAdmin
        onLogout={logout}
      />
    );
  }

  /* =======================================================
     FARMER PAGES
  ======================================================= */

  const renderFarmerPage = () => {
    switch (page) {
      case "home":
        return (
          <Home
            booking={booking}
            setPage={setPage}
            farmer={farmer}
          />
        );

      case "book":
        return (
          <BookSlot
            booking={booking}
            setBooking={setBooking}
            setPage={setPage}
            farmer={farmer}
          />
        );

      case "bookings":
        return (
          <MyBookings
            booking={booking}
            setPage={setPage}
            farmer={farmer}
          />
        );

      case "queue":
        return (
          <Queue
            booking={booking}
          />
        );

      case "payments":
        return <Payments />;

      case "more":
        return (
  <More
  onLogout={logout}
  farmer={farmer}
/>
        );

      default:
        return (
          <Home
            booking={booking}
            setPage={setPage}
            farmer={farmer}
          />
        );
    }
  };

  /* =======================================================
     FARMER APP UI
  ======================================================= */

  return (
    <div className="app">
      <header className="top-header">
        <div>
          <strong>
            SmartProcure
          </strong>

          <small>
            Farmer Portal
          </small>
        </div>

        <button
          onClick={logout}
          style={{
            border: "none",
            background:
              "transparent",
            cursor: "pointer",
            fontSize: "18px",
          }}
          title="Logout"
        >
          🚪
        </button>
      </header>

      <main>
        {renderFarmerPage()}
      </main>

      <nav className="bottom-nav">
        <button
          onClick={() =>
            setPage("home")
          }
          className={
            page === "home"
              ? "active"
              : ""
          }
        >
          <span>🏠</span>
          Home
        </button>

        <button
          onClick={() =>
            setPage("bookings")
          }
          className={
            page === "bookings"
              ? "active"
              : ""
          }
        >
          <span>📋</span>
          Bookings
        </button>

        <button
          onClick={() =>
            setPage("queue")
          }
          className={
            page === "queue"
              ? "active"
              : ""
          }
        >
          <span>🎫</span>
          Queue
        </button>

        <button
          onClick={() =>
            setPage("payments")
          }
          className={
            page === "payments"
              ? "active"
              : ""
          }
        >
          <span>💳</span>
          Payments
        </button>

        <button
          onClick={() =>
            setPage("more")
          }
          className={
            page === "more"
              ? "active"
              : ""
          }
        >
          <span>☰</span>
          More
        </button>
      </nav>
    </div>
  );
}

/* =========================================================
   EXPORT
========================================================= */

export default App;
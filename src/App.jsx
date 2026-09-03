import "./App.css";
import { useState } from "react";

/* =========================================================
   LOGIN PAGE
========================================================= */

function Login({ onLogin }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!mobile || !password) {
      setError("Please enter mobile number and password.");
      return;
    }

    if (mobile !== "9876543210" || password !== "1234") {
      setError("Invalid login details. Use the demo credentials.");
      return;
    }

    setError("");
    onLogin();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f8f1",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "white",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "20px",
              background: "#2e7d32",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              margin: "0 auto 15px",
            }}
          >
            🌾
          </div>

          <h1
            style={{
              margin: 0,
              color: "#246b2a",
              fontSize: "30px",
            }}
          >
            SmartProcure
          </h1>

          <p style={{ color: "#666", marginTop: "8px" }}>
            Smart Agricultural Procurement System
          </p>
        </div>

        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        <label>Mobile Number</label>

        <input
          type="text"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={{
            width: "100%",
            padding: "13px",
            marginTop: "7px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxSizing: "border-box",
          }}
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "13px",
            marginTop: "7px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p style={{ color: "#d32f2f", fontSize: "14px" }}>{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="primary-button"
          style={{
            width: "100%",
            marginTop: "8px",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            background: "#f1f8e9",
            borderRadius: "10px",
            fontSize: "13px",
            color: "#555",
          }}
        >
          <strong>Demo Login</strong>
          <br />
          Mobile: 9876543210
          <br />
          Password: 1234
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ROLE SELECTION
========================================================= */

function RoleSelection({ onSelectRole, onBack }) {
  const roles = [
    {
      id: "farmer",
      icon: "👨‍🌾",
      title: "Farmer",
      description: "Book procurement slots and track your produce.",
    },
    {
      id: "centre",
      icon: "🏢",
      title: "Procurement Centre",
      description: "Manage farmers, queues and procurement.",
    },
    {
      id: "admin",
      icon: "📊",
      title: "District Admin",
      description: "Monitor district-wide procurement operations.",
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

        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <h1 style={{ color: "#246b2a" }}>Welcome to SmartProcure</h1>

          <p style={{ color: "#666" }}>
            Select your role to continue
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
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
                boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontSize: "45px", marginBottom: "15px" }}>
                {role.icon}
              </div>

              <h2 style={{ margin: "5px 0", color: "#246b2a" }}>
                {role.title}
              </h2>

              <p style={{ color: "#666", lineHeight: "1.5" }}>
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

function Home({ booking, setPage }) {
  return (
    <div className="page-container">
      <div className="welcome-section">
        <p className="small-text">Good morning 👋</p>

        <h1>Welcome, Farmer</h1>

        <p className="muted-text">
          Manage your procurement easily with SmartProcure.
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
            <p style={{ margin: 0, opacity: 0.8 }}>Current Booking</p>

            <h2 style={{ margin: "7px 0" }}>{booking.centre}</h2>

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
          gridTemplateColumns: "repeat(2, 1fr)",
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

      <div className="section-header" style={{ marginTop: "25px" }}>
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
        <strong>Recommended Centre: Centre B - Salem</strong>

        <p style={{ marginBottom: 0 }}>
          AI predicts approximately <b>18 minutes</b> waiting time
          based on current queue conditions.
        </p>
      </div>

      <div className="section-header" style={{ marginTop: "25px" }}>
        <h2>Recent Activity</h2>
      </div>

      <div className="booking-card">
        <div>
          <strong>Slot booked successfully</strong>
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

function BookSlot({ booking, setBooking, setPage }) {
  const [centre, setCentre] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [error, setError] = useState("");

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

  const confirmBooking = () => {
    if (!centre || !date || !time) {
      setError("Please select centre, date and time.");
      return;
    }

    const formattedDate = new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

    const newToken =
      "B" + String(Math.floor(Math.random() * 800) + 100);

    setBooking({
      centre,
      date: formattedDate,
      time,
      token: newToken,
      confirmed: true,
    });

    setError("");
    setBookingConfirmed(true);
  };

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
            Your procurement slot has been successfully booked.
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
              <strong>Centre:</strong> {booking.centre}
            </p>

            <p>
              <strong>Date:</strong> {booking.date}
            </p>

            <p>
              <strong>Time:</strong> {booking.time}
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
              <small>Your Token Number</small>

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
            onClick={() => setPage("bookings")}
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

  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>Book Procurement Slot</h1>
        <p>Select your preferred centre, date and time.</p>
      </div>

      <h2>1. Select Centre</h2>

      <div>
        {centres.map((item) => (
          <button
            key={item.name}
            onClick={() => setCentre(item.name)}
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
                centre === item.name ? "#f1f8e9" : "white",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <strong>{item.name}</strong>

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
              📍 {item.distance} &nbsp; • &nbsp; ⏱️{" "}
              {item.wait} wait
            </p>
          </button>
        ))}
      </div>

      <h2 style={{ marginTop: "25px" }}>2. Select Date</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          width: "100%",
          padding: "13px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxSizing: "border-box",
        }}
      />

      <h2 style={{ marginTop: "25px" }}>3. Select Time</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
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
            onClick={() => setTime(slot)}
            style={{
              padding: "13px 8px",
              borderRadius: "10px",
              border:
                time === slot
                  ? "2px solid #2e7d32"
                  : "1px solid #ddd",
              background:
                time === slot ? "#e8f5e9" : "white",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            {slot}
          </button>
        ))}
      </div>

      {error && (
        <p style={{ color: "#d32f2f", marginTop: "15px" }}>
          {error}
        </p>
      )}

      <button
        onClick={confirmBooking}
        className="primary-button"
        style={{
          width: "100%",
          marginTop: "25px",
        }}
      >
        Confirm Booking
      </button>
    </div>
  );
}

/* =========================================================
   MY BOOKINGS
========================================================= */

function MyBookings({ booking, setPage }) {
  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>My Bookings</h1>
        <p>View your procurement bookings.</p>
      </div>

      <div className="booking-card">
        <div>
          <span
            style={{
              background: "#e8f5e9",
              color: "#2e7d32",
              padding: "5px 10px",
              borderRadius: "20px",
              fontSize: "12px",
            }}
          >
            CONFIRMED
          </span>

          <h2>{booking.centre}</h2>

          <p>📅 {booking.date}</p>

          <p>⏰ {booking.time}</p>

          <p>
            🎫 Token: <strong>{booking.token}</strong>
          </p>
        </div>

        <button
          onClick={() => setPage("queue")}
          className="primary-button"
        >
          Track Queue
        </button>
      </div>

      <h2 style={{ marginTop: "30px" }}>Booking History</h2>

      <div className="booking-card">
        <div>
          <strong>Centre A - Salem</strong>
          <p>02 Sep 2026 • 09:30 AM</p>
        </div>

        <span
          style={{
            color: "#2e7d32",
            fontWeight: "bold",
          }}
        >
          Completed
        </span>
      </div>

      <div className="booking-card">
        <div>
          <strong>Centre B - Salem</strong>
          <p>28 Aug 2026 • 10:00 AM</p>
        </div>

        <span
          style={{
            color: "#2e7d32",
            fontWeight: "bold",
          }}
        >
          Completed
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   QUEUE
========================================================= */

function Queue({ booking }) {
  const queue = [
    { token: "B021", farmer: "Farmer 21", status: "Processing" },
    { token: "B022", farmer: "Farmer 22", status: "Waiting" },
    { token: "B023", farmer: "Farmer 23", status: "Waiting" },
    { token: booking.token, farmer: "You", status: "Waiting" },
  ];

  const yourIndex = queue.findIndex(
    (item) => item.token === booking.token
  );

  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>Live Queue</h1>
        <p>Track your position in real time.</p>
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
        <p style={{ margin: 0 }}>Your Token</p>

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
          <strong>{Math.max(yourIndex, 1) * 12} minutes</strong>{" "}
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
              item.token === booking.token
                ? "#f1f8e9"
                : "white",
            border:
              item.token === booking.token
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
            <strong>{item.token}</strong>

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
                item.status === "Processing"
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
        🤖 <strong>AI Queue Prediction</strong>

        <p style={{ marginBottom: 0 }}>
          Based on current processing speed, your estimated
          waiting time is around{" "}
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
        <p>Track your procurement payments.</p>
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
        <p style={{ opacity: 0.8 }}>Total Received</p>

        <h1 style={{ margin: "5px 0" }}>₹12,450</h1>

        <p style={{ marginBottom: 0 }}>
          Last payment: 02 Sep 2026
        </p>
      </div>

      <h2>Payment History</h2>

      <div className="booking-card">
        <div>
          <strong>Procurement Payment</strong>
          <p>02 Sep 2026 • Centre A</p>
        </div>

        <strong style={{ color: "#2e7d32" }}>
          +₹12,450
        </strong>
      </div>

      <div className="booking-card">
        <div>
          <strong>Procurement Payment</strong>
          <p>25 Aug 2026 • Centre B</p>
        </div>

        <strong style={{ color: "#2e7d32" }}>
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
        <strong>Payment Status</strong>

        <p style={{ marginBottom: 0 }}>
          All recent payments have been successfully processed.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   FARMER MORE
========================================================= */

function More({ onLogout }) {
  const options = [
    ["👤", "My Profile"],
    ["🌾", "My Farm Details"],
    ["📄", "Documents"],
    ["🔔", "Notifications"],
    ["❓", "Help & Support"],
    ["⚙️", "Settings"],
  ];

  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>More</h1>
        <p>Account and application settings.</p>
      </div>

      {options.map(([icon, title]) => (
        <button
          key={title}
          style={{
            width: "100%",
            padding: "17px",
            background: "white",
            border: "1px solid #eee",
            borderRadius: "12px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <span style={{ fontSize: "22px" }}>{icon}</span>

          <strong>{title}</strong>

          <span style={{ marginLeft: "auto" }}>›</span>
        </button>
      ))}

      <button
        onClick={onLogout}
        style={{
          width: "100%",
          marginTop: "25px",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #d32f2f",
          color: "#d32f2f",
          background: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

/* =========================================================
   PROCUREMENT CENTRE DASHBOARD
========================================================= */

function ProcurementCentre({ onLogout }) {
  const [processingStep, setProcessingStep] = useState(1);
  const [currentToken, setCurrentToken] = useState("B021");

  const steps = [
    "Arrival",
    "Weighing",
    "Quality Check",
    "Complete",
  ];

  const queue = [
    { token: "B021", name: "Ramesh", crop: "Paddy" },
    { token: "B022", name: "Suresh", crop: "Paddy" },
    { token: "B023", name: "Kumar", crop: "Wheat" },
    { token: "B024", name: "Murugan", crop: "Paddy" },
  ];

  const nextStep = () => {
    if (processingStep < 4) {
      setProcessingStep(processingStep + 1);
    }
  };

  const callNext = () => {
    const number = parseInt(currentToken.substring(1)) + 1;

    setCurrentToken("B" + String(number).padStart(3, "0"));
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
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ margin: 0, opacity: 0.8 }}>
                Procurement Centre
              </p>

              <h1 style={{ margin: "5px 0" }}>
                Centre B - Salem
              </h1>
            </div>

            <button
              onClick={onLogout}
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.4)",
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
            ["📅", "42", "Today's Bookings"],
            ["⏳", "8", "Waiting"],
            ["🎫", currentToken, "Current Token"],
            ["✓", "34", "Completed"],
          ].map(([icon, value, label]) => (
            <div
              key={label}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: "25px" }}>{icon}</div>

              <h2 style={{ margin: "8px 0" }}>{value}</h2>

              <p style={{ margin: 0, color: "#666" }}>
                {label}
              </p>
            </div>
          ))}
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
              <p style={{ margin: 0 }}>Token</p>

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

            <h3 style={{ marginTop: "25px" }}>
              Processing Progress
            </h3>

            {steps.map((step, index) => (
              <div
                key={step}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background:
                      index + 1 <= processingStep
                        ? "#2e7d32"
                        : "#ddd",
                    color:
                      index + 1 <= processingStep
                        ? "white"
                        : "#666",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {index + 1}
                </div>

                <span>{step}</span>
              </div>
            ))}

            <button
              onClick={nextStep}
              disabled={processingStep === 4}
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
                border: "1px solid #2e7d32",
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

          <div
            style={{
              background: "white",
              padding: "22px",
              borderRadius: "16px",
            }}
          >
            <h2>AI Queue Prediction 🤖</h2>

            <div
              style={{
                background: "#fff8e1",
                padding: "18px",
                borderRadius: "12px",
              }}
            >
              <h3 style={{ marginTop: 0 }}>
                Expected Peak
              </h3>

              <p>
                Highest queue expected between{" "}
                <strong>11:00 AM - 1:00 PM</strong>.
              </p>

              <p>
                Predicted waiting time:
                <strong> 42 minutes</strong>
              </p>

              <p>
                Recommended action:
                <strong> Add one processing counter.</strong>
              </p>
            </div>

            <h2 style={{ marginTop: "25px" }}>
              Today's Queue
            </h2>

            {queue.map((item) => (
              <div
                key={item.token}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "13px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div>
                  <strong>{item.token}</strong>
                  <div style={{ color: "#666" }}>
                    {item.name} • {item.crop}
                  </div>
                </div>

                <span style={{ color: "#777" }}>
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
          ⚠️ <strong>Centre Alert</strong>

          <p style={{ marginBottom: 0 }}>
            Queue is expected to increase during the afternoon.
            Consider opening an additional counter.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DISTRICT ADMIN DASHBOARD
========================================================= */

function DistrictAdmin({ onLogout }) {
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
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ margin: 0, opacity: 0.8 }}>
                SmartProcure
              </p>

              <h1 style={{ margin: "5px 0" }}>
                District Admin Dashboard
              </h1>

              <p style={{ margin: 0 }}>
                Salem District
              </p>
            </div>

            <button
              onClick={onLogout}
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.4)",
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          {[
            ["🏢", "24", "Procurement Centres"],
            ["👨‍🌾", "1,248", "Registered Farmers"],
            ["📅", "186", "Today's Bookings"],
            ["🌾", "96.4 T", "Today's Procurement"],
          ].map(([icon, value, label]) => (
            <div
              key={label}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <div style={{ fontSize: "25px" }}>{icon}</div>

              <h2 style={{ margin: "8px 0" }}>{value}</h2>

              <p style={{ margin: 0, color: "#666" }}>
                {label}
              </p>
            </div>
          ))}
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
          <div
            style={{
              background: "white",
              padding: "22px",
              borderRadius: "16px",
            }}
          >
            <h2>District Procurement Target</h2>

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
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <strong>96.4 T</strong>
              <span>Target: 120 T</span>
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "22px",
              borderRadius: "16px",
            }}
          >
            <h2>AI District Forecast 🤖</h2>

            <p>
              Today's expected procurement:
              <strong> 112 T</strong>
            </p>

            <p>
              Tomorrow's predicted demand:
              <strong> +14%</strong>
            </p>

            <p style={{ marginBottom: 0 }}>
              Recommendation:
              <strong> Increase staffing at Centre B.</strong>
            </p>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "22px",
            borderRadius: "16px",
            marginTop: "20px",
            overflowX: "auto",
          }}
        >
          <h2>Centre Performance</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "650px",
            }}
          >
            <thead>
              <tr>
                <th style={tableHeader}>Centre</th>
                <th style={tableHeader}>Farmers</th>
                <th style={tableHeader}>Bookings</th>
                <th style={tableHeader}>Procurement</th>
                <th style={tableHeader}>Performance</th>
              </tr>
            </thead>

            <tbody>
              {centreData.map((centre) => (
                <tr key={centre.name}>
                  <td style={tableCell}>
                    <strong>{centre.name}</strong>
                  </td>

                  <td style={tableCell}>{centre.farmers}</td>

                  <td style={tableCell}>{centre.bookings}</td>

                  <td style={tableCell}>
                    {centre.procurement}
                  </td>

                  <td
                    style={{
                      ...tableCell,
                      color: "#2e7d32",
                      fontWeight: "bold",
                    }}
                  >
                    {centre.performance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
            <h3>⚠️ Alerts</h3>

            <p>
              Centre B queue is above the normal threshold.
            </p>

            <p>
              Two centres require additional staff during
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
            <h3>📈 System Status</h3>

            <p>All centres connected.</p>

            <p>Booking system: Operational</p>

            <p>AI prediction engine: Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const tableHeader = {
  textAlign: "left",
  padding: "13px",
  borderBottom: "2px solid #eee",
};

const tableCell = {
  padding: "13px",
  borderBottom: "1px solid #eee",
};

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRoleSelection, setShowRoleSelection] =
    useState(false);

  const [role, setRole] = useState("");

  const [page, setPage] = useState("home");

  const [booking, setBooking] = useState({
    centre: "Centre B - Salem",
    date: "10 Sep 2026",
    time: "10:30 AM - 11:00 AM",
    token: "B024",
    confirmed: true,
  });

  /* LOGIN */
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() => {
          setIsLoggedIn(true);
          setShowRoleSelection(true);
        }}
      />
    );
  }

  /* ROLE SELECTION */
  if (showRoleSelection || !role) {
    return (
      <RoleSelection
        onBack={() => {
          setIsLoggedIn(false);
          setShowRoleSelection(false);
        }}
        onSelectRole={(selectedRole) => {
          setRole(selectedRole);
          setShowRoleSelection(false);

          if (selectedRole === "farmer") {
            setPage("home");
          }

          if (selectedRole === "centre") {
            setPage("centre");
          }

          if (selectedRole === "admin") {
            setPage("admin");
          }
        }}
      />
    );
  }

  /* LOGOUT */
  const logout = () => {
    setIsLoggedIn(false);
    setRole("");
    setPage("home");
    setShowRoleSelection(false);
  };

  /* =======================================================
     PROCUREMENT CENTRE
  ======================================================= */

  if (role === "centre") {
    return <ProcurementCentre onLogout={logout} />;
  }

  /* =======================================================
     DISTRICT ADMIN
  ======================================================= */

  if (role === "admin") {
    return <DistrictAdmin onLogout={logout} />;
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
          />
        );

      case "book":
        return (
          <BookSlot
            booking={booking}
            setBooking={setBooking}
            setPage={setPage}
          />
        );

      case "bookings":
        return (
          <MyBookings
            booking={booking}
            setPage={setPage}
          />
        );

      case "queue":
        return <Queue booking={booking} />;

      case "payments":
        return <Payments />;

      case "more":
        return <More onLogout={logout} />;

      default:
        return (
          <Home
            booking={booking}
            setPage={setPage}
          />
        );
    }
  };

  return (
    <div className="app">
      <header className="top-header">
        <div>
          <strong>SmartProcure</strong>
          <small>Farmer Portal</small>
        </div>

        <button
          onClick={logout}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "18px",
          }}
          title="Logout"
        >
          🚪
        </button>
      </header>

      <main>{renderFarmerPage()}</main>

      <nav className="bottom-nav">
        <button
          onClick={() => setPage("home")}
          className={page === "home" ? "active" : ""}
        >
          <span>🏠</span>
          Home
        </button>

        <button
          onClick={() => setPage("bookings")}
          className={page === "bookings" ? "active" : ""}
        >
          <span>📋</span>
          Bookings
        </button>

        <button
          onClick={() => setPage("queue")}
          className={page === "queue" ? "active" : ""}
        >
          <span>🎫</span>
          Queue
        </button>

        <button
          onClick={() => setPage("payments")}
          className={page === "payments" ? "active" : ""}
        >
          <span>💳</span>
          Payments
        </button>

        <button
          onClick={() => setPage("more")}
          className={page === "more" ? "active" : ""}
        >
          <span>☰</span>
          More
        </button>
      </nav>
    </div>
  );
}

export default App;
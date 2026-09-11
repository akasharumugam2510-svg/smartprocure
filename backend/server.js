const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5000;

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());

// Show every request in terminal
app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.url);
    next();
});

// ===============================
// HOME
// ===============================
app.get("/", (req, res) => {
    res.json({
        message: "SmartProcure Backend is running!"
    });
});

// ===============================
// FARMER REGISTRATION
// ===============================
app.post("/api/farmers/register", (req, res) => {

    console.log("REGISTER API CALLED");
    console.log("BODY RECEIVED:", req.body);

    const {
        name,
        mobile,
        password,
        village,
        district
    } = req.body;

    console.log("NAME:", name);
    console.log("MOBILE:", mobile);
    console.log("PASSWORD:", password);

    // Validation
    if (!name || !mobile || !password) {
        return res.status(400).json({
            message: "Name, mobile and password are required"
        });
    }

    const sql = `
        INSERT INTO farmers
        (name, mobile, password, village, district)
        VALUES (?, ?, ?, ?, ?)
    `;

    console.log("ABOUT TO INSERT INTO MYSQL");

    db.query(
        sql,
        [
            name,
            mobile,
            password,
            village || "",
            district || ""
        ],
        (err, result) => {

            console.log("MYSQL QUERY FINISHED");

            if (err) {
                console.error("Registration database error:", err);

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        message: "Mobile number already registered"
                    });
                }

                return res.status(500).json({
                    message: "Failed to register farmer",
                    error: err.message
                });
            }

            console.log("FARMER INSERTED:", result.insertId);

            return res.status(201).json({
                message: "Farmer registered successfully",
                farmerId: result.insertId
            });
        }
    );
});

// ===============================
// FARMER LOGIN
// ===============================
app.post("/api/farmers/login", (req, res) => {

    const {
        mobile,
        password
    } = req.body;

    if (!mobile || !password) {
        return res.status(400).json({
            message: "Mobile and password are required"
        });
    }

    const sql = `
        SELECT id, name, mobile, village, district
        FROM farmers
        WHERE mobile = ? AND password = ?
    `;

    db.query(
        sql,
        [mobile, password],
        (err, result) => {

            if (err) {
                console.error("Login database error:", err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (result.length === 0) {
                return res.status(401).json({
                    message: "Invalid mobile number or password"
                });
            }

            return res.json({
                message: "Login successful",
                farmer: result[0]
            });
        }
    );
});

// ===============================
// CREATE BOOKING
// ===============================
app.post("/api/bookings", (req, res) => {

    const {
        farmer_id,
        centre,
        booking_date,
        booking_time,
        token
    } = req.body;

    if (
        !farmer_id ||
        !centre ||
        !booking_date ||
        !booking_time ||
        !token
    ) {
        return res.status(400).json({
            message: "All booking details are required"
        });
    }

    const sql = `
        INSERT INTO bookings
        (farmer_id, centre, booking_date, booking_time, token, status)
        VALUES (?, ?, ?, ?, ?, 'CONFIRMED')
    `;

    db.query(
        sql,
        [
            farmer_id,
            centre,
            booking_date,
            booking_time,
            token
        ],
        (err, result) => {

            if (err) {
                console.error("Booking database error:", err);

                return res.status(500).json({
                    message: "Failed to create booking"
                });
            }

            return res.status(201).json({
                message: "Booking created successfully",
                bookingId: result.insertId
            });
        }
    );
});

// ===============================
// GET FARMER BOOKINGS
// ===============================
app.get("/api/bookings/:farmerId", (req, res) => {

    const { farmerId } = req.params;

    const sql = `
        SELECT
            id,
            farmer_id,
            centre,
            booking_date,
            booking_time,
            token,
            status,
            created_at
        FROM bookings
        WHERE farmer_id = ?
        ORDER BY id DESC
    `;

    db.query(
        sql,
        [farmerId],
        (err, results) => {

            if (err) {
                console.error("Fetch bookings error:", err);

                return res.status(500).json({
                    message: "Failed to fetch bookings"
                });
            }

            return res.json(results);
        }
    );
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, "0.0.0.0", () => {
    console.log(`SmartProcure backend running on port ${PORT}`);
});
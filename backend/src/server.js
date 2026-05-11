const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const THRESHOLDS = {
    glucoseHigh: 180,
    glucoseWarning: 140,
    heartRateLow: 55,
    heartRateHigh: 110,
    temperatureHigh: 100.4,
    systolicHigh: 140,
    diastolicHigh: 90
};

function buildAlertFromVitals(vital) {
    const alerts = [];

    if (vital.glucose >= THRESHOLDS.glucoseHigh) {
        alerts.push(["critical", "High glucose detected", `Glucose is ${vital.glucose} mg/dL. Immediate attention recommended.`]);
    } else if (vital.glucose >= THRESHOLDS.glucoseWarning) {
        alerts.push(["warning", "Glucose above safe range", `Glucose is ${vital.glucose} mg/dL. Monitor diet and medication.`]);
    }

    if (vital.systolic >= THRESHOLDS.systolicHigh || vital.diastolic >= THRESHOLDS.diastolicHigh) {
        alerts.push(["warning", "Blood pressure elevated", `BP is ${vital.systolic}/${vital.diastolic} mmHg.`]);
    }

    if (vital.heart_rate <= THRESHOLDS.heartRateLow || vital.heart_rate >= THRESHOLDS.heartRateHigh) {
        alerts.push(["critical", "Abnormal heart rate", `Heart rate is ${vital.heart_rate} BPM.`]);
    }

    if (vital.temperature >= THRESHOLDS.temperatureHigh) {
        alerts.push(["warning", "Temperature elevated", `Temperature is ${vital.temperature} F.`]);
    }

    return alerts;
}

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "chronic-care-api" });
});

app.post("/api/auth/login", async(req, res) => {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM patients ORDER BY id ASC LIMIT 1");
    const patient = rows[0];

    if (!patient) {
        return res.status(404).json({ message: "Patient data not found" });
    }

    res.json({
        token: "demo-token",
        patient: {
            id: patient.id,
            name: patient.name,
            email: email || patient.email,
            age: patient.age,
            condition_name: patient.condition_name
        }
    });
});

app.get("/api/patients/:id", async(req, res) => {
    const [rows] = await pool.query("SELECT * FROM patients WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Patient not found" });
    res.json(rows[0]);
});

app.get("/api/patients/:id/dashboard", async(req, res) => {
    const patientId = req.params.id;
    const [
        [patient]
    ] = await pool.query("SELECT * FROM patients WHERE id = ?", [patientId]);
    const [vitals] = await pool.query("SELECT * FROM vitals WHERE patient_id = ? ORDER BY recorded_at DESC LIMIT 10", [patientId]);
    const [alerts] = await pool.query("SELECT * FROM alerts WHERE patient_id = ? ORDER BY created_at DESC LIMIT 8", [patientId]);
    const [medications] = await pool.query("SELECT * FROM medications WHERE patient_id = ? ORDER BY medication_time ASC", [patientId]);
    const [notes] = await pool.query("SELECT * FROM doctor_notes WHERE patient_id = ? ORDER BY created_at DESC LIMIT 5", [patientId]);

    res.json({ patient, vitals: vitals.reverse(), alerts, medications, notes });
});

app.get("/api/patients/:id/vitals", async(req, res) => {
    const [rows] = await pool.query("SELECT * FROM vitals WHERE patient_id = ? ORDER BY recorded_at DESC", [req.params.id]);
    res.json(rows);
});

app.post("/api/patients/:id/vitals", async(req, res) => {
    const patientId = req.params.id;
    const { systolic, diastolic, glucose, heart_rate, temperature } = req.body;

    const [result] = await pool.query(
        "INSERT INTO vitals (patient_id, systolic, diastolic, glucose, heart_rate, temperature) VALUES (?, ?, ?, ?, ?, ?)", [patientId, systolic, diastolic, glucose, heart_rate, temperature]
    );

    const vital = { id: result.insertId, patient_id: patientId, systolic, diastolic, glucose, heart_rate, temperature };
    const alerts = buildAlertFromVitals(vital);

    for (const [severity, title, message] of alerts) {
        await pool.query(
            "INSERT INTO alerts (patient_id, severity, title, message) VALUES (?, ?, ?, ?)", [patientId, severity, title, message]
        );
    }

    res.status(201).json({ vital, alertsCreated: alerts.length });
});

app.get("/api/patients/:id/medications", async(req, res) => {
    const [rows] = await pool.query("SELECT * FROM medications WHERE patient_id = ? ORDER BY medication_time", [req.params.id]);
    res.json(rows);
});

app.patch("/api/medications/:id/toggle", async(req, res) => {
    const [rows] = await pool.query("SELECT is_taken FROM medications WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Medication not found" });

    const nextValue = rows[0].is_taken ? 0 : 1;
    await pool.query("UPDATE medications SET is_taken = ? WHERE id = ?", [nextValue, req.params.id]);
    res.json({ id: Number(req.params.id), is_taken: Boolean(nextValue) });
});

app.get("/api/patients/:id/notes", async(req, res) => {
    const [rows] = await pool.query("SELECT * FROM doctor_notes WHERE patient_id = ? ORDER BY created_at DESC", [req.params.id]);
    res.json(rows);
});

app.post("/api/patients/:id/notes", async(req, res) => {
    const { doctor_name, severity, note } = req.body;
    const [result] = await pool.query(
        "INSERT INTO doctor_notes (patient_id, doctor_name, severity, note) VALUES (?, ?, ?, ?)", [req.params.id, doctor_name, severity, note]
    );
    res.status(201).json({ id: result.insertId, doctor_name, severity, note });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Server error", detail: err.message });
});

app.listen(PORT, () => {
    console.log(`Chronic care API running at http://localhost:${PORT}`);
});
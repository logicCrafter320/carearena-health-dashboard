const API_BASE =
    import.meta.env.VITE_API_BASE || "";

// ── Per-patient demo stores (offline fallback only) ────────────────────────
const demoStores = {};

function getDemoStore(patientId, sessionPatient) {
    if (!demoStores[patientId]) {
        demoStores[patientId] = {
            patient: sessionPatient || {
                id: patientId,
                name: "Demo Patient",
                email: "",
                age: 0,
                gender: "",
                phone: "",
                address: "",
                condition_name: "Chronic Condition",
                emergency_contact: "",
                doctor_name: "Dr. Demo"
            },
            vitals: [
                { id: 1, patient_id: patientId, systolic: 128, diastolic: 82, glucose: 134, heart_rate: 76, temperature: 98.4, recorded_at: "2026-05-03T19:59:00" },
                { id: 2, patient_id: patientId, systolic: 132, diastolic: 84, glucose: 148, heart_rate: 81, temperature: 98.6, recorded_at: "2026-05-04T19:59:00" },
                { id: 3, patient_id: patientId, systolic: 138, diastolic: 88, glucose: 166, heart_rate: 86, temperature: 99.0, recorded_at: "2026-05-05T19:59:00" },
                { id: 4, patient_id: patientId, systolic: 126, diastolic: 80, glucose: 139, heart_rate: 74, temperature: 98.3, recorded_at: "2026-05-06T19:59:00" },
                { id: 5, patient_id: patientId, systolic: 146, diastolic: 94, glucose: 182, heart_rate: 92, temperature: 99.2, recorded_at: "2026-05-07T19:59:00" },
                { id: 6, patient_id: patientId, systolic: 134, diastolic: 86, glucose: 151, heart_rate: 83, temperature: 98.5, recorded_at: "2026-05-08T19:59:00" },
                { id: 7, patient_id: patientId, systolic: 142, diastolic: 90, glucose: 171, heart_rate: 88, temperature: 98.8, recorded_at: "2026-05-09T19:59:00" }
            ],
            alerts: [
                { id: 1, patient_id: patientId, severity: "warning", title: "Warning", message: "Medication adherence dropped below 80%.", created_at: "2026-05-09T11:59:00" },
                { id: 2, patient_id: patientId, severity: "critical", title: "Critical", message: "Glucose level crossed the critical threshold.", created_at: "2026-05-08T19:59:00" },
                { id: 3, patient_id: patientId, severity: "warning", title: "Warning", message: "Blood pressure is above the recommended range.", created_at: "2026-05-07T19:59:00" }
            ],
            medications: [
                { id: 1, patient_id: patientId, medicine_name: "Metformin", dosage: "500 mg", medication_time: "08:00 AM", is_taken: true },
                { id: 2, patient_id: patientId, medicine_name: "Amlodipine", dosage: "5 mg", medication_time: "09:00 AM", is_taken: true },
                { id: 3, patient_id: patientId, medicine_name: "Vitamin D3", dosage: "1000 IU", medication_time: "01:00 PM", is_taken: true },
                { id: 4, patient_id: patientId, medicine_name: "Atorvastatin", dosage: "10 mg", medication_time: "09:00 PM", is_taken: false }
            ],
            notes: [
                { id: 1, patient_id: patientId, doctor_name: "Dr. Demo", severity: "routine", note: "Continue current medication schedule.", created_at: "2026-05-09T09:10:00" },
                { id: 2, patient_id: patientId, doctor_name: "Dr. Demo", severity: "follow-up", note: "Maintain fasting glucose log for the next 7 days.", created_at: "2026-05-08T10:20:00" }
            ]
        };
    }
    return demoStores[patientId];
}
// ───────────────────────────────────────────────────────────────────────────

async function request(path, options = {}) {
    if (!API_BASE) throw new Error("No API server configured");

    const response = await fetch(`${API_BASE}${path}`, {
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        ...options
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Request failed" }));
        throw new Error(error.message || "Request failed");
    }

    return response.json();
}

async function withFallback(apiCall, fallback) {
    try {
        return await apiCall();
    } catch {
        return fallback();
    }
}

function makeAlert(vital, patientId) {
    if (vital.glucose >= 180) return { severity: "critical", title: "Critical", message: "Glucose level crossed the critical threshold." };
    if (vital.systolic >= 140 || vital.diastolic >= 90) return { severity: "warning", title: "Warning", message: "Blood pressure is above the recommended range." };
    return null;
}

export const api = {
    // ── LOGIN ────────────────────────────────────────────────────────────────
    // Does NOT use withFallback — a 401 (wrong email) must surface as an error,
    // not silently fall through to the demo account.
    // Offline fallback only triggers when API_BASE is empty (Vercel demo mode).
    login: async(email, password) => {
        if (!API_BASE) {
            // Pure offline / Vercel demo: accept any credentials
            return {
                token: "demo-token",
                patient: {
                    id: 1,
                    name: "Demo Patient",
                    email: email || "demo@example.com",
                    age: 42,
                    gender: "Unknown",
                    phone: "",
                    address: "",
                    condition_name: "Type 2 Diabetes and Hypertension",
                    emergency_contact: "",
                    doctor_name: "Dr. Demo"
                }
            };
        }
        // Real backend: throw on bad credentials so Login.jsx shows the error
        return request("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        });
    },

    // ── DATA — all use real patientId ────────────────────────────────────────

    dashboard: (patientId, sessionPatient) => withFallback(
        () => request(`/patients/${patientId}/dashboard`),
        () => {
            const s = getDemoStore(patientId, sessionPatient);
            return { patient: s.patient, vitals: [...s.vitals], alerts: [...s.alerts], medications: [...s.medications], notes: [...s.notes] };
        }
    ),

    patient: (patientId, sessionPatient) => withFallback(
        () => request(`/patients/${patientId}`),
        () => getDemoStore(patientId, sessionPatient).patient
    ),

    vitals: (patientId, sessionPatient) => withFallback(
        () => request(`/patients/${patientId}/vitals`),
        () => [...getDemoStore(patientId, sessionPatient).vitals].reverse()
    ),

    addVitals: (patientId, data, sessionPatient) => withFallback(
        () => request(`/patients/${patientId}/vitals`, { method: "POST", body: JSON.stringify(data) }),
        () => {
            const s = getDemoStore(patientId, sessionPatient);
            const vital = { id: s.vitals.length + 1, patient_id: patientId, ...data, recorded_at: new Date().toISOString() };
            s.vitals.push(vital);
            const alert = makeAlert(vital, patientId);
            if (alert) s.alerts.unshift({ id: s.alerts.length + 1, patient_id: patientId, ...alert, created_at: new Date().toISOString() });
            return { vital, alertsCreated: alert ? 1 : 0 };
        }
    ),

    medications: (patientId, sessionPatient) => withFallback(
        () => request(`/patients/${patientId}/medications`),
        () => [...getDemoStore(patientId, sessionPatient).medications]
    ),

    // patientId is required so the offline demo store stays per-patient
    toggleMedication: (medicationId, patientId, sessionPatient) => withFallback(
        () => request(`/medications/${medicationId}/toggle`, { method: "PATCH" }),
        () => {
            const s = getDemoStore(patientId, sessionPatient);
            const item = s.medications.find((m) => m.id === medicationId);
            if (item) item.is_taken = !item.is_taken;
            return { id: medicationId, is_taken: Boolean(item ? item.is_taken : false) };
        }
    ),

    notes: (patientId, sessionPatient) => withFallback(
        () => request(`/patients/${patientId}/notes`),
        () => [...getDemoStore(patientId, sessionPatient).notes]
    ),

    addNote: (patientId, data, sessionPatient) => withFallback(
        () => request(`/patients/${patientId}/notes`, { method: "POST", body: JSON.stringify(data) }),
        () => {
            const s = getDemoStore(patientId, sessionPatient);
            const note = { id: s.notes.length + 1, patient_id: patientId, ...data, created_at: new Date().toISOString() };
            s.notes.unshift(note);
            return note;
        }
    )
};
const API_BASE =
    import.meta.env.VITE_API_BASE || "";

const demoPatient = {
    id: 1,
    name: "Jothiganesh Guntu",
    email: "jothiganeshguntu@gmail.com",
    age: 42,
    gender: "Male",
    phone: "+91 98765 43210",
    address: "Hyderabad, Telangana",
    condition_name: "Type 2 Diabetes and Hypertension",
    emergency_contact: "Anitha Guntu - +91 90000 11111",
    doctor_name: "Dr. Priya Reddy"
};

const demoVitals = [
    { id: 1, patient_id: 1, systolic: 128, diastolic: 82, glucose: 134, heart_rate: 76, temperature: 98.4, recorded_at: "2026-05-03T19:59:00" },
    { id: 2, patient_id: 1, systolic: 132, diastolic: 84, glucose: 148, heart_rate: 81, temperature: 98.6, recorded_at: "2026-05-04T19:59:00" },
    { id: 3, patient_id: 1, systolic: 138, diastolic: 88, glucose: 166, heart_rate: 86, temperature: 99.0, recorded_at: "2026-05-05T19:59:00" },
    { id: 4, patient_id: 1, systolic: 126, diastolic: 80, glucose: 139, heart_rate: 74, temperature: 98.3, recorded_at: "2026-05-06T19:59:00" },
    { id: 5, patient_id: 1, systolic: 146, diastolic: 94, glucose: 182, heart_rate: 92, temperature: 99.2, recorded_at: "2026-05-07T19:59:00" },
    { id: 6, patient_id: 1, systolic: 134, diastolic: 86, glucose: 151, heart_rate: 83, temperature: 98.5, recorded_at: "2026-05-08T19:59:00" },
    { id: 7, patient_id: 1, systolic: 142, diastolic: 90, glucose: 171, heart_rate: 88, temperature: 98.8, recorded_at: "2026-05-09T19:59:00" }
];

const demoAlerts = [
    { id: 1, patient_id: 1, severity: "warning", title: "Warning", message: "Medication adherence dropped below 80%.", created_at: "2026-05-09T11:59:00" },
    { id: 2, patient_id: 1, severity: "critical", title: "Critical", message: "Glucose level crossed the critical threshold.", created_at: "2026-05-08T19:59:00" },
    { id: 3, patient_id: 1, severity: "warning", title: "Warning", message: "Blood pressure is above the recommended range.", created_at: "2026-05-07T19:59:00" }
];

const demoMedications = [
    { id: 1, patient_id: 1, medicine_name: "Metformin", dosage: "500 mg", medication_time: "08:00 AM", is_taken: true },
    { id: 2, patient_id: 1, medicine_name: "Amlodipine", dosage: "5 mg", medication_time: "09:00 AM", is_taken: true },
    { id: 3, patient_id: 1, medicine_name: "Vitamin D3", dosage: "1000 IU", medication_time: "01:00 PM", is_taken: true },
    { id: 4, patient_id: 1, medicine_name: "Atorvastatin", dosage: "10 mg", medication_time: "09:00 PM", is_taken: true }
];

const demoNotes = [
    { id: 1, patient_id: 1, doctor_name: "Dr. Priya Reddy", severity: "follow-up", note: "Patient should maintain fasting glucose log for the next 7 days.", created_at: "2026-05-08T10:20:00" },
    { id: 2, patient_id: 1, doctor_name: "Dr. Arun Kumar", severity: "routine", note: "Blood pressure is manageable. Continue current medication schedule.", created_at: "2026-05-09T09:10:00" }
];

const demoStore = {
    patient: demoPatient,
    vitals: [...demoVitals],
    alerts: [...demoAlerts],
    medications: [...demoMedications],
    notes: [...demoNotes]
};

async function request(path, options = {}) {
    if (!API_BASE) {
        throw new Error("No API server configured");
    }

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

function dashboardFallback() {
    return {
        patient: demoStore.patient,
        vitals: [...demoStore.vitals],
        alerts: [...demoStore.alerts],
        medications: [...demoStore.medications],
        notes: [...demoStore.notes]
    };
}

function makeAlert(vital) {
    if (vital.glucose >= 180) {
        return { severity: "critical", title: "Critical", message: "Glucose level crossed the critical threshold." };
    }
    if (vital.systolic >= 140 || vital.diastolic >= 90) {
        return { severity: "warning", title: "Warning", message: "Blood pressure is above the recommended range." };
    }
    return null;
}

async function withFallback(apiCall, fallback) {
    try {
        return await apiCall();
    } catch {
        return fallback();
    }
}

export const api = {
    login: (email, password) => withFallback(
        () => request("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        }),
        () => {
            return {
                token: "demo-token",
                patient: {
                    ...demoStore.patient,
                    email: email || demoStore.patient.email
                }
            };
        }
    ),
    dashboard: () => withFallback(() => request("/patients/1/dashboard"), dashboardFallback),
    patient: () => withFallback(() => request("/patients/1"), () => demoStore.patient),
    vitals: () => withFallback(() => request("/patients/1/vitals"), () => [...demoStore.vitals].reverse()),
    addVitals: (patientId, data) => withFallback(
        () => request(`/patients/${patientId}/vitals`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
        () => {
            const vital = {
                id: demoStore.vitals.length + 1,
                patient_id: patientId,
                ...data,
                recorded_at: new Date().toISOString()
            };
            demoStore.vitals.push(vital);
            const alert = makeAlert(vital);
            if (alert) {
                demoStore.alerts.unshift({
                    id: demoStore.alerts.length + 1,
                    patient_id: patientId,
                    ...alert,
                    created_at: new Date().toISOString()
                });
            }
            return { vital, alertsCreated: alert ? 1 : 0 };
        }
    ),
    medications: () => withFallback(() => request("/patients/1/medications"), () => [...demoStore.medications]),
    toggleMedication: (medicationId) => withFallback(
        () => request(`/medications/${medicationId}/toggle`, { method: "PATCH" }),
        () => {
            const item = demoStore.medications.find((medication) => medication.id === medicationId);
            if (item) item.is_taken = !item.is_taken;
            return { id: medicationId, is_taken: Boolean(item ? .is_taken) };
        }
    ),
    notes: () => withFallback(() => request("/patients/1/notes"), () => [...demoStore.notes]),
    addNote: (patientId, data) => withFallback(
        () => request(`/patients/${patientId}/notes`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
        () => {
            const note = { id: demoStore.notes.length + 1, patient_id: patientId, ...data, created_at: new Date().toISOString() };
            demoStore.notes.unshift(note);
            return note;
        }
    )
};
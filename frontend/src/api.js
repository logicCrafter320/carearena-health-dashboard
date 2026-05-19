const STORAGE_KEY = "carearena-patients-v1";

const defaultVitals = [
  { systolic: 128, diastolic: 82, glucose: 134, heart_rate: 76, temperature: 98.4, recorded_at: "2026-05-03T19:59:00" },
  { systolic: 132, diastolic: 84, glucose: 148, heart_rate: 81, temperature: 98.6, recorded_at: "2026-05-04T19:59:00" },
  { systolic: 138, diastolic: 88, glucose: 166, heart_rate: 86, temperature: 99.0, recorded_at: "2026-05-05T19:59:00" },
  { systolic: 126, diastolic: 80, glucose: 139, heart_rate: 74, temperature: 98.3, recorded_at: "2026-05-06T19:59:00" },
  { systolic: 146, diastolic: 94, glucose: 182, heart_rate: 92, temperature: 99.2, recorded_at: "2026-05-07T19:59:00" },
  { systolic: 134, diastolic: 86, glucose: 151, heart_rate: 83, temperature: 98.5, recorded_at: "2026-05-08T19:59:00" },
  { systolic: 142, diastolic: 90, glucose: 171, heart_rate: 88, temperature: 98.8, recorded_at: "2026-05-09T19:59:00" }
];

const medicationPresets = {
  diabetes: [
    ["Metformin", "500 mg", "08:00 AM"],
    ["Glimepiride", "1 mg", "08:30 AM"],
    ["Vitamin D3", "1000 IU", "01:00 PM"]
  ],
  both: [
    ["Metformin", "500 mg", "08:00 AM"],
    ["Amlodipine", "5 mg", "09:00 AM"],
    ["Atorvastatin", "10 mg", "09:00 PM"],
    ["Vitamin D3", "1000 IU", "01:00 PM"]
  ],
  hypertension: [
    ["Amlodipine", "5 mg", "09:00 AM"],
    ["Telmisartan", "40 mg", "09:00 PM"],
    ["Atorvastatin", "10 mg", "09:00 PM"]
  ],
  heart: [
    ["Aspirin", "75 mg", "08:00 AM"],
    ["Atorvastatin", "20 mg", "09:00 PM"],
    ["Metoprolol", "25 mg", "09:00 AM"]
  ],
  kidney: [
    ["Calcium Acetate", "667 mg", "After lunch"],
    ["Furosemide", "20 mg", "08:00 AM"],
    ["Vitamin D3", "1000 IU", "01:00 PM"]
  ],
  general: [
    ["Multivitamin", "1 tablet", "09:00 AM"],
    ["Vitamin D3", "1000 IU", "01:00 PM"]
  ]
};

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function conditionKey(condition) {
  const text = String(condition || "").toLowerCase();
  if (text.includes("diabetes") && text.includes("hypertension")) return "both";
  if (text.includes("diabetes")) return "diabetes";
  if (text.includes("hypertension") || text.includes("blood pressure")) return "hypertension";
  if (text.includes("heart")) return "heart";
  if (text.includes("kidney")) return "kidney";
  return "general";
}

function loadStore() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return {};
  try {
    return JSON.parse(saved);
  } catch {
    return {};
  }
}

function saveStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function makeMedications(patientId, condition) {
  const presets = medicationPresets[conditionKey(condition)] || medicationPresets.general;
  return presets.map(([medicine_name, dosage, medication_time], index) => ({
    id: index + 1,
    patient_id: patientId,
    medicine_name,
    dosage,
    medication_time,
    is_taken: index === 0
  }));
}

function makeVitals(patientId, condition) {
  const key = conditionKey(condition);
  return defaultVitals.map((item, index) => ({
    id: index + 1,
    patient_id: patientId,
    ...item,
    glucose: key === "diabetes" || key === "both" ? item.glucose : Math.max(92, item.glucose - 42),
    systolic: key === "hypertension" || key === "heart" || key === "both" ? item.systolic : Math.max(112, item.systolic - 12),
    diastolic: key === "hypertension" || key === "heart" || key === "both" ? item.diastolic : Math.max(72, item.diastolic - 8)
  }));
}

function makeInitialRecord(profile) {
  const patientId = normalizeEmail(profile.email);
  const patient = {
    id: patientId,
    name: profile.name || patientId.split("@")[0] || "CareArena Patient",
    email: patientId,
    age: profile.age || "",
    gender: profile.gender || "",
    phone: profile.phone || "",
    address: profile.address || "",
    condition_name: profile.condition_name || "General Chronic Care",
    emergency_contact: profile.emergency_contact || "",
    doctor_name: profile.doctor_name || "Dr. Priya Reddy"
  };

  return {
    patient,
    vitals: makeVitals(patientId, patient.condition_name),
    alerts: [],
    medications: makeMedications(patientId, patient.condition_name),
    notes: [
      {
        id: 1,
        patient_id: patientId,
        doctor_name: patient.doctor_name,
        severity: "routine",
        note: `Monitoring started for ${patient.condition_name}.`,
        created_at: new Date().toISOString()
      }
    ]
  };
}

function getRecord(patientId) {
  const store = loadStore();
  const email = normalizeEmail(patientId);
  return store[email] || ensureRecord(email);
}

function setRecord(patientId, record) {
  const store = loadStore();
  store[normalizeEmail(patientId)] = record;
  saveStore(store);
}

function ensureRecord(email, profile = {}) {
  const patientId = normalizeEmail(email);
  const store = loadStore();
  if (!store[patientId]) {
    store[patientId] = makeInitialRecord({ ...profile, email: patientId });
    saveStore(store);
  }
  return store[patientId];
}

function makeAlert(record, vital) {
  const condition = String(record.patient.condition_name || "").toLowerCase();
  if ((condition.includes("diabetes") || condition.includes("chronic")) && vital.glucose >= 180) {
    return { severity: "critical", title: "Critical glucose alert", message: "Glucose level crossed the critical threshold." };
  }
  if ((condition.includes("hypertension") || condition.includes("blood pressure") || condition.includes("heart") || condition.includes("chronic")) && (vital.systolic >= 140 || vital.diastolic >= 90)) {
    return { severity: "warning", title: "Blood pressure warning", message: "Blood pressure is above the recommended range." };
  }
  if (vital.heart_rate > 110 || vital.heart_rate < 55) {
    return { severity: "critical", title: "Heart rate alert", message: "Heart rate is outside the safe range." };
  }
  if (vital.temperature >= 100.4) {
    return { severity: "warning", title: "Temperature warning", message: "Temperature is above the normal range." };
  }
  return null;
}

export const api = {
  signup: async (profile) => {
    const email = normalizeEmail(profile.email);
    if (!email) throw new Error("Email is required");
    const record = makeInitialRecord({ ...profile, email });
    const store = loadStore();
    store[email] = record;
    saveStore(store);
    return { token: "demo-token", patient: record.patient };
  },

  login: async (email) => {
    const patientId = normalizeEmail(email);
    if (!patientId) throw new Error("Email is required");
    const record = ensureRecord(patientId);
    return { token: "demo-token", patient: record.patient };
  },

  dashboard: async (patientId) => {
    const record = getRecord(patientId);
    if (!record) throw new Error("Patient not found");
    return {
      patient: record.patient,
      vitals: [...record.vitals],
      alerts: [...record.alerts],
      medications: [...record.medications],
      notes: [...record.notes]
    };
  },

  patient: async (patientId) => {
    const record = getRecord(patientId);
    if (!record) throw new Error("Patient not found");
    return record.patient;
  },

  vitals: async (patientId) => {
    const record = getRecord(patientId);
    if (!record) throw new Error("Patient not found");
    return [...record.vitals].reverse();
  },

  addVitals: async (patientId, data) => {
    const record = getRecord(patientId);
    if (!record) throw new Error("Patient not found");
    const vital = {
      id: record.vitals.length + 1,
      patient_id: patientId,
      ...data,
      recorded_at: new Date().toISOString()
    };
    record.vitals.push(vital);
    const alert = makeAlert(record, vital);
    if (alert) {
      record.alerts.unshift({
        id: record.alerts.length + 1,
        patient_id: patientId,
        ...alert,
        created_at: new Date().toISOString()
      });
    }
    setRecord(patientId, record);
    return { vital, alertsCreated: alert ? 1 : 0 };
  },

  medications: async (patientId) => {
    const record = getRecord(patientId);
    if (!record) throw new Error("Patient not found");
    return [...record.medications];
  },

  toggleMedication: async (patientId, medicationId) => {
    const record = getRecord(patientId);
    if (!record) throw new Error("Patient not found");
    const item = record.medications.find((medication) => medication.id === medicationId);
    if (item) item.is_taken = !item.is_taken;
    setRecord(patientId, record);
    return { id: medicationId, is_taken: Boolean(item ? item.is_taken : false) };
  },

  notes: async (patientId) => {
    const record = getRecord(patientId);
    if (!record) throw new Error("Patient not found");
    return [...record.notes];
  },

  addNote: async (patientId, data) => {
    const record = getRecord(patientId);
    if (!record) throw new Error("Patient not found");
    const note = {
      id: record.notes.length + 1,
      patient_id: patientId,
      ...data,
      created_at: new Date().toISOString()
    };
    record.notes.unshift(note);
    setRecord(patientId, record);
    return note;
  }
};

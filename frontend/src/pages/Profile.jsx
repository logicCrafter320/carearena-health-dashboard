import { useEffect, useState } from "react";
import { api } from "../api.js";

export default function Profile({ patientId }) {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    api.patient(patientId).then(setPatient);
  }, [patientId]);

  if (!patient) return <div className="loading">Loading profile...</div>;

  const rows = [
    ["Name", patient.name],
    ["Email", patient.email],
    ["Age", patient.age],
    ["Gender", patient.gender],
    ["Phone", patient.phone],
    ["Address", patient.address],
    ["Condition", patient.condition_name],
    ["Emergency Contact", patient.emergency_contact],
    ["Primary Doctor", patient.doctor_name]
  ];

  return (
    <section className="panel">
      <div className="panel-title">
        <div>
          <p className="eyebrow">Patient record</p>
          <h2>Profile</h2>
        </div>
      </div>
      <div className="profile-grid">
        {rows.map(([label, value]) => (
          <div className="profile-item" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

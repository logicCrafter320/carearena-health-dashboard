import { useEffect, useState } from "react";
import { api } from "../api.js";
import { Pill } from "lucide-react";

export default function Medications({ patientId }) {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    api.medications(patientId).then(setMedications);
  }, [patientId]);

  const toggle = async (id) => {
    const result = await api.toggleMedication(id);
    setMedications((items) => items.map((item) => item.id === id ? { ...item, is_taken: result.is_taken } : item));
  };

  return (
    <section className="panel">
      <div className="panel-title">
        <div>
          <h2>Medication Schedule</h2>
        </div>
        <span className="big-number">Click a medicine to update status</span>
      </div>
      <div className="medication-grid">
        {medications.map((item) => (
          <button className={`medication-row ${item.is_taken ? "done" : ""}`} key={item.id} onClick={() => toggle(item.id)}>
            <Pill size={32} />
            <strong>{item.medicine_name}</strong>
            <span>{item.dosage} at {item.medication_time}</span>
            <em>{item.is_taken ? "✓ Taken" : "Pending"}</em>
          </button>
        ))}
      </div>
    </section>
  );
}

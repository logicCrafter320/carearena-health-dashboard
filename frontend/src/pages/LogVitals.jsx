import { useState } from "react";
import { api } from "../api.js";

const initial = { systolic: 128, diastolic: 82, glucose: 135, heart_rate: 78, temperature: 98.4 };

export default function LogVitals({ patientId }) {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");

  const update = (key, value) => setForm((current) => ({ ...current, [key]: Number(value) }));

  const submit = async (event) => {
    event.preventDefault();
    const result = await api.addVitals(patientId, form);
    setMessage(`Vitals saved. ${result.alertsCreated} alert(s) generated.`);
  };

  return (
    <section className="split-page">
      <form className="panel form-panel" onSubmit={submit}>
        <div className="panel-title">
          <div>
            <p className="eyebrow">New reading</p>
            <h2>Log Vitals</h2>
          </div>
        </div>
        {Object.entries(form).map(([key, value]) => (
          <label key={key}>
            {key.replace("_", " ")}
            <input type="number" step={key === "temperature" ? "0.1" : "1"} value={value} onChange={(event) => update(key, event.target.value)} />
          </label>
        ))}
        {message && <p className="success-message">{message}</p>}
        <button type="submit">Save Reading</button>
      </form>

      <aside className="panel reference-panel">
        <p className="eyebrow">Clinical reference</p>
        <h2>Safe Ranges</h2>
        <ul>
          <li><span>Blood pressure</span><strong>Below 140/90 mmHg</strong></li>
          <li><span>Glucose</span><strong>80-140 mg/dL target</strong></li>
          <li><span>Heart rate</span><strong>55-110 BPM</strong></li>
          <li><span>Temperature</span><strong>Below 100.4 F</strong></li>
        </ul>
      </aside>
    </section>
  );
}

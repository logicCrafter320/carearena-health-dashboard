import { useEffect, useState } from "react";
import { api } from "../api.js";
import StatusBadge from "../components/StatusBadge.jsx";

export default function Notes({ patientId }) {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ doctor_name: "Dr. Priya Reddy", severity: "routine", note: "" });

  const load = () => api.notes(patientId).then(setNotes);

  useEffect(() => {
    load();
  }, [patientId]);

  const submit = async (event) => {
    event.preventDefault();
    await api.addNote(patientId, form);
    setForm((current) => ({ ...current, note: "" }));
    load();
  };

  return (
    <section className="split-page">
      <div className="panel">
        <div className="panel-title">
          <div>
            <p className="eyebrow">Care team</p>
            <h2>Doctor Notes</h2>
          </div>
        </div>
        <div className="stack">
          {notes.map((note) => (
            <article className="note-card" key={note.id}>
              <StatusBadge severity={note.severity} />
              <strong>{note.doctor_name}</strong>
              <p>{note.note}</p>
              <small>{new Date(note.created_at).toLocaleString()}</small>
            </article>
          ))}
        </div>
      </div>

      <form className="panel form-panel" onSubmit={submit}>
        <p className="eyebrow">Add note</p>
        <label>
          Doctor
          <input value={form.doctor_name} onChange={(event) => setForm({ ...form, doctor_name: event.target.value })} />
        </label>
        <label>
          Severity
          <select value={form.severity} onChange={(event) => setForm({ ...form, severity: event.target.value })}>
            <option value="routine">Routine</option>
            <option value="follow-up">Follow-up</option>
            <option value="critical">Critical</option>
          </select>
        </label>
        <label>
          Note
          <textarea value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} required />
        </label>
        <button type="submit">Add Note</button>
      </form>
    </section>
  );
}

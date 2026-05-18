import { Hospital } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../api.js";

export default function SignUp({ onSignUp }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    phone: "",
    condition_name: "Diabetes",
    doctor_name: "Dr. Priya Reddy",
    emergency_contact: ""
  });
  const [error, setError] = useState("");

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      onSignUp(await api.signup(form));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <Link className="brand care-brand" to="/">
          <div className="brand-mark"><Hospital size={24} /></div>
          <span>CareArena</span>
        </Link>
        <div>
          <p className="eyebrow">Create account</p>
          <h1>Sign Up</h1>
          <p className="auth-copy">Register your basic details for the Phase-II review flow.</p>
        </div>
        <form className="auth-form" onSubmit={submit}>
          <label>
            Full Name
            <input placeholder="Enter full name" value={form.name} onChange={(event) => update("name", event.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" placeholder="Enter email" value={form.email} onChange={(event) => update("email", event.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" placeholder="Create password" value={form.password} onChange={(event) => update("password", event.target.value)} required />
          </label>
          <label>
            Age
            <input type="number" placeholder="Enter age" value={form.age} onChange={(event) => update("age", event.target.value)} required />
          </label>
          <label>
            Gender
            <select value={form.gender} onChange={(event) => update("gender", event.target.value)} required>
              <option value="">Select gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            Chronic Condition
            <select value={form.condition_name} onChange={(event) => update("condition_name", event.target.value)} required>
              <option value="Diabetes">Diabetes</option>
              <option value="Hypertension">Hypertension</option>
              <option value="Diabetes and Hypertension">Diabetes and Hypertension</option>
              <option value="Heart Condition">Heart Condition</option>
              <option value="Kidney Condition">Kidney Condition</option>
              <option value="General Chronic Care">General Chronic Care</option>
            </select>
          </label>
          <label>
            Phone
            <input placeholder="Enter phone number" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
          </label>
          <label>
            Emergency Contact
            <input placeholder="Emergency contact" value={form.emergency_contact} onChange={(event) => update("emergency_contact", event.target.value)} />
          </label>
          <label>
            Doctor Name
            <input placeholder="Primary doctor" value={form.doctor_name} onChange={(event) => update("doctor_name", event.target.value)} />
          </label>
          <button type="submit">Create Account</button>
        </form>
        {error && <p className="form-error">{error}</p>}
        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </section>
    </main>
  );
}

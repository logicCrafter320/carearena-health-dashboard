import { useState } from "react";
import { api } from "../api.js";
import { Bell, ChevronDown, HeartPulse, Hospital, Pill, Stethoscope } from "lucide-react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      onLogin(await api.login(email, password));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="login-page">
      <nav className="landing-nav">
        <div className="brand care-brand">
          <div className="brand-mark"><Hospital size={24} /></div>
          <span>CareArena</span>
        </div>
        <div className="landing-links">
          <a>Home</a>
          <a>Services <ChevronDown size={15} /></a>
          <a>Modules <ChevronDown size={15} /></a>
          <a>Company</a>
          <a>Resources</a>
        </div>
        <button className="join-button">Join With Us</button>
      </nav>
      <section className="login-hero">
        <div className="hero-visual">
          <div className="sync-card">
            <div className="sync-head">
              <strong>Care Sync</strong>
              <HeartPulse size={20} />
            </div>
            <div className="skeleton-line long" />
            <div className="skeleton-line short" />
            <div className="reading white">
              <span>BP</span>
              <strong>142/90</strong>
            </div>
            <div className="reading orange">
              <span>Glucose</span>
              <strong>171</strong>
            </div>
          </div>
          <div className="float-icon stetho"><Stethoscope size={36} /></div>
          <div className="float-icon pill"><Pill size={31} /></div>
        </div>
        <div className="hero-copy">
          <p className="review-pill"><Bell size={22} /> 5.0 Patient Monitoring Reviews</p>
          <h1>The Future of AI Chronic Care Automation</h1>
          <p>Build a connected patient-care ecosystem that tracks vitals, medication adherence, doctor notes, alerts, and health history in real time.</p>
          <form className="login-strip" onSubmit={submit}>
            <input aria-label="Email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input aria-label="Password" placeholder="Enter password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button type="submit">Open Dashboard</button>
          </form>
          {error && <p className="form-error">{error}</p>}
        </div>
      </section>
      <section className="module-band">
        <h2>Scale chronic care instantly with AI teammates. <em>Your best clinical assistant is digital.</em></h2>
        <div className="module-tabs">
          <span><HeartPulse size={22} /> Vitals</span>
          <span><Pill size={22} /> Medication</span>
          <span><Bell size={22} /> Alerts</span>
          <span><Stethoscope size={22} /> Doctor Notes</span>
        </div>
      </section>
    </main>
  );
}

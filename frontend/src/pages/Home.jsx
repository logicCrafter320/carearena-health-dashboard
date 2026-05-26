import { Bell, ChevronDown, HeartPulse, Hospital, Pill, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import AmbientHealthBackground from "../components/AmbientHealthBackground.jsx";

export default function Home() {
  return (
    <main className="login-page">
      <AmbientHealthBackground />
      <nav className="landing-nav">
        <Link className="brand care-brand motion-reveal" to="/">
          <div className="brand-mark"><Hospital size={24} /></div>
          <span>CareArena</span>
        </Link>
        <div className="landing-links motion-reveal">
          <Link to="/">Home</Link>
          <Link to="/">Services <ChevronDown size={15} /></Link>
          <Link to="/">Modules <ChevronDown size={15} /></Link>
          <Link to="/">Company</Link>
          <Link to="/">Resources</Link>
        </div>
        <div className="nav-actions motion-reveal">
          <Link className="ghost-button" to="/login">Login</Link>
          <Link className="join-button" to="/signup">Sign Up</Link>
        </div>
      </nav>

      <section className="login-hero">
        <div className="hero-visual motion-reveal">
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

        <div className="hero-copy motion-reveal">
          <p className="review-pill"><Bell size={22} /> Chronic Disease Monitoring Platform</p>
          <h1>The Future of AI Chronic Care Automation</h1>
          <p>Track vitals, medication adherence, alerts, doctor notes, and health history through a modern healthcare interface.</p>
          <div className="hero-actions">
            <Link className="join-button" to="/login">Open Login</Link>
            <Link className="ghost-button" to="/signup">Create Account</Link>
          </div>
        </div>
      </section>

      <section className="module-band scroll-reveal">
        <h2>Phase-II Review Modules: <em>Home, Login, and Sign-Up.</em></h2>
        <div className="module-tabs">
          <Link to="/"><HeartPulse size={22} /> Vitals</Link>
          <Link to="/"><Pill size={22} /> Medication</Link>
          <Link to="/"><Bell size={22} /> Alerts</Link>
          <Link to="/"><Stethoscope size={22} /> Doctor Notes</Link>
        </div>
      </section>
    </main>
  );
}

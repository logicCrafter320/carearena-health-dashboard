import { Hospital } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    navigate("/login");
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
          <button type="submit">Create Account</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </section>
    </main>
  );
}

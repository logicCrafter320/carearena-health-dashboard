import { Hospital } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../api.js";

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
    <main className="auth-page">
      <section className="auth-panel">
        <Link className="brand care-brand" to="/">
          <div className="brand-mark"><Hospital size={24} /></div>
          <span>CareArena</span>
        </Link>
        <div>
          <p className="eyebrow">Patient access</p>
          <h1>Login</h1>
          <p className="auth-copy">Enter your email and password to access CareArena.</p>
        </div>
        <form className="auth-form" onSubmit={submit}>
          <label>
            Email
            <input type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          <button type="submit">Login</button>
        </form>
        {error && <p className="form-error">{error}</p>}
        <p className="auth-switch">New to CareArena? <Link to="/signup">Create an account</Link></p>
      </section>
    </main>
  );
}

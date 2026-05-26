import { Hospital } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../api.js";
import AmbientHealthBackground from "../components/AmbientHealthBackground.jsx";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const nextSession = await api.login(email, password);
      setSuccess("Login successful. Opening dashboard...");
      window.setTimeout(() => onLogin(nextSession), 450);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <AmbientHealthBackground />
      <section className="auth-panel motion-reveal">
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
            <input type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} required disabled={isLoading} />
          </label>
          <label>
            Password
            <input type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} required disabled={isLoading} />
          </label>
          <button type="submit" disabled={isLoading}>{isLoading ? "Checking..." : "Login"}</button>
        </form>
        {error && <p className="form-error">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <p className="auth-switch">New to CareArena? <Link to="/signup">Create an account</Link></p>
      </section>
    </main>
  );
}

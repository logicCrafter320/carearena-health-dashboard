import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Overview from "./pages/Overview.jsx";
import LogVitals from "./pages/LogVitals.jsx";
import History from "./pages/History.jsx";
import Alerts from "./pages/Alerts.jsx";
import Medications from "./pages/Medications.jsx";
import Notes from "./pages/Notes.jsx";
import Profile from "./pages/Profile.jsx";
import usePremiumMotion from "./hooks/usePremiumMotion.js";
import { api } from "./api.js";

export default function App() {
  const location = useLocation();
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem("chronic-care-session");
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      return api.isValidSession(parsed) ? parsed : null;
    } catch {
      return null;
    }
  });
  const navigate = useNavigate();

  usePremiumMotion(location.pathname);

  useEffect(() => {
    if (session) localStorage.setItem("chronic-care-session", JSON.stringify(session));
    else localStorage.removeItem("chronic-care-session");
  }, [session]);

  const login = (nextSession) => {
    setSession(nextSession);
    navigate("/dashboard");
  };

  const logout = () => {
    setSession(null);
    navigate("/");
  };

  if (session) {
    const patientId = session.patient.id;

    return (
      <Layout patient={session.patient} onLogout={logout}>
        <Routes>
          <Route path="/dashboard" element={<Overview patientId={patientId} />} />
          <Route path="/log-vitals" element={<LogVitals patientId={patientId} />} />
          <Route path="/history" element={<History patientId={patientId} />} />
          <Route path="/alerts" element={<Alerts patientId={patientId} />} />
          <Route path="/medications" element={<Medications patientId={patientId} />} />
          <Route path="/notes" element={<Notes patientId={patientId} />} />
          <Route path="/profile" element={<Profile patientId={patientId} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login onLogin={login} />} />
      <Route path="/signup" element={<SignUp onSignUp={login} />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

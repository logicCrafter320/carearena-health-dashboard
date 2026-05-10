import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Overview from "./pages/Overview.jsx";
import LogVitals from "./pages/LogVitals.jsx";
import History from "./pages/History.jsx";
import Alerts from "./pages/Alerts.jsx";
import Medications from "./pages/Medications.jsx";
import Notes from "./pages/Notes.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem("chronic-care-session");
    return saved ? JSON.parse(saved) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (session) localStorage.setItem("chronic-care-session", JSON.stringify(session));
    else localStorage.removeItem("chronic-care-session");
  }, [session]);

  const logout = () => {
    setSession(null);
    navigate("/login");
  };

  if (!session) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={setSession} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout patient={session.patient} onLogout={logout}>
      <Routes>
        <Route path="/" element={<Overview patientId={session.patient.id} />} />
        <Route path="/log-vitals" element={<LogVitals patientId={session.patient.id} />} />
        <Route path="/history" element={<History patientId={session.patient.id} />} />
        <Route path="/alerts" element={<Alerts patientId={session.patient.id} />} />
        <Route path="/medications" element={<Medications patientId={session.patient.id} />} />
        <Route path="/notes" element={<Notes patientId={session.patient.id} />} />
        <Route path="/profile" element={<Profile patientId={session.patient.id} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

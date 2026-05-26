import { Activity, AlertTriangle, ClipboardPlus, Hospital, LogOut, NotebookPen, Pill, UserRound, Waves } from "lucide-react";
import { NavLink } from "react-router-dom";
import AmbientHealthBackground from "./AmbientHealthBackground.jsx";

const links = [
  { to: "/dashboard", label: "Overview", icon: Activity },
  { to: "/log-vitals", label: "Log Vitals", icon: ClipboardPlus },
  { to: "/history", label: "History", icon: Waves },
  { to: "/alerts", label: "Alerts", icon: AlertTriangle },
  { to: "/medications", label: "Medications", icon: Pill },
  { to: "/notes", label: "Doctor Notes", icon: NotebookPen },
  { to: "/profile", label: "Profile", icon: UserRound }
];

export default function Layout({ patient, onLogout, children }) {
  return (
    <div className="app-shell">
      <AmbientHealthBackground />
      <aside className="sidebar">
        <div className="brand care-brand motion-reveal">
          <div className="brand-mark"><Hospital size={24} /></div>
          <span>CareArena</span>
        </div>

        <nav>
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} end={item.to === "/dashboard"}>
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <button className="logout-button" onClick={onLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="main">
        <header className="topbar motion-reveal">
          <div>
            <h1>Chronic Care Management System</h1>
          </div>
          <div className="patient-chip">
            <strong>Dr. Priya Reddy</strong>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

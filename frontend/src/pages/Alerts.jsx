import { useEffect, useState } from "react";
import { api } from "../api.js";
import StatusBadge from "../components/StatusBadge.jsx";

export default function Alerts({ patientId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.dashboard(patientId).then(setData);
  }, [patientId]);

  if (!data) return <div className="loading">Loading alerts...</div>;

  return (
    <section className="panel">
      <div className="panel-title">
        <div>
          <p className="eyebrow">Risk monitoring</p>
          <h2>Alerts</h2>
        </div>
      </div>
      <div className="stack">
        {data.alerts.map((alert) => (
          <article className="alert-card" key={alert.id}>
            <StatusBadge severity={alert.severity} />
            <div>
              <strong>{alert.title}</strong>
              <p>{alert.message}</p>
              <small>{new Date(alert.created_at).toLocaleString()}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

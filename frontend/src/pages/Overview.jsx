import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { api } from "../api.js";
import MetricCard from "../components/MetricCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

export default function Overview({ patientId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.dashboard(patientId).then(setData);
  }, [patientId]);

  const latest = data?.vitals?.at(-1);
  const adherence = useMemo(() => {
    if (!data?.medications?.length) return 0;
    const taken = data.medications.filter((item) => item.is_taken).length;
    return Math.round((taken / data.medications.length) * 100);
  }, [data]);

  if (!data || !latest) return <div className="loading">Loading dashboard...</div>;

  return (
    <section className="page-grid">
      <div className="metric-row">
        <MetricCard label="Blood Pressure" value={`${latest.systolic}/${latest.diastolic}`} unit="mmHg" tone={latest.systolic >= 140 ? "warn" : "good"} />
        <MetricCard label="Glucose" value={latest.glucose} unit="mg/dL" tone={latest.glucose >= 180 ? "danger" : latest.glucose >= 140 ? "warn" : "good"} />
        <MetricCard label="Heart Rate" value={latest.heart_rate} unit="BPM" tone={latest.heart_rate > 110 ? "danger" : "good"} />
        <MetricCard label="Temperature" value={latest.temperature} unit="F" tone={latest.temperature >= 100.4 ? "warn" : "good"} />
      </div>

      <article className="panel wide">
        <div className="panel-title">
          <div>
            <p className="eyebrow">7-day reading</p>
            <h2>Glucose Trend</h2>
          </div>
          <StatusBadge severity={latest.glucose >= 180 ? "critical" : latest.glucose >= 140 ? "warning" : "stable"} />
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data.vitals}>
            <defs>
              <linearGradient id="glucose" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#d8e7e3" strokeDasharray="4 4" />
            <XAxis dataKey="recorded_at" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
            <YAxis />
            <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
            <Area type="monotone" dataKey="glucose" stroke="#0f766e" fill="url(#glucose)" strokeWidth={3} animationDuration={1200} animationEasing="ease-out" />
          </AreaChart>
        </ResponsiveContainer>
      </article>

      <article className="panel">
        <div className="panel-title">
          <div>
            <p className="eyebrow">Medication</p>
            <h2>Adherence</h2>
          </div>
          <strong className="big-number">{adherence}%</strong>
        </div>
        <div className="adherence-ring" data-value={`${adherence}%`} style={{ "--value": `${adherence}%` }}>
          <span>{adherence}%</span>
        </div>
      </article>

      <article className="panel">
        <div className="panel-title">
          <div>
            <p className="eyebrow">Live care</p>
            <h2>Recent Alerts</h2>
          </div>
        </div>
        <div className="stack">
          {data.alerts.map((alert) => (
            <div className="alert-row" key={alert.id}>
              <StatusBadge severity={alert.severity} />
              <div>
                <strong>{alert.title}</strong>
                <p>{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="panel wide">
        <div className="panel-title">
          <div>
            <p className="eyebrow">Blood pressure</p>
            <h2>BP and Heart Rate</h2>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data.vitals}>
            <CartesianGrid stroke="#d8e7e3" strokeDasharray="4 4" />
            <XAxis dataKey="recorded_at" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
            <YAxis />
            <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
            <Line dataKey="systolic" stroke="#ef4444" strokeWidth={3} dot={false} animationDuration={1100} animationEasing="ease-out" />
            <Line dataKey="diastolic" stroke="#f59e0b" strokeWidth={3} dot={false} animationDuration={1100} animationEasing="ease-out" />
            <Line dataKey="heart_rate" stroke="#2563eb" strokeWidth={3} dot={false} animationDuration={1100} animationEasing="ease-out" />
          </LineChart>
        </ResponsiveContainer>
      </article>
    </section>
  );
}

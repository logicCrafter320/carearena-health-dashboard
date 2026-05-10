import { useEffect, useState } from "react";
import { api } from "../api.js";

function risk(row) {
  if (row.glucose >= 180 || row.heart_rate > 110) return "critical";
  if (row.glucose >= 140 || row.systolic >= 140 || row.diastolic >= 90 || row.temperature >= 100.4) return "warning";
  return "stable";
}

export default function History({ patientId }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.vitals(patientId).then(setRows);
  }, [patientId]);

  return (
    <section className="panel">
      <div className="panel-title">
        <div>
          <p className="eyebrow">Clinical log</p>
          <h2>Vitals History</h2>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>BP</th>
              <th>Glucose</th>
              <th>Heart Rate</th>
              <th>Temp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{new Date(row.recorded_at).toLocaleString()}</td>
                <td>{row.systolic}/{row.diastolic}</td>
                <td>{row.glucose}</td>
                <td>{row.heart_rate}</td>
                <td>{row.temperature}</td>
                <td><span className={`status-badge ${risk(row)}`}>{risk(row)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

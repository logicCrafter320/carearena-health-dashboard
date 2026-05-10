export default function MetricCard({ label, value, unit, tone = "good", helper }) {
  return (
    <article className={`metric-card ${tone}`}>
      <span>{label}</span>
      <strong>
        {value}
        {unit && <small>{unit}</small>}
      </strong>
      {helper && <p>{helper}</p>}
    </article>
  );
}

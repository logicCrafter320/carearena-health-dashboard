export default function StatusBadge({ severity }) {
  const label = severity || "stable";
  return <span className={`status-badge ${label}`}>{label}</span>;
}

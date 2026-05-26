import { Activity, HeartPulse, Plus, ShieldCheck } from "lucide-react";

const items = [
  { className: "pulse", icon: HeartPulse, size: 22 },
  { className: "activity", icon: Activity, size: 20 },
  { className: "plus", icon: Plus, size: 20 },
  { className: "shield", icon: ShieldCheck, size: 21 }
];

export default function AmbientHealthBackground() {
  return (
    <div className="ambient-layer" aria-hidden="true">
      <span className="ambient-orbit ambient-orbit-one" />
      <span className="ambient-orbit ambient-orbit-two" />
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <span className={`ambient-float ${item.className}`} key={item.className}>
            <Icon size={item.size} />
          </span>
        );
      })}
    </div>
  );
}

interface MetaProps {
  label: string;
  value: string;
  sub?: string;
  colSpan?: 1 | 2 | 3 | 4;
}

export default function Meta({ label, value, sub, colSpan = 1 }: MetaProps) {
  return (
    <div className={`col-span-${colSpan}`}>
      <div className="text-accent-pink text-sm font-medium">
        {label} {sub && <span className="text-slate-400">{sub}</span>}
      </div>
      <div className="mt-1 rounded-xl px-4 py-2">{value}</div>
    </div>
  );
}

interface MetaProps {
  label: string;
  value: string;
  sub?: string;
  colSpan?: 1 | 2 | 3 | 4;
}

export default function Meta({ label, value, sub, colSpan = 1 }: MetaProps) {
  return (
    <div className={`col-span-${colSpan}`}>
      <div className="text-sm font-medium text-fuchsia-600">
        {label} {sub && <span className="text-slate-400">{sub}</span>}
      </div>
      <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900">
        {value}
      </div>
    </div>
  );
}

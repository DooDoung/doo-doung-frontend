interface MetaProps {
  label: string;
  value: string;
  sub?: string;
  colSpan?: 1 | 2 | 3 | 4;
}

export default function Meta({ label, value, sub, colSpan = 1 }: MetaProps) {
  return (
    <div className={`col-span-${colSpan} font-chakra text-xl`}>
      <div className="font-chakra text-accent-pink font-medium">
        {label} {sub && <span className="text-primary">{sub}</span>}
      </div>
      <div className="font-chakra text-neutral-black mt-1 rounded-xl py-2">
        {value}
      </div>
    </div>
  );
}

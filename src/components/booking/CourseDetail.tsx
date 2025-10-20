interface CourseDetailProps {
  label: string;
  value: string;
}

export default function CourseDetail({ label, value }: CourseDetailProps) {
  return (
    <div>
      <span className="text-accent-pink font-semibold text-sm md:text-base">{label}</span>
      <br />
      <span className="text-neutral-black font-chakra text-sm md:text-base break-words">{value}</span>
    </div>
  );
}

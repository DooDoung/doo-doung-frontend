import GlobalButton from "@/components/globalComponents/Button";

interface BookingActionsProps {
  onBack: () => void;
  onCheckAvailableTime: () => void;
}

export default function BookingActions({ onBack, onCheckAvailableTime }: BookingActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full justify-center flex-shrink-0">
      <GlobalButton variant="secondary" className="w-28" onClick={onBack}>
        Back
      </GlobalButton>
      <GlobalButton variant="primary" onClick={onCheckAvailableTime}>
        Check Available Time
      </GlobalButton>
    </div>
  );
}

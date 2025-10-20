import GlobalButton from "@/components/globalComponents/Button";

interface ConfirmBookingActionsProps {
  onBack: () => void;
}

export default function ConfirmBookingActions({ onBack }: ConfirmBookingActionsProps) {
  return (
    <div className="flex justify-center mt-4 sm:mt-6">
      <GlobalButton variant="secondary" className="w-28" onClick={onBack}>
        Back
      </GlobalButton>
    </div>
  );
}

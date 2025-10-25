import GlobalButton from "@/components/globalComponents/Button";

interface BackToHomeActionsProps {
  onBackToHome: () => void;
}

export default function BackToHomeActions({ onBackToHome }: BackToHomeActionsProps) {
  return (
    <div className="flex justify-center mt-4 sm:mt-6">
      <GlobalButton variant="secondary" className="w-40" onClick={onBackToHome}>
        Back To Home
      </GlobalButton>
    </div>
  );
}

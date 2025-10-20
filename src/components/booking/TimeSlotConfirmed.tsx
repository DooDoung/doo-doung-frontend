interface TimeSlotConfirmedProps {
  selectedDate: string;
  selectedTime: string;
}

export default function TimeSlotConfirmed({ selectedDate, selectedTime }: TimeSlotConfirmedProps) {
  return (
    <div className="bg-primary-250 backdrop-blur-sm rounded-2xl flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 w-full px-4 py-4">
      <div className="flex items-center gap-2">
        <span className="text-neutral-black font-semibold text-sm md:text-base lg:text-lg">DATE</span>
        <div className="bg-neutral-white border border-accent-pink/30 rounded-2xl px-4 sm:px-6 py-2 min-w-[120px] sm:min-w-[140px] shadow-sm">
          <span className="text-accent-pink font-chakra text-sm md:text-base lg:text-lg font-medium">{selectedDate}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-neutral-black font-semibold text-sm md:text-base lg:text-lg">TIME</span>
        <div className="bg-neutral-white border border-accent-pink/30 rounded-2xl px-4 sm:px-6 py-2 min-w-[120px] sm:min-w-[140px] shadow-sm">
          <span className="text-accent-pink font-chakra text-sm md:text-base lg:text-lg font-medium">{selectedTime}</span>
        </div>
      </div>
      
      <div className="flex-shrink-0 ml-4">
        <div className="bg-neutral-white border border-success text-success px-6 sm:px-8 lg:px-10 py-2 text-base md:text-lg lg:text-xl rounded-2xl shadow-lg font-semibold">
          Confirmed !
        </div>
      </div>
    </div>
  );
}

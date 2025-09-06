// Generate 7 days starting from today
export const generateWeekDays = () => {
  const today = new Date();
  const days = [];
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;

    days.push({
      dayName,
      display: `${dayName} ${day}/${month}`,
      date: date,
    });
  }

  return days;
};

// Generate time slots (15-minute intervals for 24 hours)
export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      slots.push(timeString);
    }
  }
  return slots;
};

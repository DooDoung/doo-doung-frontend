export const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const weekdayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const generateWeekDays = (startMonday?: Date) => {
  let startDate: Date;

  if (startMonday) {
    startDate = new Date(startMonday);
  } else {
    // Find the Monday of current week
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Calculate days to get to Monday
    startDate = new Date(today);
    startDate.setDate(today.getDate() + daysToMonday);
  }

  const days = [];

  // Generate 7 days starting from Monday
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;

    days.push({
      dayName, // "MONDAY", "TUESDAY", etc.
      dayAbbr: dayName.substring(0, 3), // "MON", "TUE", etc.
      displayDate: `${day}/${month}`, // "29/6", "30/6", etc.
      date: new Date(date),
    });
  }

  return days;
};

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

export const getCurrentWeekMonday = (currentWeek: number = 0) => {
  const today = new Date();
  const currentMonday = new Date(today);
  const dayOfWeek = today.getDay();
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  currentMonday.setDate(today.getDate() + daysToMonday);
  currentMonday.setDate(currentMonday.getDate() + currentWeek * 7);
  return currentMonday;
};

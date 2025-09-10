// Mock available times with variance and max 4 hours continuous
export const generateMockAvailableTimes = (weekIndex: number = 0) => {
  const weekData = [
    // Week 1
    [
      {
        startDay: "MON",
        startTime: "09:00",
        endDay: "MON",
        endTime: "11:00",
      },
      {
        startDay: "WED",
        startTime: "14:00",
        endDay: "WED",
        endTime: "17:30",
      },
    ],
    // Week 2
    [
      {
        startDay: "TUE",
        startTime: "10:00",
        endDay: "TUE",
        endTime: "13:00",
      },
      {
        startDay: "FRI",
        startTime: "15:00",
        endDay: "FRI",
        endTime: "18:00",
      },
    ],
    // Week 3
    [
      {
        startDay: "MON",
        startTime: "08:00",
        endDay: "MON",
        endTime: "11:30",
      },
      {
        startDay: "THU",
        startTime: "13:00",
        endDay: "THU",
        endTime: "16:00",
      },
    ],
    // Week 4
    [
      {
        startDay: "WED",
        startTime: "11:00",
        endDay: "WED",
        endTime: "14:30",
      },
      {
        startDay: "SAT",
        startTime: "16:00",
        endDay: "SAT",
        endTime: "19:00",
      },
    ],
  ];

  return weekData[weekIndex] || weekData[0];
};

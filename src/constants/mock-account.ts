const mockReservation: Reservation[] = [
  {
    imageUrl: "/images/course.svg",
    score: 4,
    status: "confirmed",
    courseName: "Course Name1",
    prophetName: "Prophet Name1",
    price: 100,
    date: "10 aug 2025",
    time: "10:00 AM",
  },
  {
    imageUrl: "/images/course.svg",
    score: 5,
    status: "completed",
    courseName: "Course Name2",
    prophetName: "Prophet Name2",
    price: 200,
    date: "11 aug 2025",
    time: "11:00 AM",
  },
  {
    imageUrl: "/images/course.svg",
    score: 4,
    status: "failed",
    courseName: "Course Name3",
    prophetName: "Prophet Name3",
    price: 150,
    date: "12 oct 2025",
    time: "12:00 PM",
  },
  {
    imageUrl: "/images/course.svg",
    score: 5,
    status: "confirmed",
    courseName: "Course Name4",
    prophetName: "Prophet Name4",
    price: 250,
    date: "13 oct 2025",
    time: "1:00 PM",
  },
  {
    imageUrl: "/images/course.svg",
    score: 4,
    status: "confirmed",
    courseName: "Course Name5",
    prophetName: "Prophet Name5",
    price: 300,
    date: "14 oct 2025",
    time: "2:00 PM",
  },
];

const mockReview: Review[] = [
  {
    profileUrl:
      "https://images.pexels.com/photos/1158420/pexels-photo-1158420.jpeg",
    userName: "JohnYakDoodoung",
    courseName: "Course Name1",
    comment:
      "แม่หมอออม ดูแม่นมาก ๆ ค่ะ อย่างกับเห็นอนาคต แม่หมอบอกว่าผู้ชายคนนี้จะเจ้าชู้ 2 วันถัดมา จับได้ว่าฮีนอกใจจริง ตอนนี้เสียใจมาก ๆ ค่ะ แต่อยากมารีวิวความแม่นของแม่หมอออมก่อน ยังไงถ้าเพื่อน ๆ สงสัยหรือมีคำถามเรื่องความรัก อย่าลืมไปดูดวงกับแม่หมอออมได้นะคะ แม่นจริงคุณน้า",
    score: 5,
    date: "10 oct 2025",
    time: "10:00 AM",
  },
  {
    profileUrl:
      "https://images.pexels.com/photos/4623531/pexels-photo-4623531.jpeg",
    userName: "JohnYakDoodoung",
    courseName: "Course Name2",
    comment:
      "แม่หมอออม ดูแม่นมาก ๆ ค่ะ อย่างกับเห็นอนาคต แม่หมอบอกว่าผู้ชายคนนี้จะเจ้าชู้ 2 วันถัดมา จับได้ว่าฮีนอกใจจริง ตอนนี้เสียใจมาก ๆ ค่ะ แต่อยากมารีวิวความแม่นของแม่หมอออมก่อน ยังไงถ้าเพื่อน ๆ สงสัยหรือมีคำถามเรื่องความรัก อย่าลืมไปดูดวงกับแม่หมอออมได้นะคะ แม่นจริงคุณน้า",
    score: 4,
    date: "11 oct 2025",
    time: "11:00 AM",
  },
  {
    profileUrl:
      "https://images.pexels.com/photos/4623531/pexels-photo-4623531.jpeg",
    userName: "JohnYakDoodoung",
    courseName: "Course Name3",
    comment:
      "งอนแม่หมอ บอกว่าหนูต้องทำใจไว้บ้างได้ไง อุตส่าห์อ่านไปตั้ง 1 คืนก่อนสอบนะ ทุกทีอ่าน 2 นาที นอย ๆๆๆๆ",
    score: 5,
    date: "12 oct 2025",
    time: "12:00 PM",
  },
  {
    profileUrl:
      "https://images.pexels.com/photos/1158420/pexels-photo-1158420.jpeg",
    userName: "JohnYakDoodoung",
    courseName: "Course Name4",
    comment:
      "งอนแม่หมอ บอกว่าหนูต้องทำใจไว้บ้างได้ไง อุตส่าห์อ่านไปตั้ง 1 คืนก่อนสอบนะ ทุกทีอ่าน 2 นาที นอย ๆๆๆๆ",
    score: 5,
    date: "13 oct 2025",
    time: "1:00 PM",
  },
  {
    profileUrl:
      "https://images.pexels.com/photos/1158420/pexels-photo-1158420.jpeg",
    userName: "JohnYakDoodoung",
    courseName: "Course Name5",
    comment:
      "งอนแม่หมอ บอกว่าหนูต้องทำใจไว้บ้างได้ไง อุตส่าห์อ่านไปตั้ง 1 คืนก่อนสอบนะ ทุกทีอ่าน 2 นาที นอย ๆๆๆๆ",
    score: 4,
    date: "14 oct 2025",
    time: "2:00 PM",
  },
];

export { mockReservation, mockReview };

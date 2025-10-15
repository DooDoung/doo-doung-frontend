interface Reservation {
  imageUrl: string;
  score: number;
  status: "confirmed" | "completed" | "failed";
  courseName: string;
  prophetName: string;
  price: number;
  date: string;
  time: string;
}

interface Review {
  profileUrl: string;
  userName: string;
  courseName: string;
  description: string;
  score: number;
  date: string;
  time: string;
}

interface ProphetFeat {
  name: string;
  imageUrl: string;
  goTo?: string;
}

interface TransactionAccount {
  accountNumber: string;
  accountName: string;
  bank: string;
}

type CardStatus = "IDEAS" | "TO-DO" | "IN-PROGRESS" | "DONE";

interface TaskCard {
  id: string;
  title: string;
  description: string;
  due_date: string;
  order_key: number;
}

interface TaskCards {
  title: CardStatus;
  // color: string;
  id: CardStatus;
  order_key: number;
  cards: TaskCard[];
}

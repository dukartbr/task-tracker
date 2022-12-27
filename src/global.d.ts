type CardStatus = "IDEAS" | "TO-DO" | "IN PROGRESS" | "DONE";

interface TaskCard {
  title: string;
  description: string;
  due_date: string;
}

interface TaskCards {
  title: CardStatus;
  color: string;
  data: TaskCard[];
}

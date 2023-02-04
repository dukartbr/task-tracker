import { useState } from "react";

const INITIAL_STORAGE: TaskCards[] = [
  {
    title: "IDEAS",
    // color: "green.200",
    id: "IDEAS",
    order_key: 1,
    cards: [],
  },
  {
    title: "TO-DO",
    // color: "orange.200",
    id: "TO-DO",
    order_key: 2,
    cards: [],
  },
  {
    title: "IN-PROGRESS",
    // color: "yellow.200",
    id: "IN-PROGRESS",
    order_key: 3,
    cards: [],
  },
  {
    title: "DONE",
    // color: "blue.200",
    id: "IN-PROGRESS",
    order_key: 4,
    cards: [],
  },
];

export function useLocalStorage() {
  const [taskCards, setTaskCards] = useState(() => {
    if (typeof window === "undefined") return [];
    const storedValues = window.localStorage.getItem("TO_DO_APP_CARDS");
    if (!storedValues) {
      window.localStorage.setItem(
        "TO_DO_APP_CARDS",
        JSON.stringify(INITIAL_STORAGE)
      );
      return JSON.stringify(INITIAL_STORAGE);
    }
    return JSON.parse(storedValues);
  });
  return [taskCards, setTaskCards];
}

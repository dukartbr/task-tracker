import { useState } from "react";

export function useLocalStorage() {
  const [taskCards, setTaskCards] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValues = window.localStorage.getItem("");
    }
  });
}

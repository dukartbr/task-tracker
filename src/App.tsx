import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import Header from "./components/Header";
import CardGrid from "./components/CardGrid";
import Drawer from "./components/Drawer";

const INITIAL_STORAGE: TaskCards[] = [
  {
    title: "IDEAS",
    color: "green.200",
    id: "IDEAS",
    order_key: 1,
    cards: [],
  },
  {
    title: "TO-DO",
    color: "orange.200",
    id: "TO-DO",
    order_key: 2,
    cards: [
      {
        title: "Write Code",
        id: "d7922d9d-08da-4566-b2b5-6e1626d27123",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum blanditiis tempore ducimus tenetur recusandae eius pariatur esse ab officiis, mollitia perspiciatis doloribus, libero ipsa excepturi, iste accusantium odit! Fugiat, cum.",
        due_date: "01/01/23",
      },
    ],
  },
  {
    title: "IN-PROGRESS",
    color: "yellow.200",
    id: "IN-PROGRESS",
    order_key: 3,
    cards: [],
  },
  {
    title: "DONE",
    color: "blue.200",
    id: "IN-PROGRESS",
    order_key: 4,
    cards: [],
  },
];

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useQuery({
    queryKey: ["task-cards"],
    queryFn: () => {
      const localStorage = window.localStorage.getItem("TO_DO_APP_CARDS");
      if (!localStorage) {
        window.localStorage.setItem(
          "TO_DO_APP_CARDS",
          JSON.stringify(INITIAL_STORAGE)
        );
        return INITIAL_STORAGE;
      }
      return JSON.parse(localStorage);
    },
  });

  return (
    <div className='App'>
      <>
        <Header onOpen={onOpen} />
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            <CardGrid cards={data} />
            <Drawer isOpen={isOpen} onClose={onClose} cards={data} />
          </>
        )}
      </>
    </div>
  );
}

export default App;

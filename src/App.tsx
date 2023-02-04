import React from "react";
import { VStack, useDisclosure } from "@chakra-ui/react";
import { useLocalStorage } from "./utils/localStorage";
import Header from "./components/Header";
import CardGrid from "./components/CardGrid";
import Drawer from "./components/Drawer";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [taskCards] = useLocalStorage();
  return (
    <div className='App'>
      <VStack bg='green.400' spacing={0} h='100vh'>
        <Header onOpen={onOpen} />
        {taskCards && <CardGrid cards={taskCards} onOpen={onOpen} />}
        <Drawer isOpen={isOpen} onClose={onClose} cards={taskCards} />
      </VStack>
    </div>
  );
}

export default App;

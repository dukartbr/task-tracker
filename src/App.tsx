import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import Header from "./components/Header";
import CardGrid from "./components/CardGrid";
import Drawer from "./components/Drawer";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className='App'>
      <>
        <Header onOpen={onOpen} />
        <CardGrid />
        <Drawer isOpen={isOpen} onClose={onClose} />
      </>
    </div>
  );
}

export default App;

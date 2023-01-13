import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import AddTaskForm from "./AddTaskForm";

export default function AddCardDrawer({
  isOpen,
  onClose,
  cards,
}: {
  isOpen: boolean;
  onClose: () => void;
  cards: TaskCards[];
}) {
  return (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose} size='lg'>
      <DrawerOverlay />
      <DrawerContent bg='teal.800'>
        <DrawerHeader textAlign='center' color='white' fontSize='xl'>
          Add A Task
        </DrawerHeader>
        <DrawerBody>
          <AddTaskForm cards={cards} onClose={onClose} />
        </DrawerBody>
        <DrawerFooter color='gray.300'>
          Task Cards Stored In Local Storage
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

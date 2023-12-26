import {
  Box,
  Button,
  Flex,
  Text,
  Spacer,
  Input,
  useDisclosure,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { TaskForm } from "./TaskForm";

export function TaskHeader({ handleSearch }: { handleSearch: (args) => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex px={8} py={6} justifyContent={["center", null, null, "start"]}>
        <Button
          bgColor="orange.400"
          color="white"
          fontWeight="bold"
          textTransform="uppercase"
          onClick={onOpen}
          rightIcon={<FaPlus />}
          _hover={{
            backgroundColor: "orange.500",
          }}
          transition="background-color 0.5s"
        >
          <Text mr={3}>Create Task</Text>
        </Button>
        <Spacer />
        <InputGroup maxW="320px">
          <InputLeftElement pointerEvents="none">
            <FaMagnifyingGlass />
          </InputLeftElement>
          <Input
            placeholder="Search for a Task"
            bgColor="white"
            onChange={handleSearch}
          />
        </InputGroup>
      </Flex>
      <TaskForm isOpen={isOpen} onClose={onClose} />
    </>
  );
}

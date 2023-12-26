import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Spacer,
  Text,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus, FaPlusMinus, FaMagnifyingGlass } from "react-icons/fa6";
import { TaskForm } from "../components/TaskForm";
import { useBoards } from "../data";

export function ProjectHeader({
  id,
  title,
  setActiveBoard,
}: {
  id: string;
  title: string;
  setActiveBoard: (args: string) => void;
}) {
  const {
    isOpen: isTaskFormOpen,
    onOpen: onTaskFormOpen,
    onClose: onTaskFormClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  return (
    <>
      <Box px={8} py={4} width="100%">
        <Flex>
          <Text color="white" fontSize="2xl" fontWeight="bold">
            {title}
          </Text>
          <Spacer />
          <Menu>
            <MenuButton
              color="white"
              as={Button}
              colorScheme="purple"
              rightIcon={<FaPlusMinus />}
            >
              Board Options
            </MenuButton>
            <MenuList>
              <MenuItem>Edit Board</MenuItem>
              <MenuItem onClick={onDeleteOpen}>Delete Board</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Divider my={4} />
        <Flex>
          <Button
            bgColor="orange.400"
            color="white"
            fontWeight="bold"
            textTransform="uppercase"
            onClick={onTaskFormOpen}
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
              onChange={() => null}
            />
          </InputGroup>
        </Flex>
      </Box>
      <TaskForm
        boardId={id}
        isOpen={isTaskFormOpen}
        onClose={onTaskFormClose}
      />
      <DeleteModal
        id={id}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        setActiveBoard={setActiveBoard}
      />
    </>
  );
}

function DeleteModal({ id, isOpen, onClose, setActiveBoard }) {
  const { deleteBoard } = useBoards(() => setActiveBoard());
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Are You Sure?</ModalHeader>
          <ModalBody>
            <Text>This Cannot Be Undone</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={async () => await deleteBoard(id)}
            >
              Confirm
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}

import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Link,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaReact,
  FaFigma,
  FaFileMedical,
  FaGithub,
  FaClipboardCheck,
  FaListCheck,
} from "react-icons/fa6";
import { BoardForm } from "./BoardForm";
import { useBoards } from "../data";

const boards = [
  {
    title: "Project 1",
    dueDate: "12/12/24",
    taskColumns: [],
  },
  {
    title: "Project 2",
    dueDate: "06/06/24",
    taskColumns: [],
  },
  {
    title: "Project 3",
    dueDate: "01/01/26",
    taskColumns: [],
  },
];

export function Sidebar({
  setActiveBoard,
}: {
  setActiveBoard: (id: string) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { boards } = useBoards();

  // !IMPORTANT - Temporary protection
  const boardsEnabled = false;
  return (
    <>
      <Flex
        bg="cyan.600"
        direction="column"
        alignItems="center"
        px={6}
        w="200px"
      >
        <Box py={8}>
          <Icon as={FaReact} color="white" fontSize="3xl" />
        </Box>
        {boardsEnabled ? (
          <>
            <Box py={8} width="100%">
              <Button
                width="100%"
                mb={5}
                colorScheme="blue"
                color="white"
                rightIcon={<FaListCheck />}
                onClick={() => setActiveBoard("")}
              >
                Task Tracker
              </Button>
              <Text
                textAlign="center"
                fontWeight="bold"
                fontSize="lg"
                textTransform="uppercase"
                color="white"
                width="100%"
              >
                Boards
              </Text>
              <Divider />
              <Flex direction="column" my={5}>
                {boards.map(({ title, id }) => (
                  <Button
                    colorScheme="teal"
                    key={id}
                    my={2}
                    color="white"
                    rightIcon={<FaClipboardCheck />}
                    onClick={() => setActiveBoard(id)}
                  >
                    {`${title.slice(0, 10)}...`}
                  </Button>
                ))}
              </Flex>
            </Box>
            <Spacer />
            <Button
              colorScheme="purple"
              rightIcon={<FaFileMedical />}
              onClick={onOpen}
              my={4}
              width="100%"
              textAlign="left"
            >
              Add Board
            </Button>
          </>
        ) : (
          <Spacer />
        )}
        <Divider />
        <Box textAlign="right" py={3} width="100%">
          <Flex direction="column">
            <Link
              href="https://www.figma.com/file/oxen1fyXzt5rAciomHfg5K/Custom-Dashboard?type=design&node-id=0%3A1&mode=design&t=mrumnsgmp73wu7kL-1"
              target="_blank"
              my={3}
            >
              <Button colorScheme="orange" width="100%" rightIcon={<FaFigma />}>
                Designs
              </Button>
            </Link>
            <Link
              href="https://github.com/dukartbr/task-tracker"
              target="_blank"
              my={3}
            >
              <Button colorScheme="green" width="100%" rightIcon={<FaGithub />}>
                Code
              </Button>
            </Link>
          </Flex>
        </Box>
      </Flex>
      <BoardForm isOpen={isOpen} onClose={onClose} />
    </>
  );
}

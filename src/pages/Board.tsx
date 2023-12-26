import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useBoards } from "../data";
import { TaskColumn } from "../components/TaskColumn";
import { ProjectHeader } from "../components/BoardHeader";

export function Board({
  id,
  isMobile,
  setActiveBoard,
}: {
  id: string;
  isMobile: boolean;
  setActiveBoard: (args: string) => void;
}) {
  const [board, setBoard] = useState<TaskBoard>();
  const { getBoardById } = useBoards();

  useEffect(() => {
    (async () => {
      try {
        const res = await getBoardById(id);
        setBoard(res);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  if (!board) return null;
  return (
    <Box maxW="100%">
      <Flex direction="column" width="100%" h="100dvh">
        <ProjectHeader
          id={id}
          title={board.title}
          setActiveBoard={setActiveBoard}
        />

        <Flex
          w="calc(100vw - 200px)"
          overflowX="scroll"
          css={{
            WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS devices
            "&::-webkit-scrollbar": {
              width: "0em", // Adjust the width of the scrollbar
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent", // Set the color of the scrollbar thumb
            },
          }}
        >
          {board.taskColumns.map((col) => (
            <Box mx={4} key={col.status}>
              <TaskColumn taskColumn={col} isMobile={isMobile} />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { TaskColumnContainer } from "../components/TaskColumnContainer";
import { TaskHeader } from "../components/TaskHeader";
import { useTasks } from "../data";

export function Tasks({ isMobile }: { isMobile: boolean }) {
  const { taskColumns: initialTaskColumns, updateTask } = useTasks();
  const [taskColumns, setTaskColumns] = useState<TaskColumn[]>([]);

  useEffect(() => {
    setTaskColumns(initialTaskColumns);
  }, [setTaskColumns, initialTaskColumns]);

  function handleSearch(e) {
    e.preventDefault();
    const searchValue = e.target.value;
    if (searchValue !== "") {
      setTaskColumns(
        taskColumns.map((column) => ({
          ...column,
          tasks: column.tasks.filter((task) =>
            task.title.toLowerCase().includes(searchValue.toLowerCase())
          ),
        }))
      );
    } else {
      setTaskColumns(taskColumns);
    }
  }
  return (
    <Flex direction="column" width="100%" h="100dvh">
      {!isMobile && <TaskHeader handleSearch={handleSearch} />}
      <TaskColumnContainer
        isMobile={isMobile}
        taskColumns={taskColumns}
        setTaskColumns={setTaskColumns}
        updateTask={updateTask}
      />
    </Flex>
  );
}

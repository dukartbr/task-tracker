import { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import {
  rectIntersection,
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  MouseSensor,
} from "@dnd-kit/core";
import { TaskColumn } from "../components/TaskColumn";
import { useTasks } from "../data";
import { Task } from "../components/Task";
import { TaskFooter } from "../components/TaskFooter";

export function TaskColumnContainer({
  isMobile,
  taskColumns,
  setTaskColumns,
  title,
  updateTask,
}: {
  isMobile: boolean;
  taskColumns: TaskColumn[];
  setTaskColumns: (args: TaskColumn[]) => void;
  updateTask: (task: Task) => void;
  title?: string;
}) {
  const [prevStatus, setPrevStatus] = useState("");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { getTaskById } = useTasks();

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  return (
    <Box width="100%" px={4} py={4}>
      <DndContext
        collisionDetection={rectIntersection}
        onDragStart={async (event) => {
          const taskId = event.active.id.toString();
          const currentTask = await getTaskById(taskId);

          setPrevStatus(currentTask.status ?? "0");
          setActiveTask(currentTask);

          const updatedTask = {
            ...currentTask,
            status: "",
          } as Task;
          updateTask(updatedTask);
        }}
        onDragEnd={async ({ over }) => {
          if (activeTask && !over) {
            updateTask({ ...activeTask, status: prevStatus } as Task);
          }

          if (activeTask && over) {
            updateTask({ ...activeTask, status: over?.id } as Task);
          }
          setPrevStatus("");
          setActiveTask(null);
        }}
        onDragCancel={() => {
          if (activeTask) {
            updateTask({ ...activeTask, status: prevStatus });
          }
          setPrevStatus("");
          setActiveTask(null);
        }}
        sensors={sensors}
      >
        <Grid
          templateColumns={[
            "1fr",
            null,
            null,
            `repeat(${taskColumns?.length}, 1fr)`,
          ]}
          gap={6}
          overflow={isMobile ? "scroll" : "inherit"}
          maxH={isMobile ? "calc(100vh - 150px)" : undefined}
          mt={isMobile ? 6 : undefined}
          pb={isMobile ? "150px" : undefined}
          bgColor="gray.700"
          // overflowY="scroll"
          maxWidth="100%"
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
          {taskColumns
            ?.sort((a, b) => (a.status > b.status ? 1 : -1))
            .map((task) => (
              <GridItem key={task.title}>
                <TaskColumn isMobile={isMobile} taskColumn={task} />
              </GridItem>
            ))}
        </Grid>
        <DragOverlay>{activeTask && <Task task={activeTask} />}</DragOverlay>
      </DndContext>
      {isMobile && <TaskFooter />}
    </Box>
  );
}

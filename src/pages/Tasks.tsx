import { useState } from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import {
	rectIntersection,
	DndContext,
	DragOverlay,
	useSensor,
	useSensors,
	MouseSensor,
} from "@dnd-kit/core";
import { TaskColumn } from "../components/TaskColumn";
import { TaskHeader } from "../components/TaskHeader";
import { useTasks } from "../data";
import { Task } from "../components/Task";

export function Tasks({ isMobile }: { isMobile: boolean }) {
	const [activeTask, setActiveTask] = useState<Task | null>(null);
	const { getTaskById, taskColumns, updateTask, isLoading } = useTasks();

	const mouseSensor = useSensor(MouseSensor, {
		// Require the mouse to move by 10 pixels before activating
		activationConstraint: {
			distance: 10,
		},
	});

	const sensors = useSensors(mouseSensor);

	return (
		<Flex
			w="100%"
			paddingY={!isMobile ? 4 : undefined}
			px={!isMobile ? [5, null, null, 8] : undefined}
			justifyContent="center"
		>
			{!isLoading && (
				<Box maxW={!isMobile ? "1400px" : undefined} width="100%">
					{!isMobile && <TaskHeader />}
					<DndContext
						collisionDetection={rectIntersection}
						onDragStart={async (event) => {
							const taskId = event.active.id.toString();
							const currentTask = await getTaskById(taskId);
							setActiveTask(currentTask);
							const updatedTask = {
								...currentTask,
								status: "",
							} as Task;
							updateTask(updatedTask);
						}}
						onDragEnd={async ({ over }) => {
							if (!over) {
								return;
							}

							if (activeTask) {
								updateTask({ ...activeTask, status: over?.id } as Task);
							}
							setActiveTask(null);
						}}
						onDragCancel={() => {
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
										<TaskColumn
											isMobile={isMobile}
											task={task}
											activeTask={activeTask}
										/>
									</GridItem>
								))}
						</Grid>
						<DragOverlay>
							{activeTask && <Task task={activeTask} />}
						</DragOverlay>
					</DndContext>
					{isMobile && (
						<Box position="fixed" width="100%" bottom={0} bg="gray.700">
							<TaskHeader />
						</Box>
					)}
				</Box>
			)}
		</Flex>
	);
}

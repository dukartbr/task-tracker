import { useEffect, useState } from "react";
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
import { TaskFooter } from "../components/TaskFooter";

export function Tasks({ isMobile }: { isMobile: boolean }) {
	const [prevStatus, setPrevStatus] = useState("");
	const [activeTask, setActiveTask] = useState<Task | null>(null);
	const {
		getTaskById,
		taskColumns: initialTaskColumns,

		updateTask,
		isLoading,
	} = useTasks();

	const [taskColumns, setTaskColumns] = useState<TaskColumn[]>([]);

	const mouseSensor = useSensor(MouseSensor, {
		// Require the mouse to move by 10 pixels before activating
		activationConstraint: {
			distance: 10,
		},
	});

	const sensors = useSensors(mouseSensor);

	useEffect(() => {
		setTaskColumns(initialTaskColumns);
	}, [setTaskColumns, initialTaskColumns]);

	function handleSearch(e: any) {
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
			setTaskColumns(initialTaskColumns);
		}
	}

	return (
		<Flex
			w="100%"
			paddingY={!isMobile ? 4 : undefined}
			px={!isMobile ? [5, null, null, 8] : undefined}
			justifyContent="center"
		>
			{!isLoading && (
				<Box maxW={!isMobile ? "1400px" : undefined} width="100%">
					{!isMobile && <TaskHeader handleSearch={handleSearch} />}
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
					{isMobile && <TaskFooter />}
				</Box>
			)}
		</Flex>
	);
}

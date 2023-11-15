import { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { rectIntersection, DndContext, DragOverlay } from "@dnd-kit/core";
import { TaskColumn } from "../components/TaskColumn";
import { Header } from "../components/Header";
import { useTasks } from "../data";

export function Tasks() {
	const [isDragging, setIsDragging] = useState(false);
	const { taskColumns, updateTask } = useTasks();

	return (
		<Box w="100%" paddingY={4} px={8}>
			<Header />
			<DndContext
				collisionDetection={rectIntersection}
				onDragStart={() => setIsDragging(true)}
				onDragEnd={({ over, active }) => {
					const updatedTask = {
						...active?.data?.current,
						status: over?.id,
					} as Task;
					console.log("over", over);
					console.log("updatedTask", updatedTask);
					updateTask(updatedTask);
				}}
				onDragCancel={() => setIsDragging(false)}
			>
				<Grid templateColumns={`repeat(${taskColumns?.length}, 1fr)`} gap={6}>
					{taskColumns
						?.sort((a, b) => (a.status > b.status ? 1 : -1))
						.map((task) => (
							<GridItem key={task.title}>
								<TaskColumn task={task} />
							</GridItem>
						))}
				</Grid>
				<DragOverlay />
			</DndContext>
		</Box>
	);
}

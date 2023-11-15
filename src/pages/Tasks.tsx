import { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { rectIntersection, DndContext, DragOverlay } from "@dnd-kit/core";
import { TaskColumn } from "../components/TaskColumn";
import { TaskHeader } from "../components/TaskHeader";
import { useTasks } from "../data";

export function Tasks({ isMobile }: { isMobile: boolean }) {
	const [_isDragging, setIsDragging] = useState(false);
	const { taskColumns, updateTask } = useTasks();

	return (
		<Box w="100%" paddingY={4} px={[5, null, 8]}>
			{!isMobile && <TaskHeader />}
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
				<Grid
					templateColumns={["1fr", null, `repeat(${taskColumns?.length}, 1fr)`]}
					gap={[3, null, 6]}
					overflow={isMobile ? "scroll" : "inherit"}
					maxH={isMobile ? "calc(100vh - 200px)" : undefined}
				>
					{taskColumns
						?.sort((a, b) => (a.status > b.status ? 1 : -1))
						.map((task) => (
							<GridItem key={task.title}>
								<TaskColumn isMobile={isMobile} task={task} />
							</GridItem>
						))}
				</Grid>
				<DragOverlay />
			</DndContext>
			{isMobile && (
				<Box position="fixed" width="100%" bottom={0}>
					<TaskHeader />
				</Box>
			)}
		</Box>
	);
}

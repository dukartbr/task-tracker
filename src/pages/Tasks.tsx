import { useState } from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { rectIntersection, DndContext, DragOverlay } from "@dnd-kit/core";
import { TaskColumn } from "../components/TaskColumn";
import { TaskHeader } from "../components/TaskHeader";
import { useTasks } from "../data";

export function Tasks({ isMobile }: { isMobile: boolean }) {
	const [_isDragging, setIsDragging] = useState(false);
	const { taskColumns, updateTask, isLoading } = useTasks();

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
						onDragStart={() => setIsDragging(true)}
						onDragEnd={({ over, active }) => {
							const updatedTask = {
								...active?.data?.current,
								status: over?.id,
							} as Task;
							updateTask(updatedTask);
						}}
						onDragCancel={() => setIsDragging(false)}
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
									width: "0.5em", // Adjust the width of the scrollbar
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
										<TaskColumn isMobile={isMobile} task={task} />
									</GridItem>
								))}
						</Grid>
						<DragOverlay />
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

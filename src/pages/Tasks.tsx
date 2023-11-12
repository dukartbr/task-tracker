import { Box, Grid, GridItem } from "@chakra-ui/react";
import { DndContext } from "@dnd-kit/core";
import { TaskColumn } from "../components/TaskColumn";
import { Header } from "../components/Header";
import { useTasks } from "../data";

export function Tasks() {
	const { taskColumns } = useTasks();

	return (
		<Box w="100%" paddingY={4} px={8}>
			<Header />
			<DndContext>
				<Grid templateColumns={`repeat(${taskColumns?.length}, 1fr)`} gap={6}>
					{taskColumns
						?.sort((a, b) => (a.status > b.status ? 1 : -1))
						.map((task) => (
							<GridItem key={task.title}>
								<TaskColumn task={task} />
							</GridItem>
						))}
				</Grid>
			</DndContext>
		</Box>
	);
}

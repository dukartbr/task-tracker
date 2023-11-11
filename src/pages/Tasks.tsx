import { Box, Grid, GridItem } from "@chakra-ui/react";
import { DndContext } from "@dnd-kit/core";
import { TaskColumn } from "../components/TaskColumn";
import { Header } from "../components/Header";
import { useTasks } from "../data";

export const taskGroups: TaskColumn[] = [
	{
		title: "Backlog",
		status: "0",
		tasks: [],
	},
	{
		title: "In Progress",
		status: "1",
		tasks: [],
	},
	{
		title: "Review",
		status: "2",
		tasks: [],
	},
	{
		title: "Done",
		status: "3",
		tasks: [],
	},
];

export function Tasks() {
	const { tasks } = useTasks();

	console.log("tasks", tasks);

	return (
		<Box w="100%" paddingY={4} px={8}>
			<Header />
			<DndContext>
				<Grid templateColumns={`repeat(${tasks?.length}, 1fr)`} gap={6}>
					{tasks
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

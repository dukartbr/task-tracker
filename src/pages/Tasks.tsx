import { Box, Grid, GridItem } from "@chakra-ui/react";
import { DndContext } from "@dnd-kit/core";
import { TaskColumn } from "../components/TaskColumn";
import { Header } from "../components/Header";

export const taskGroups: TaskColumn[] = [
	{
		title: "Backlog",
		tasks: [
			{
				title: "Plan next week's project",
				createdDate: "2023-11-08",
				dueDate: "2023-11-15",
			},
			{
				title: "Research market trends",
				createdDate: "2023-11-09",
				dueDate: "2023-11-16",
			},
		],
	},
	{
		title: "In Progress",
		tasks: [
			{
				title: "Develop new feature",
				createdDate: "2023-11-10",
				dueDate: "2023-11-17",
			},
		],
	},
	{
		title: "Tech Review",
		tasks: [
			{
				title: "Review code quality",
				createdDate: "2023-11-11",
				dueDate: "2023-11-18",
			},
		],
	},
	{
		title: "Done",
		tasks: [
			{
				title: "Release version 2.0",
				createdDate: "2023-11-12",
				dueDate: "2023-11-19",
			},
		],
	},
];

export function Tasks({ tasks }: { tasks: TaskColumn[] }) {
	return (
		<Box w="100%" paddingY={4} px={8}>
			<Header />
			<DndContext>
				<Grid templateColumns={`repeat(${tasks.length}, 1fr)`} gap={6}>
					{tasks.map((task) => (
						<GridItem key={task.title}>
							<TaskColumn task={task} />
						</GridItem>
					))}
				</Grid>
			</DndContext>
		</Box>
	);
}

import { Box, Grid, GridItem } from "@chakra-ui/react";
import { DndContext } from "@dnd-kit/core";
import { useLocalStorage } from "react-use";
import { TaskColumn } from "../components/TaskColumn";
import { Header } from "../components/Header";

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
	const [tasks] = useLocalStorage<TaskColumn[]>("task-tracker", taskGroups);
	return (
		<Box w="100%" paddingY={4} px={8}>
			<Header />
			<DndContext>
				<Grid templateColumns={`repeat(${tasks?.length}, 1fr)`} gap={6}>
					{tasks
						?.sort((a, b) => {
							if (a.status > b.status) {
								return 1;
							}
							return -1;
						})
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

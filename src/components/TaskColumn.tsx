import { Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { Task } from "./Task";

export function TaskColumn({ task }: { task: TaskColumn }) {
	const { setNodeRef } = useDroppable({
		id: task.status,
		data: {
			type: task.status,
		},
	});

	return (
		<Flex direction="column">
			<Text
				fontSize="2xl"
				textTransform="uppercase"
				textAlign="center"
				fontWeight="bold"
				color="white"
				noOfLines={1}
			>
				{task.title}
			</Text>
			<Flex
				direction="column"
				bg="orange.100"
				borderRadius={12}
				py={8}
				px={4}
				minH="calc(100vh - 200px)"
				ref={setNodeRef}
			>
				{task?.tasks
					?.sort((a, b) => (a.priority > b.priority ? 1 : -1))
					.map((task) => {
						return <Task key={task.id} task={task} />;
					})}
			</Flex>
		</Flex>
	);
}

import { Flex, Text } from "@chakra-ui/react";
import { Task } from "./Task";

export function TaskColumn({ task }: { task: TaskColumn }) {
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

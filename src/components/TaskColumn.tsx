import { Box, Flex, Text } from "@chakra-ui/react";

export function TaskColumn({ task }: { task: TaskColumn }) {
	return (
		<Flex direction="column">
			<Text
				fontSize="2xl"
				textTransform="uppercase"
				textAlign="center"
				fontWeight="bold"
				color="white"
			>
				{task.title}
			</Text>
			<Flex
				direction="column"
				bg="orange.100"
				minH="calc(100vh - 70px)"
				borderRadius={12}
				py={8}
				px={4}
			>
				{task.tasks.map((task) => {
					return (
						<Box key={task.title}>
							<Text>{task.title}</Text>
						</Box>
					);
				})}
			</Flex>
		</Flex>
	);
}

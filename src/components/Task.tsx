import { Box, Flex, Text } from "@chakra-ui/react";

export function Task({ task }: { task: Task }) {
	return (
		<Box
			bgColor="cyan.400"
			borderRadius={12}
			py={5}
			px={4}
			my={4}
			boxShadow="lg"
		>
			<Flex>
				{/* Add Priority Icon */}
				<Text fontSize="lg" fontWeight="bold">
					{task.title}
				</Text>
			</Flex>
			<Text color="white">{task.dueDate}</Text>
			<Text color="white" opacity={0.5}>
				{task.createdDate}
			</Text>
		</Box>
	);
}

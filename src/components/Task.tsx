import { Box, Flex, Text } from "@chakra-ui/react";

export function Task({ task }: { task: Task }) {
	return (
		<Box bgColor="cyan.400">
			<Flex>
				{/* Add Priority Icon */}
				<Text fontSize="lg" fontWeight="bold">
					{task.title}
				</Text>
			</Flex>
		</Box>
	);
}

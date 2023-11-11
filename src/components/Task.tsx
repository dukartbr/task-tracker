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
				<Box
					w="20px"
					h="20px"
					// @ts-ignore
					bgColor={`${priorityColor(parseInt(task.priority))}.400`}
					borderRadius={4}
					pl="3px"
					pt="3px"
				>
					<Box bgColor="white" h="13px" w="13px" borderRadius={18}></Box>
				</Box>
				<Text fontSize="lg" fontWeight="bold" ml={3}>
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

function priorityColor(p: number) {
	if (p === 0) return "green";
	if (p === 1) return "yellow";
	if (p === 2) return "red";
	return "gray";
}

import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { TaskOptions } from "./TaskOptions";
import { useDraggable } from "@dnd-kit/core";

export function Task({ task }: { task: Task }) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task.id,
	});
	return (
		<Box position="relative">
			<Box
				bgColor="cyan.400"
				borderRadius={12}
				py={5}
				px={4}
				my={4}
				boxShadow="lg"
				ref={setNodeRef}
				{...listeners}
				{...attributes}
				transform={
					transform
						? `translate3d(${transform.x}px, ${transform.y}px, 10)`
						: undefined
				}
			>
				<Flex width="100%" alignItems="center">
					<PriorityBox priority={task.priority} />
					<Text
						fontSize="lg"
						fontWeight="bold"
						ml={3}
						noOfLines={1}
						maxW="150px"
					>
						{task.title}
					</Text>
					<Spacer />
				</Flex>

				<Box>
					{/* <Text color="white">{task.dueDate}</Text> */}
					<Text color="white" mt={2} noOfLines={1}>
						{task.createdDate && !task.editedDate
							? `Created at: ${task.createdDate}`
							: `Edited at ${task.editedDate}`}
					</Text>
					<Text mt={2}>{task.details?.substring(0, 120)}</Text>
				</Box>
			</Box>
			<TaskOptions task={task} />
		</Box>
	);
}

function PriorityBox({ priority }: { priority: string }) {
	return (
		<Box
			minW="20px"
			maxW="20px"
			w="20px"
			minH="20px"
			maxH="20px"
			h="20px"
			bgColor={`${priorityColor(parseInt(priority))}.400`}
			borderRadius={4}
			pl="3px"
			pt="3px"
		>
			<Box bgColor="white" h="13px" w="13px" borderRadius={18}></Box>
		</Box>
	);
}

function priorityColor(p: number) {
	if (p === 0) return "green";
	if (p === 1) return "yellow";
	if (p === 2) return "red";
	return "gray";
}

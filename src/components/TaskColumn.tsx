import {
	Box,
	Flex,
	IconButton,
	Spacer,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { FaAngleDown } from "react-icons/fa6";
import { Task } from "./Task";

export function TaskColumn({
	task,
	isMobile,
	activeTask,
	isDragging,
}: {
	task: TaskColumn;
	isMobile: boolean;
	activeTask?: Task;
	isDragging: boolean;
}) {
	const { isOpen, onToggle } = useDisclosure();

	const { isOver, setNodeRef } = useDroppable({
		id: task.status,
		data: {
			type: task.status,
		},
	});

	console.log("isDragging", isDragging);

	const taskAmount = task?.tasks.length;

	return (
		<Flex
			direction="column"
			alignItems="center"
			width="100%"
			h="auto"
			overflow="hidden"
			px={isMobile ? 6 : undefined}
		>
			<Text
				fontSize="2xl"
				textTransform="uppercase"
				textAlign="center"
				fontWeight="bold"
				color="white"
				noOfLines={1}
				mb={3}
			>
				{task.title}
			</Text>
			<Flex
				direction="column"
				bgColor={isOver ? "orange.200" : "orange.100"}
				borderRadius={12}
				py={8}
				px={4}
				h={!isMobile ? "calc(100vh - 300px)" : undefined}
				maxW={!isMobile ? "300px" : "700px"}
				width="100%"
				ref={setNodeRef}
				overflowY="scroll"
				css={{
					WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS devices
					"&::-webkit-scrollbar": {
						width: "0.5em", // Adjust the width of the scrollbar
					},
					"&::-webkit-scrollbar-thumb": {
						backgroundColor: "transparent", // Set the color of the scrollbar thumb
					},
				}}
			>
				{!isMobile || (isMobile && isOpen) ? (
					// nasty logic here, refactor
					<Box>
						{isMobile && (
							<Flex width="100%" justifyContent="right">
								<Text fontSize="xl" fontWeight="bold">
									{taskAmount}&nbsp;{taskAmount === 1 ? "Task" : "Tasks"}
								</Text>
								<Spacer />
								<IconButton
									icon={<FaAngleDown color="gray.700" />}
									aria-label="toggle task"
									variant="unstyled"
									onClick={onToggle}
								/>
							</Flex>
						)}
						<Box
							overflow={isMobile ? "scroll" : undefined}
							css={{
								WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS devices
								"&::-webkit-scrollbar": {
									width: "0.5em", // Adjust the width of the scrollbar
								},
								"&::-webkit-scrollbar-thumb": {
									backgroundColor: "transparent", // Set the color of the scrollbar thumb
								},
							}}
						>
							{task?.tasks
								// ?.sort((a, b) => (a.priority > b.priority ? -1 : 1))
								?.filter((task) =>
									isDragging ? task.id !== activeTask?.id : true
								)
								.map((task) => {
									return <Task key={task.id} task={task} />;
								})}
						</Box>
					</Box>
				) : (
					<Flex>
						<Text fontSize="xl" fontWeight="bold">
							{taskAmount}&nbsp;{taskAmount === 1 ? "Task" : "Tasks"}
						</Text>

						<>
							<Spacer />
							<IconButton
								icon={<FaAngleDown color="gray.700" />}
								aria-label="toggle task"
								variant="unstyled"
								onClick={onToggle}
							/>
						</>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
}

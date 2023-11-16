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
}: {
	task: TaskColumn;
	isMobile: boolean;
}) {
	const { isOpen, onToggle } = useDisclosure();

	const { setNodeRef } = useDroppable({
		id: task.status,
		data: {
			type: task.status,
		},
	});

	const taskAmount = task?.tasks.length;

	return (
		<Flex direction="column">
			<Text
				fontSize="2xl"
				textTransform="uppercase"
				textAlign={["left", null, "center"]}
				fontWeight="bold"
				color="white"
				noOfLines={1}
				mb={3}
			>
				{task.title}
			</Text>
			<Flex
				direction="column"
				bg="orange.100"
				borderRadius={12}
				py={8}
				px={4}
				minH={!isMobile ? "calc(100vh - 200px)" : undefined}
				maxW="300px"
				ref={setNodeRef}
			>
				{!isMobile || (isMobile && isOpen) ? (
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
						<Box overflow={isMobile ? "scroll" : undefined}>
							{task?.tasks
								?.sort((a, b) => (a.priority > b.priority ? 1 : -1))
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
						{taskAmount !== 0 && (
							<>
								<Spacer />
								<IconButton
									icon={<FaAngleDown color="gray.700" />}
									aria-label="toggle task"
									variant="unstyled"
									onClick={onToggle}
								/>
							</>
						)}
					</Flex>
				)}
			</Flex>
		</Flex>
	);
}

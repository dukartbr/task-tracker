import {
	Box,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Text,
	IconButton,
	useDisclosure,
} from "@chakra-ui/react";
import { FaEllipsis } from "react-icons/fa6";
import { useTasks } from "../data";
import { TaskForm } from "./TaskForm";

export function TaskOptions({ task }: { task: Task }) {
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();

	const {
		isOpen: isEditOpen,
		onOpen: onEditOpen,
		onClose: onEditClose,
	} = useDisclosure();

	return (
		<>
			<Box>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="options"
						icon={<FaEllipsis />}
						variant="ghost"
					/>
					<MenuList>
						<MenuItem onClick={onEditOpen}>Edit Task</MenuItem>
						<MenuItem onClick={onDeleteOpen}>Delete Task</MenuItem>
					</MenuList>
				</Menu>
			</Box>
			<DeleteConfirmation
				taskId={task.id}
				isOpen={isDeleteOpen}
				onClose={onDeleteClose}
			/>
			<TaskForm isOpen={isEditOpen} onClose={onEditClose} task={task} />
		</>
	);
}

function DeleteConfirmation({
	isOpen,
	onClose,
	taskId,
}: {
	isOpen: boolean;
	onClose: () => void;
	taskId: string;
}) {
	const { deleteTask } = useTasks();
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Are You Sure?</ModalHeader>
				<ModalBody>
					<Text>This cannot be undone</Text>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={() => deleteTask(taskId)}>
						Confirm
					</Button>
					<Button variant="ghost" onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
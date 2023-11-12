import {
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	ModalBody,
	ModalFooter,
	Select,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { FaPlus } from "react-icons/fa6";
import { v4 as uuidV4 } from "uuid";
import { useTasks } from "../data";

interface TaskValues {
	title: string;
	priority: string;
	status: string;
	dueDate: string;
}

function TitleInput(props: any) {
	return (
		<Input
			placeholder="Enter a Description..."
			backgroundColor="white"
			{...props}
		/>
	);
}

function PrioritySelect(props: any) {
	return (
		<Select placeholder="Select" backgroundColor="white" {...props}>
			<option value={0}>Low</option>
			<option value={1}>Medium</option>
			<option value={2}>High</option>
		</Select>
	);
}

function StatusSelect(props: any) {
	return (
		<Select placeholder="Select" backgroundColor="white" {...props}>
			<option value={0}>Backlog</option>
			<option value={1}>In Progress</option>
			<option value={2}>Review</option>
			<option value={3}>Done</option>
		</Select>
	);
}

export function TaskForm({
	isOpen,
	onClose,
	task,
}: {
	isOpen: boolean;
	onClose: () => void;
	task?: Task;
}) {
	const { createTask, updateTask } = useTasks(onClose);
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent bgColor="gray.600">
				<ModalHeader color="white" textTransform="uppercase">
					Create Task
				</ModalHeader>
				<ModalCloseButton color="white" />
				<ModalBody>
					<Box>
						<Formik
							initialValues={{
								title: task?.title ?? "",
								priority: task?.priority ?? "",
								status: task?.status ?? "",
								dueDate: task?.dueDate ?? "",
							}}
							onSubmit={(values: TaskValues) => {
								if (task) {
									updateTask({
										id: task.id,
										editedDate: new Date().toLocaleString(),
										...values,
									});
									return;
								}
								createTask({
									id: uuidV4(),
									createdDate: new Date().toLocaleString(),
									...values,
								} as Task);
							}}
						>
							{({ isSubmitting }) => (
								<Form>
									<ModalBody>
										<FormControl my={6}>
											<FormLabel color="white">Title</FormLabel>
											<Field id="title" name="title" as={TitleInput} />
										</FormControl>
										<FormControl my={6}>
											<FormLabel color="white">Priority</FormLabel>
											<Field
												id="priority"
												name="priority"
												as={PrioritySelect}
											/>
										</FormControl>
										<FormControl my={6}>
											<FormLabel color="white">Status</FormLabel>
											<Field id="status" name="status" as={StatusSelect} />
										</FormControl>
									</ModalBody>
									<ModalFooter>
										<Button
											colorScheme="orange"
											type="submit"
											rightIcon={isSubmitting ? undefined : <FaPlus />}
											w="130px"
										>
											{isSubmitting ? <Spinner /> : <Text>Create Task</Text>}
										</Button>
									</ModalFooter>
								</Form>
							)}
						</Formik>
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

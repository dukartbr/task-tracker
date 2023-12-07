import { forwardRef, useState } from "react";
import {
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	ModalBody,
	ModalFooter,
	Select,
	Spinner,
	Text,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { v4 as uuidV4 } from "uuid";
import dayjs from "dayjs";
import { useTasks } from "../data";
import { DeleteConfirmation } from "./TaskOptions";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const TaskFormSchema = Yup.object().shape({
	title: Yup.string().required("Required"),
	priority: Yup.string().required("Required"),
	status: Yup.string().required("Required"),
});

interface TaskValues {
	title: string;
	priority: string;
	status: string;
	details: string;
	// dueDate: string;
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
	const [dueDate, setDueDate] = useState(
		task?.dueDate ? new Date(task?.dueDate) : undefined
	);
	const hasTask = !!task;
	const { createTask, updateTask } = useTasks(onClose);
	const isOverdue = !!dayjs().isAfter(dayjs(task?.dueDate).add(1, "day"));
	const daysLeft = task?.dueDate ? dayjs(dueDate).diff(new Date(), "d") : null;

	// @ts-expect-error
	const DueDate = forwardRef(({ onClick, value, placeholder }, ref) => {
		const hasValue = value.length > 0;
		return (
			// @ts-expect-error
			<Button width="100%" onClick={onClick} ref={ref}>
				{hasValue ? value : placeholder}
			</Button>
		);
	});

	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();

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
								details: task?.details ?? "",
							}}
							validationSchema={TaskFormSchema}
							onSubmit={(values: TaskValues) => {
								if (task) {
									updateTask({
										id: task.id,
										createdDate: task.createdDate,
										dueDate: dueDate ? dueDate.toLocaleDateString() : undefined,
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
							{({ isSubmitting, errors, touched }) => (
								<Form>
									<ModalBody>
										<FormControl my={6}>
											<FormLabel color="white">Title*</FormLabel>
											<Field id="title" name="title" as={TitleInput} />
											{errors.title}
											{errors.title && touched.title ? (
												<Text color="red.400" fontWeight="bold"></Text>
											) : null}
										</FormControl>
										<FormControl my={6}>
											<FormLabel color="white">
												<Flex>
													Due Date
													{isOverdue ? (
														<Text color="red.400" fontWeight="bold">
															&nbsp;-&nbsp;Overdue!
														</Text>
													) : daysLeft ? (
														<>:&nbsp;{daysLeft}&nbsp;Days Left</>
													) : null}
												</Flex>
											</FormLabel>
											<Flex>
												<DatePicker
													selected={dueDate}
													onChange={(date) => (date ? setDueDate(date) : null)}
													placeholderText="No Due Date"
													customInput={<DueDate />}
												/>
												{dueDate && (
													<Button
														ml={8}
														bgColor="orange.200"
														onClick={() => setDueDate(undefined)}
													>
														Clear Due Date
													</Button>
												)}
											</Flex>
										</FormControl>
										<FormControl my={6}>
											<FormLabel color="white">Priority*</FormLabel>
											<Field
												id="priority"
												name="priority"
												as={PrioritySelect}
											/>
											{errors.priority && touched.priority ? (
												<Text color="red.400" fontWeight="bold">
													{errors.priority}
												</Text>
											) : null}
										</FormControl>
										<FormControl my={6}>
											<FormLabel color="white">Status*</FormLabel>
											<Field id="status" name="status" as={StatusSelect} />
											{errors.status && touched.status ? (
												<Text color="red.400" fontWeight="bold">
													{errors.status}
												</Text>
											) : null}
										</FormControl>
										<FormControl my={6}>
											<FormLabel color="white">Details</FormLabel>
											<Field
												id="details"
												name="details"
												bgColor="white"
												as={Textarea}
											/>
										</FormControl>
									</ModalBody>
									<ModalFooter>
										<Flex>
											{task && (
												<Button
													mr={4}
													rightIcon={<FaRegTrashCan />}
													onClick={onDeleteOpen}
												>
													Delete Task
												</Button>
											)}
											<Button
												colorScheme="orange"
												type="submit"
												rightIcon={isSubmitting ? undefined : <FaPlus />}
												w="130px"
											>
												{isSubmitting ? (
													<Spinner />
												) : (
													<Text>{hasTask ? "Save" : "Create"} Task</Text>
												)}
											</Button>
										</Flex>
									</ModalFooter>
								</Form>
							)}
						</Formik>
					</Box>
				</ModalBody>
			</ModalContent>
			{task && (
				<DeleteConfirmation
					onClose={onDeleteClose}
					isOpen={isDeleteOpen}
					taskId={task.id}
				/>
			)}
		</Modal>
	);
}

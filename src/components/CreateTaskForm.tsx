import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	ModalBody,
	ModalFooter,
	Select,
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

export function CreateTaskForm() {
	const { createTask } = useTasks();
	return (
		<Box>
			<Formik
				initialValues={{
					title: "",
					priority: "",
					status: "",
					dueDate: "",
				}}
				onSubmit={(values: TaskValues) =>
					createTask({
						id: uuidV4(),
						createdDate: new Date().toLocaleString(),
						...values,
					} as Task)
				}
			>
				<Form>
					<ModalBody>
						<FormControl my={6}>
							<FormLabel color="white">Title</FormLabel>
							<Field id="title" name="title" as={TitleInput} />
						</FormControl>
						<FormControl my={6}>
							<FormLabel color="white">Priority</FormLabel>
							<Field id="priority" name="priority" as={PrioritySelect} />
						</FormControl>
						<FormControl my={6}>
							<FormLabel color="white">Status</FormLabel>
							<Field id="status" name="status" as={StatusSelect} />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="orange" type="submit" rightIcon={<FaPlus />}>
							Create Task
						</Button>
					</ModalFooter>
				</Form>
			</Formik>
		</Box>
	);
}

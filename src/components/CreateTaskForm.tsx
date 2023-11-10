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
import { FaPlus } from "react-icons/fa6";
import { Formik, Field, Form, FormikHelpers } from "formik";

interface TaskValues {
	title: string;
	priority: number;
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

export function CreateTaskForm() {
	return (
		<Box>
			<Formik
				initialValues={{
					title: "",
					priority: 0,
					dueDate: "",
				}}
				onSubmit={(
					values: TaskValues,
					{ setSubmitting }: FormikHelpers<TaskValues>
				) => {
					setTimeout(() => {
						console.log("values", values);
						setSubmitting(false);
					}, 500);
				}}
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
						{/* Add calendar using date-picker */}
						{/* <FormControl my={6}>
							<FormLabel color="white">Due Date</FormLabel>
							<Input
								placeholder="Enter a Due Date..."
								backgroundColor="white"
							/>
						</FormControl> */}
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

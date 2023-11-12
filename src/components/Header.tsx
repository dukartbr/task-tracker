import { Button, Flex, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { TaskForm } from "./TaskForm";

export function Header() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Flex w="100%" py={8}>
				<Spacer />
				<Button
					bgColor="orange.400"
					color="white"
					fontWeight="bold"
					textTransform="uppercase"
					onClick={onOpen}
					rightIcon={<FaPlus />}
					_hover={{
						backgroundColor: "orange.500",
					}}
					transition="background-color 0.5s"
				>
					<Text mr={3}>Create Task</Text>
				</Button>
			</Flex>
			<TaskForm isOpen={isOpen} onClose={onClose} />
		</>
	);
}
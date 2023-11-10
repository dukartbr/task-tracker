import {
	Button,
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Spacer,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";

import { CreateTaskForm } from "./CreateTaskForm";

export function Header() {
	const { isOpen, onClose, onOpen } = useDisclosure();
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
				>
					<Text mr={3}>Create Task</Text>
				</Button>
			</Flex>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bgColor="gray.600">
					<ModalHeader color="white" textTransform="uppercase">
						Create Task
					</ModalHeader>
					<ModalCloseButton color="white" />
					<ModalBody>
						<CreateTaskForm />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

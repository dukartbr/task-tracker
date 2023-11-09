import {
	Box,
	Button,
	Flex,
	Icon,
	Spacer,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { FaReact } from "react-icons/fa6";

export function Sidebar() {
	const { isOpen, onToggle } = useDisclosure();
	return (
		<Flex
			bg="cyan.500"
			h="100vh"
			w={isOpen ? "300px" : "110px"}
			transition="width 0.25s"
			direction="column"
		>
			<Box pt={4}>
				{!isOpen ? (
					<Box textAlign="center">
						<Icon as={FaReact} color="white" fontSize="3xl" />
					</Box>
				) : (
					<Text>Sidebar</Text>
				)}
			</Box>
			<Spacer />
			<Box textAlign="right" pb={2} pr={4}>
				<Button onClick={() => onToggle()}>Toggle</Button>
			</Box>
		</Flex>
	);
}

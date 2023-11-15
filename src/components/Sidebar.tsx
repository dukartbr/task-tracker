import {
	Box,
	Button,
	Flex,
	Heading,
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
			w={isOpen ? "300px" : "115px"}
			transition="width 0.25s"
			direction="column"
		>
			<Box pt={4}>
				{!isOpen ? (
					<Box textAlign="center">
						<Icon as={FaReact} color="white" align="center" fontSize="3xl" />
					</Box>
				) : (
					<TextContent />
				)}
			</Box>
			<Spacer />
			<Box textAlign="right" pb={2} pr={4}>
				<Button variant="ghost" onClick={() => onToggle()}>
					Toggle Info
				</Button>
			</Box>
		</Flex>
	);
}

function TextContent() {
	return (
		<Box px={2}>
			<Heading>Howdy!</Heading>
			<Text>
				Thanks for checking this project out. This is a simple task manager app
				that's continuously in progress. You can check out the progress or give
				feedback in the{" "}
				<a href="https://github.com/dukartbr/task-tracker" target="_blank">
					repo
				</a>
			</Text>
		</Box>
	);
}

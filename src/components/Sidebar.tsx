import {
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	Link,
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

			<Box textAlign="right" pb={7} pr={4}>
				<Flex direction="column" px={2}>
					<Link
						href="https://www.figma.com/file/oxen1fyXzt5rAciomHfg5K/Custom-Dashboard?type=design&node-id=0%3A1&mode=design&t=mrumnsgmp73wu7kL-1"
						target="_blank"
						my={3}
					>
						<Button colorScheme="orange" width="100%">
							Designs
						</Button>
					</Link>
					<Link
						href="https://github.com/dukartbr/task-tracker"
						target="_blank"
						my={3}
					>
						<Button colorScheme="green" width="100%">
							Code
						</Button>
					</Link>
					<Button
						colorScheme="teal"
						onClick={() => onToggle()}
						width="100%"
						my={3}
					>
						Info
					</Button>
				</Flex>
			</Box>
		</Flex>
	);
}

export function TextContent() {
	return (
		<Box px={4}>
			<Heading>React Task Tracker</Heading>
			<Text size="2xl" fontWeight="bold">
				New Features & UI being added soon!
			</Text>
			<Text mt={3}>
				Thanks for checking this project out. This is a simple task manager app
				that's continuously in progress. The mobile experience is still a little
				funky.
			</Text>

			<Text mt={3}>
				Currently, there is no due date selection! Feel free to follow the
				design and code progress!
			</Text>
		</Box>
	);
}

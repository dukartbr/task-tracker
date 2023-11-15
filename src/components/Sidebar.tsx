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
		<Box px={4}>
			<Heading>Howdy!</Heading>
			<Text mt={3}>
				Thanks for checking this project out. This is a simple task manager app
				that's continuously in progress.
			</Text>

			<Text mt={3}>
				Currently, it only supports desktop but that will change in the near
				future. Feel free to follow the design and code progress!
			</Text>
			<Flex mt={3}>
				<Link
					href="https://www.figma.com/file/oxen1fyXzt5rAciomHfg5K/Custom-Dashboard?type=design&node-id=0%3A1&mode=design&t=mrumnsgmp73wu7kL-1"
					target="_blank"
				>
					<Button colorScheme="orange">Figma</Button>
				</Link>
				<Spacer />
				<Link href="https://github.com/dukartbr/task-tracker" target="_blank">
					<Button colorScheme="green">Github</Button>
				</Link>
			</Flex>
		</Box>
	);
}

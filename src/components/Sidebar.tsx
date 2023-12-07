import { Box, Button, Flex, Icon, Link, Spacer } from "@chakra-ui/react";
import { FaReact, FaFigma, FaGithub } from "react-icons/fa6";

export function Sidebar() {
	return (
		<Flex bg="cyan.600" h="100vh" direction="column">
			<Box textAlign="center" pt={8}>
				<Icon as={FaReact} color="white" align="center" fontSize="3xl" />
			</Box>
			<Spacer />
			<Box textAlign="right" pb={7}>
				<Flex direction="column" px={2}>
					<Link
						href="https://www.figma.com/file/oxen1fyXzt5rAciomHfg5K/Custom-Dashboard?type=design&node-id=0%3A1&mode=design&t=mrumnsgmp73wu7kL-1"
						target="_blank"
						my={3}
					>
						<Button colorScheme="orange" width="100%" rightIcon={<FaFigma />}>
							Designs
						</Button>
					</Link>
					<Link
						href="https://github.com/dukartbr/task-tracker"
						target="_blank"
						my={3}
					>
						<Button colorScheme="green" width="100%" rightIcon={<FaGithub />}>
							Code
						</Button>
					</Link>
				</Flex>
			</Box>
		</Flex>
	);
}

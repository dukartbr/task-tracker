import { Flex, Text } from "@chakra-ui/react";
import { Sidebar } from "./components/Sidebar";
import { Tasks } from "./pages/Tasks";

function App() {
	return (
		<Flex bgColor="gray.700" h="100vh" w="100vw">
			<Sidebar />
			<Tasks />
		</Flex>
	);
}

export default App;

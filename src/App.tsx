import { Flex, Text } from "@chakra-ui/react";
import { Sidebar } from "./components/Sidebar";
import { Tasks, taskGroups } from "./pages/Tasks";

function App() {
	return (
		<Flex bgColor="gray.700" h="100vh" w="100vw">
			<Sidebar />
			<Tasks tasks={taskGroups} />
		</Flex>
	);
}

export default App;

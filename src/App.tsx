import { useEffect, useState } from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { Sidebar } from "./components/Sidebar";
import { MobileHeader } from "./components/MobileHeader";
import { Tasks } from "./pages/Tasks";

function App() {
	const [isMobile, setIsMobile] = useState(false);
	const [isSmallerThan992] = useMediaQuery("(max-width: 992px)");

	useEffect(() => {
		setIsMobile(isSmallerThan992);
	}, [isSmallerThan992]);

	return (
		<>
			<Flex
				bgColor="gray.700"
				h="100vh"
				w="100vw"
				position="relative"
				direction={["column", null, null, "row"]}
			>
				{isMobile ? <MobileHeader /> : <Sidebar />}
				<Tasks isMobile={isMobile} />
			</Flex>
		</>
	);
}

export default App;

import { createContext, useEffect, useState } from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { Sidebar } from "./components/Sidebar";
import { MobileHeader } from "./components/MobileHeader";
import { Tasks } from "./pages/Tasks";

export const MobileContext = createContext(false);

function App() {
	const [isMobile, setIsMobile] = useState(false);
	const [isSmallerThan992] = useMediaQuery("(max-width: 992px)");

	useEffect(() => {
		setIsMobile(isSmallerThan992);
	}, [isSmallerThan992]);

	return (
		<MobileContext.Provider value={isMobile}>
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
		</MobileContext.Provider>
	);
}

export default App;

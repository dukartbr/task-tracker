import { useState, useEffect } from "react";
import { Box, Flex, Spinner, useMediaQuery } from "@chakra-ui/react";
import { Sidebar } from "./components/Sidebar";
import { MobileHeader } from "./components/MobileHeader";
import { Tasks } from "./pages/Tasks";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 992px)");

  useEffect(() => {
	setIsLoading(false)
  }, [isMobile])

  return (
    <Flex
      bgColor="gray.700"
      h="100vh"
      w="100vw"
      position="relative"
      direction={["column", null, null, "row"]}
    >
      {isLoading ? (
		<Box width="100%" textAlign="center" mt={12}>
        <Spinner />
		</Box>
      ) : (
        <>
          {isMobile ? <MobileHeader /> : <Sidebar />}
          <Tasks isMobile={isMobile} />
        </>
      )}
    </Flex>
  );
}

export default App;

import { useState, useEffect } from "react";
import { Box, Flex, Spinner, useMediaQuery } from "@chakra-ui/react";
import { Sidebar } from "./components/Sidebar";
import { MobileHeader } from "./components/MobileHeader";
import { Tasks } from "./pages/Tasks";
import { Board } from "./pages/Board";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 992px)");
  const [activeBoardId, setActiveBoardId] = useState<string>("");

  useEffect(() => {
    setIsLoading(false);
  }, [isMobile]);

  return (
    <Flex
      bgColor="gray.700"
      h="100dvh"
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
          {isMobile ? (
            <MobileHeader />
          ) : (
            <Sidebar setActiveBoard={setActiveBoardId} />
          )}
          {activeBoardId ? (
            <Board
              isMobile={isMobile}
              id={activeBoardId}
              setActiveBoard={setActiveBoardId}
            />
          ) : (
            <Tasks isMobile={isMobile} />
          )}
        </>
      )}
    </Flex>
  );
}

export default App;

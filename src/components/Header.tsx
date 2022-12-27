import React from "react";
import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function Header({ onOpen }: { onOpen: () => void }) {
  return (
    <Flex width='100%' bgColor='blue.200' py={3} px={6}>
      <Text color='white' fontWeight='bold'>
        React DnD Fun
      </Text>
      <Spacer />
      <Button rightIcon={<AddIcon />} onClick={onOpen}>
        Add Card
      </Button>
    </Flex>
  );
}

import React from "react";
import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function Header({ onOpen }: { onOpen: () => void }) {
  return (
    <Flex
      width='100%'
      bgColor='blackAlpha.900'
      borderColor='purple.400'
      borderWidth='thick'
      py={3}
      px={6}
      h='6rem'
    >
      <Text
        bgGradient='linear(to-l, purple.400, pink.600)'
        bgClip='text'
        fontSize='4xl'
        fontWeight='extrabold'
      >
        React'n Drop
      </Text>
      <Spacer />
      <Button
        bgGradient='linear(to-l, purple.400, pink.600)'
        rightIcon={<AddIcon />}
        onClick={onOpen}
        color='white'
      >
        Add Card
      </Button>
    </Flex>
  );
}

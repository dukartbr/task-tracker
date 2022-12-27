import React from "react";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function CardGrid() {
  const localStorageQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => window.localStorage.getItem("TO_DO_APP_CARDS"),
  });

  const cards: TaskCards[] = localStorageQuery.data
    ? JSON.parse(localStorageQuery.data)
    : [];

  return (
    <Flex width='100%'>
      {cards.map(({ title, color, data }) => (
        <Stack
          h='100vh'
          width='100%'
          py={3}
          px={4}
          bg={color}
          key={title}
          overflow='scroll'
        >
          <Heading textAlign='center' size='lg'>
            {title}
          </Heading>
          <Box>
            {data.map((card) => (
              <Card key={card.title} my={6}>
                <CardBody>
                  <Heading size='md' mb={4}>
                    {card.title}
                  </Heading>
                  <Text>{card.description}</Text>
                </CardBody>
              </Card>
            ))}
          </Box>
        </Stack>
      ))}
    </Flex>
  );
}

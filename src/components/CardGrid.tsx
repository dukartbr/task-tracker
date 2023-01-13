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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function CardGrid({ cards }: { cards: TaskCards[] }) {
  // using useCallback is optional
  const onBeforeCapture = React.useCallback(() => {
    console.log("onBeforeCapture :>> ", onBeforeCapture);
  }, []);
  const onBeforeDragStart = React.useCallback(() => {
    console.log("onBeforeDragStart", onBeforeDragStart);
  }, []);
  const onDragStart = React.useCallback(() => {
    console.log("onDragStart", onDragStart);
  }, []);
  const onDragUpdate = React.useCallback(() => {
    console.log("onDragUpdate :>> ", onDragUpdate);
  }, []);
  const onDragEnd = React.useCallback(() => {
    console.log("onDragEnd", onDragEnd);
  }, []);
  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Flex width='100%'>
        {cards
          .sort((a: TaskCards, b: TaskCards) => {
            if (a.order_key < b.order_key) {
              return -1;
            }
            return 1;
          })
          .map(({ title, color, cards }) => (
            <Droppable key={title} droppableId={title}>
              {(provided, snapshot) => (
                <Stack
                  h='100vh'
                  width='100%'
                  py={3}
                  px={4}
                  bg={color}
                  ref={provided.innerRef}
                  overflow='scroll'
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "blue.200"
                      : color,
                  }}
                  {...provided.droppableProps}
                >
                  <Heading textAlign='center' size='lg'>
                    {title}
                  </Heading>
                  <Box>
                    {cards?.map((card, index) => {
                      return (
                        <Draggable
                          key={card.id}
                          draggableId={card.title}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Card
                              key={card.title}
                              my={6}
                              bg='white'
                              ref={provided.innerRef}
                            >
                              <CardBody>
                                <Heading size='md' mb={4}>
                                  {card.title}
                                </Heading>
                                <Text>{card.due_date}</Text>
                                <Text>{card.description}</Text>
                              </CardBody>
                            </Card>
                          )}
                        </Draggable>
                      );
                    })}
                  </Box>
                </Stack>
              )}
            </Droppable>
          ))}
      </Flex>
    </DragDropContext>
  );
}

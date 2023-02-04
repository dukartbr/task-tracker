import React from "react";
import {
  Box,
  Card,
  CardBody,
  IconButton,
  Flex,
  Heading,
  Text,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useLocalStorage } from "../utils/localStorage";

const tests: TaskCards[] = [
  {
    title: "IDEAS",
    id: "IDEAS",
    order_key: 1,
    cards: [],
  },
  {
    title: "TO-DO",
    id: "TO-DO",
    order_key: 2,
    cards: [
      {
        title: "fdasdfdsadfadf",
        due_date: "Wed Jan 25 2023 14:17:40 GMT-0600 (Central Standard Time)",
        description: "fdsaadsfdsa",
        order_key: 1,
        id: "9a486e5b-bb37-4e80-a859-14c60c22786f",
      },
      {
        title: "write great code",
        due_date: "Wed Jan 25 2023 14:26:27 GMT-0600 (Central Standard Time)",
        description: "asdf",
        order_key: 2,
        id: "ee0ba408-5c18-4e3f-a1bd-1c9c71efa0a7",
      },
    ],
  },
  {
    title: "DONE",
    id: "IN-PROGRESS",
    order_key: 4,
    cards: [],
  },
  {
    title: "IN-PROGRESS",
    id: "IN-PROGRESS",
    order_key: 3,
    cards: [
      {
        title: "asdffdsa",
        due_date: "Wed Jan 25 2023 14:17:32 GMT-0600 (Central Standard Time)",
        description: "fdafdsa",
        order_key: 0,
        id: "ba44d0bd-5b1a-4efc-871d-61cf542660c3",
      },
      {
        title: "fdasdfdsadfadf",
        due_date: "Wed Jan 25 2023 14:17:40 GMT-0600 (Central Standard Time)",
        description: "fdsaadsfdsa",
        order_key: 1,
        id: "9a486e5b-bb37-4e80-a859-14c60c22786f",
      },
      {
        title: "write great code",
        due_date: "Wed Jan 25 2023 14:26:27 GMT-0600 (Central Standard Time)",
        description: "asdf",
        order_key: 2,
        id: "ee0ba408-5c18-4e3f-a1bd-1c9c71efa0a7",
      },
      {
        title: "write wonderful code",
        due_date: "Wed Jan 25 2023 14:26:36 GMT-0600 (Central Standard Time)",
        description: "asdf",
        order_key: 3,
        id: "88909588-6033-4d7d-a60d-a05a7f65cd06",
      },
      {
        title: "asdffdsa",
        due_date: "Wed Jan 25 2023 14:17:32 GMT-0600 (Central Standard Time)",
        description: "fdafdsa",
        order_key: 0,
        id: "ba44d0bd-5b1a-4efc-871d-61cf542660c3",
      },
      {
        title: "fdasdfdsadfadf",
        due_date: "Wed Jan 25 2023 14:17:40 GMT-0600 (Central Standard Time)",
        description: "fdsaadsfdsa",
        order_key: 1,
        id: "9a486e5b-bb37-4e80-a859-14c60c22786f",
      },
      {
        title: "write great code",
        due_date: "Wed Jan 25 2023 14:26:27 GMT-0600 (Central Standard Time)",
        description: "asdf",
        order_key: 2,
        id: "ee0ba408-5c18-4e3f-a1bd-1c9c71efa0a7",
      },
      {
        title: "write wonderful code",
        due_date: "Wed Jan 25 2023 14:26:36 GMT-0600 (Central Standard Time)",
        description: "asdf",
        order_key: 3,
        id: "88909588-6033-4d7d-a60d-a05a7f65cd06",
      },
      {
        title: "asdffdsa",
        due_date: "Wed Jan 25 2023 14:17:32 GMT-0600 (Central Standard Time)",
        description: "fdafdsa",
        order_key: 0,
        id: "ba44d0bd-5b1a-4efc-871d-61cf542660c3",
      },
      {
        title: "fdasdfdsadfadf",
        due_date: "Wed Jan 25 2023 14:17:40 GMT-0600 (Central Standard Time)",
        description: "fdsaadsfdsa",
        order_key: 1,
        id: "9a486e5b-bb37-4e80-a859-14c60c22786f",
      },
      {
        title: "write great code",
        due_date: "Wed Jan 25 2023 14:26:27 GMT-0600 (Central Standard Time)",
        description: "asdf",
        order_key: 2,
        id: "ee0ba408-5c18-4e3f-a1bd-1c9c71efa0a7",
      },
      {
        title: "write wonderful code",
        due_date: "Wed Jan 25 2023 14:26:36 GMT-0600 (Central Standard Time)",
        description: "asdf",
        order_key: 3,
        id: "88909588-6033-4d7d-a60d-a05a7f65cd06",
      },
      {
        title: "asdffdsa",
        due_date: "Wed Jan 25 2023 14:17:32 GMT-0600 (Central Standard Time)",
        description: "fdafdsa",
        order_key: 0,
        id: "ba44d0bd-5b1a-4efc-871d-61cf542660c3",
      },
      {
        title: "fdasdfdsadfadf",
        due_date: "Wed Jan 25 2023 14:17:40 GMT-0600 (Central Standard Time)",
        description: "fdsaadsfdsa",
        order_key: 1,
        id: "9a486e5b-bb37-4e80-a859-14c60c22786f",
      },
      {
        title: "write great code",
        due_date: "Wed Jan 25 2023 14:26:27 GMT-0600 (Central Standard Time)",
        description: "asdf",
        order_key: 2,
        id: "ee0ba408-5c18-4e3f-a1bd-1c9c71efa0a7",
      },
      {
        title: "write wonderful code",
        due_date: "Wed Jan 25 2023 14:26:36 GMT-0600 (Central Standard Time)",
        description: "asdf",
        order_key: 3,
        id: "88909588-6033-4d7d-a60d-a05a7f65cd06",
      },
    ],
  },
];

function updateCardOrderKey(
  cardToUpdate: TaskCard,
  cards: TaskCard[],
  sourceIndex: number,
  destIndex: number
) {
  const filteredCards = cards.filter(
    (card) => card.order_key !== cardToUpdate.order_key
  );
  const cardsToMoveDown = filteredCards.filter(
    (card) => card.order_key < sourceIndex && card.order_key >= destIndex
  );
  const cardsToMoveUp = filteredCards.filter(
    (card) => card.order_key > sourceIndex && card.order_key <= destIndex
  );
  const updatedDownList = cardsToMoveDown.map((card) => {
    card["order_key"] = card["order_key"] + 1;
    return card;
  });

  const updatedUpList = cardsToMoveUp.map((card) => {
    card["order_key"] = card["order_key"] - 1;
    return card;
  });

  cardToUpdate["order_key"] = destIndex;

  const value = [cardToUpdate, ...updatedDownList, ...updatedUpList];
  console.log("value", value);
  // const updatedCardList = cards
  //   .filter((card) => card.order_key !== sourceIndex)
  //   .map((card) => {
  //     if (
  //       destIndex > sourceIndex &&
  //       card.order_key <= destIndex &&
  //       card.order_key > sourceIndex
  //     ) {
  //       console.log("card + 1 :>> before ", card);
  //       card["order_key"] = card.order_key - 1;
  //       console.log("card + 1 :>> after ", card);
  //     } else if (
  //       sourceIndex > destIndex &&
  //       card.order_key >= destIndex &&
  //       card.order_key < sourceIndex
  //     ) {
  //       console.log("card - 1 :>> ", card);
  //       card["order_key"] = card.order_key + 1;
  //     } else {
  //       console.log("unaffected card", card);
  //     }
  //     return card;
  //   });
  // const cardToUpdate = cards.filter(
  //   (card) => card.order_key === sourceIndex
  // )[0];
  // cardToUpdate["order_key"] = destIndex;
  // console.log("cardToUpdate :>> ", cardToUpdate);
  // const result = [...updatedCardList, cardToUpdate];
  // console.log("result", result);
}

export default function CardGrid({
  // TODO: Change this variable name to cardContainers
  cards,
  onOpen,
}: {
  cards: TaskCards[];
  onOpen: () => void;
}) {
  // const [setTaskCards] = useLocalStorage();

  function onDragEnd(result: any) {
    const containerToUpdate = cards.filter(
      (container) => container.title === result.destination.droppableId
    )[0];
    const cardToUpdate = containerToUpdate.cards.filter(
      (card) => card.title === result.draggableId
    )[0];
    updateCardOrderKey(
      cardToUpdate,
      containerToUpdate.cards,
      result.source.index,
      result.destination.index
    );
  }
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex width='100%'>
          {tests
            .sort((a: TaskCards, b: TaskCards) => {
              if (a.order_key < b.order_key) {
                return -1;
              }
              return 1;
            })
            .map(({ title, cards }) => (
              <Droppable key={title} droppableId={title}>
                {(provided, snapshot) => (
                  <VStack
                    width='100%'
                    px={3}
                    bg='blackAlpha.900'
                    borderColor='pink.600'
                    borderWidth='thick'
                    ref={provided.innerRef}
                    overflow='scroll'
                    style={{
                      backgroundColor: snapshot.isDraggingOver
                        ? "blackAlpha.200"
                        : "blackAlpha.800",
                    }}
                    {...provided.droppableProps}
                  >
                    <Heading textAlign='center' size='lg' color='pink.400'>
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
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <CardBody>
                                  <Flex>
                                    <Heading size='md' mb={4}>
                                      {card.title}
                                    </Heading>
                                    <Spacer />
                                    <IconButton
                                      onClick={onOpen}
                                      icon={<EditIcon />}
                                      aria-label='edit card'
                                    />
                                  </Flex>
                                  <Text>{card.due_date}</Text>
                                  <Text>{card.description}</Text>
                                </CardBody>
                              </Card>
                            )}
                          </Draggable>
                        );
                      })}
                    </Box>
                  </VStack>
                )}
              </Droppable>
            ))}
        </Flex>
      </DragDropContext>
    </>
  );
}

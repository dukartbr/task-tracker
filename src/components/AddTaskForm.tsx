import React from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  createStandaloneToast,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, Field } from "formik";
import { AddIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function CustomDatePicker({
  startDate,
  setStartDate,
}: {
  startDate: Date;
  setStartDate: (date: Date) => void;
}) {
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        if (date) setStartDate(date);
      }}
    />
  );
}

export default function AddTaskForm({
  cards,
  onClose,
}: {
  cards: TaskCards[];
  onClose: () => void;
}) {
  const [startDate, setStartDate] = React.useState(new Date());
  const { toast } = createStandaloneToast();
  return (
    <Formik
      initialValues={{
        title: "",
        status: undefined,
        due_date: "",
        description: "",
        id: "",
      }}
      onSubmit={(newTask) => {
        newTask.id = uuidv4();
        console.log(uuidv4());
        if (
          !newTask.status ||
          !cards.map((card) => card.title).includes(newTask.status)
        ) {
          toast({
            title: "Whoops there was an error!",
            status: "error",
          });
          return;
        }

        const currentCategory = cards.filter(
          (card) => card.title === newTask.status
        )[0];
        const excludedCategories = cards.filter(
          (card) => card.title !== newTask.status
        );
        delete newTask["status"];
        newTask["due_date"] = startDate.toString();
        const currentCards = currentCategory.cards;
        currentCategory.cards = [...currentCards, newTask];

        window.localStorage.setItem(
          "TO_DO_APP_CARDS",
          JSON.stringify([...excludedCategories, currentCategory])
        );

        toast({
          title: "Task Added!",
          status: "success",
        });
        onClose();
      }}
    >
      {({ isSubmitting, submitForm }) => (
        <>
          <Form>
            <Field
              name='title'
              as={Input}
              placeholder='Enter a Title'
              my={3}
              bg='white'
            />
            <Field
              name='status'
              as={Select}
              placeholder='Enter a Status'
              my={3}
              bg='white'
            >
              <option>IDEAS</option>
              <option>TO-DO</option>
              <option>IN-PROGRESS</option>
              <option>DONE</option>
            </Field>
            <Field
              name='due_date'
              as={() => (
                <CustomDatePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                />
              )}
              placeholder='Enter a Due Date'
              my={3}
              bg='white'
            />
            <Field
              name='description'
              as={Textarea}
              placeholder='Enter a Description'
              my={3}
              bg='white'
            />
            <Button
              rightIcon={<AddIcon />}
              type='submit'
              onClick={submitForm}
              disabled={isSubmitting}
            >
              Create Task
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
}

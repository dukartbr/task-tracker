import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AddIcon } from "@chakra-ui/icons";

export default function AddCardDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose} size='lg'>
      <DrawerOverlay />
      <DrawerContent bg='gray.700'>
        <DrawerHeader textAlign='center' color='white' fontSize='xl'>
          Add A Card
        </DrawerHeader>
        <DrawerBody>
          <AddTaskForm />
        </DrawerBody>
        <DrawerFooter color='gray.300'>
          Task Cards Stored In Local Storage
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AddTaskForm() {
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
      }}
      onSubmit={(values) => {
        console.log("values", values);
      }}
    >
      {({ isSubmitting, submitForm }) => (
        <Form>
          <Field name='title' as={Input} placeholder='Enter a Title' my={3} />
          <Field name='status' as={StatusField} my={3} />
          <Field
            name='description'
            as={Textarea}
            placeholder='Enter a Description'
            my={3}
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
      )}
    </Formik>
  );
}

function StatusField() {
  return (
    <Select placeholder='Select a Status'>
      <option>IDEAS</option>
      <option>TO DO</option>
      <option>IN PROGRESS</option>
      <option>DONE</option>
    </Select>
  );
}

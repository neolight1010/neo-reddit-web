import { Button } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import React from "react";
import { InputField } from "./InputField";

interface CreatePostFormProps {
  initialValues?: CreatPostFormData;
  onSubmit: (values: CreatPostFormData, helpers: FormikHelpers<CreatPostFormData>) => Promise<void>;
}

interface CreatPostFormData {
  title: string;
  text: string;
}

export const CreatePostForm = ({ onSubmit, initialValues }: CreatePostFormProps): JSX.Element => {
  return (
    <Formik
      initialValues={initialValues ?? { title: "", text: "" }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="title" label="Title" placeholder="Title" />
          <InputField
            name="text"
            label="Text"
            placeholder="Post text."
            textarea
            mt="8px"
          />
          <Button
            mt="8px"
            type="submit"
            colorScheme="teal"
            isLoading={isSubmitting}
          >
            Create Post
          </Button>
        </Form>
      )}
    </Formik>
  );
};

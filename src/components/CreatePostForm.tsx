import { Button } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers,FormikErrors } from "formik";
import React from "react";
import { InputField } from "./InputField";

interface CreatePostFormProps {
  initialValues?: EditPostFormData;
  onSubmit: (values: EditPostFormData, helpers: FormikHelpers<EditPostFormData>) => Promise<void>;

  submitButtonText?: string;
}

interface EditPostFormData {
  title: string;
  text: string;
}

export const EditPostForm = ({ onSubmit, initialValues, submitButtonText }: CreatePostFormProps): JSX.Element => {
  return (
    <Formik
      initialValues={initialValues ?? { title: "", text: "" }}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors: FormikErrors<EditPostFormData> = {};
        const emptyFieldError = "Field cannot be empty.";

        if (!values.title) {
          errors.title = emptyFieldError;
        }

        if (!values.text) {
          errors.text = emptyFieldError;
        }

        return errors;
      }}
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
            {submitButtonText ?? "Submit"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Form, Formik } from "formik";
import React, { ReactElement } from "react";

export interface registerProps {}

export default function register(_props: registerProps): ReactElement | null {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              value={values.username}
              onChange={handleChange}
              id="username"
              placeholder="username"
            />
          </FormControl>
        </Form>
      )}
    </Formik>
  );
}

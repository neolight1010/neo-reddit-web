import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Form, Formik } from "formik";
import React, { ReactElement } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";

export interface registerProps {}

export default function register(_props: registerProps): ReactElement | null {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <InputField
              name="username"
              label="Username"
              placeholder="your_username"
            />
            <InputField
              name="password"
              label="Password"
              placeholder="your_password"
              type="password"
            />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

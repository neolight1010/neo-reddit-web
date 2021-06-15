import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import React, { ReactElement } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

export interface registerProps {}

export default function register(_props: registerProps): ReactElement | null {
  const [_registerData, register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          }
        }}
      >
        {({ isSubmitting }) => (
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
              mt="8px"
            />
            <Button
              mt="16px"
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

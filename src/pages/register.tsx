import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React, { ReactElement } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

export interface registerProps {}

export function register(_props: registerProps): ReactElement | null {
  const [_registerData, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
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
              name="email"
              label="Email"
              placeholder="user@example.com"
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

export default withUrqlClient(createUrqlClient)(register);

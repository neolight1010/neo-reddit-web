import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React, { ReactElement } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import NextLink from "next/link";
import { Box, Flex, Link } from "@chakra-ui/react";
import {NavBar} from "../components/NavBar";

export interface loginProps {}

export function login(_props: loginProps): ReactElement | null {
  const [_loginData, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Box>
      <NavBar />
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);

            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
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
                name="password"
                label="Password"
                placeholder="your_password"
                type="password"
                mt="8px"
              />

              <Flex direction="column">
                <NextLink href="/forgot-password">
                  <Link ml="auto">Forgot your password?</Link>
                </NextLink>

                <NextLink href="/register">
                  <Link ml="auto">Register</Link>
                </NextLink>
              </Flex>

              <Button
                mt="8px"
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Box>
  );
}

export default withUrqlClient(createUrqlClient)(login);

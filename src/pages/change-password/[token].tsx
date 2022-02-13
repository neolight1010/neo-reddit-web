import { Alert, Button, Flex, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { FunctionComponent } from "react";
import NextLink from "next/link";
import {useRouter} from "next/router";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ password: "" }}
        onSubmit={async (values, { setErrors }) => {
          setTokenError("");
          const response = await changePassword({
            newPassword: values.password,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          });

          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);

            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }

            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="password"
              label="New password"
              placeholder="your_new_password"
              type="password"
              mt="8px"
            />

            {tokenError ? (
              <Flex direction={"column"}>
                <Alert status="error" mt="8px">
                  {tokenError}
                </Alert>

                <NextLink href="/forgot-password">
                  <Link>Click here to get a new token.</Link>
                </NextLink>
              </Flex>
            ) : null}

            <Button
              mt="16px"
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  ChangePassword as FunctionComponent
);

import {Alert, Button} from "@chakra-ui/react";
import {Formik, Form} from "formik";
import {NextPage} from "next";
import {withUrqlClient} from "next-urql";
import router from "next/dist/client/router";
import React, {useState} from "react";
import {InputField} from "../../components/InputField";
import {Wrapper} from "../../components/Wrapper";
import {useChangePasswordMutation} from "../../generated/graphql";
import {createUrqlClient} from "../../utils/createUrqlClient";
import {toErrorMap} from "../../utils/toErrorMap";
import {FunctionComponent} from "react";

const ChangePassword: NextPage<{token: string}> = ({token}) => {
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{password: ""}}
        onSubmit={async (values, {setErrors}) => {
          setTokenError("");
          const response = await changePassword({newPassword: values.password, token});

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
        {({isSubmitting}) => (
          <Form>
            <InputField
              name="password"
              label="New password"
              placeholder="your_new_password"
              type="password"
              mt="8px"
            />

            {tokenError ? <Alert status="error" mt="8px">{tokenError}</Alert> : null}

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
}

ChangePassword.getInitialProps = ({query}) => {
  return {
    token: query.token as string
  }
}

export default withUrqlClient(createUrqlClient, {ssr: false})(ChangePassword as FunctionComponent);

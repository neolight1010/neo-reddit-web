import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { ReactElement, useEffect } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

export interface createPostProps {}

export function createPost(_props: createPostProps): ReactElement | null {
  const [, createPost] = useCreatePostMutation();

  const [{ fetching, data }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!data?.me.user && !fetching) {
      router.replace("/login");
    }
  }, [fetching, data, router]);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, _helpers) => {
          const response = await createPost(values);

          if (!response.error) {
            router.push("/");
          }
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
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default withUrqlClient(createUrqlClient)(createPost);

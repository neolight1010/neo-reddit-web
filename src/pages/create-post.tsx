import { withUrqlClient } from "next-urql";
import React, { ReactElement } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/useIsAuth";
import { Layout } from "../components/Layout";
import { EditPostForm } from "../components/CreatePostForm";

export interface createPostProps {}

export function createPost(_props: createPostProps): ReactElement | null {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();

  useIsAuth();

  return (
    <Layout variant="small">
      <EditPostForm
        onSubmit={async (values, _helpers) => {
          const response = await createPost(values);

          if (!response.error) {
            router.push("/");
          }
        }}
        submitButtonText="Create Post"
      />
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient)(createPost);

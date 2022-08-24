import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { EditPostForm } from "../../../components/CreatePostForm";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const INVALID_POST_ID = "-1";

const EditPost = (): JSX.Element => {
  const router = useRouter();

  const postId: string =
    typeof router.query.id === "string" ? router.query.id : INVALID_POST_ID;

  const [{ data: postData }] = usePostQuery({
    variables: { id: postId },
    pause: postId === INVALID_POST_ID,
  });

  const [_, updatePost] = useUpdatePostMutation();

  return (
    <Layout>
      <EditPostForm
        onSubmit={async (values) => {
          await updatePost({
            id: postId,
            title: values.title,
            text: values.text,
          });

          router.push("/post/[id]", `/post/${postId}`);
        }}
        initialValues={{
          title: postData?.post?.title || "",
          text: postData?.post?.text || "",
        }}
      />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);

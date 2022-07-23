import { Box, Heading, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const INVALID_POST_ID = "-1";

export const Post = (): JSX.Element => {
  const router = useRouter();

  const postId: string =
    typeof router.query.id === "string" ? router.query.id : INVALID_POST_ID;

  const [{ data, fetching }] = usePostQuery({
    pause: postId === INVALID_POST_ID,
    variables: { id: postId },
  });

  console.log("ERROR: ", data);

  if (fetching) {
    return <Layout>{"Loading..."}</Layout>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post.</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>

      <Text>{data.post.text}</Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);

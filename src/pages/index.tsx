import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { usePostsQuery } from "../generated/graphql";
import NextLink from "next/link";
import { Button, Link } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { useState } from "react";
import { PostCard } from "../components/PostCard";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null,
  });

  const [{ data, fetching }, _execPostsQuery] = usePostsQuery({
    variables,
    requestPolicy: "network-only",
  });

  if (!data && !fetching) return <Box>Posts query failed...</Box>;

  return (
    <Layout>
      {!data && fetching ? (
        <Box>Loading...</Box>
      ) : (
        <Stack spacing={8} mb={8}>
          {data!.posts.postsWithUserVote.map((postWithUserVote) => (
            <PostCard
              postWithUserVote={postWithUserVote}
              key={postWithUserVote.post.id}
            ></PostCard>
          ))}
        </Stack>
      )}

      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            isLoading={fetching}
            m="auto"
            mb={8}
            onClick={() => {
              setVariables({
                ...variables,
                cursor:
                  data.posts.postsWithUserVote[
                    data.posts.postsWithUserVote.length - 1
                  ].post.createdAt,
              });
            }}
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);

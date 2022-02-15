import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { usePostsQuery } from "../generated/graphql";
import NextLink from "next/link";
import { Button, Link, Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null,
  });

  const [{ data, fetching }, _execPostsQuery] = usePostsQuery({
    variables,
  });

  if (!data && !fetching) return <Box>Posts query failed...</Box>;

  return (
    <Layout>
      <Flex mb={3} align="center">
        <Heading>NeoReddit</Heading>

        <NextLink href="/create-post">
          <Link ml="auto">Create Post</Link>
        </NextLink>
      </Flex>

      {!data && fetching ? (
        <Box>Loading...</Box>
      ) : (
        <Stack spacing={8}>
          {data!.posts.map((post) => (
            <Box key={post.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}

      {data ? (
        <Flex>
          <Button
            isLoading={fetching}
            m="auto"
            my={8}
            onClick={() => {
              setVariables({
                ...variables,
                cursor: data.posts[data.posts.length - 1].createdAt,
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

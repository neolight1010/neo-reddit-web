import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { usePostsQuery } from "../generated/graphql";
import NextLink from "next/link";
import { Link, Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";

const Index = () => {
  const [postsData, _execPostsQuery] = usePostsQuery();

  return (
    <Layout>
      <Flex mb={3} align="center">
        <Heading>NeoReddit</Heading>

        <NextLink href="/create-post">
          <Link ml="auto">Create Post</Link>
        </NextLink>
      </Flex>

      { !postsData.data
        ? <Box>Loading...</Box>
        : <Stack spacing={8}>
          {
            postsData.data.posts.map((post) => (
              <Box key={post.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.textSnippet}</Text>
              </Box>
            ))
          }
          </Stack>
      }
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);

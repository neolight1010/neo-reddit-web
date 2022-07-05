import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Post, PostsQuery } from "../generated/graphql";
import { VoteSection } from "./VoteSection";

interface PostCardProps {
  post: PostsQuery["posts"]["posts"][0];
}

export const PostCard = ({ post }: PostCardProps): JSX.Element => {
  return (
    <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
      <VoteSection post={post} />

      <Box>
        <Heading fontSize="xl">{post.title}</Heading>

        {post.author.username}

        <Text mt={4}>{post.textSnippet}</Text>
      </Box>
    </Flex>
  );
};

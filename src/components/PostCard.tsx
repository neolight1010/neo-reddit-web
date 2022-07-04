import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Post } from "../generated/graphql";
import { VoteSection } from "./VoteSection";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps): JSX.Element => {
  return (
    <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
      <VoteSection points={post.points} />

      <Box>
        <Heading fontSize="xl">{post.title}</Heading>

        {post.author.username}

        <Text mt={4}>{post.textSnippet}</Text>
      </Box>
    </Flex>
  );
};

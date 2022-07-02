import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Post } from "../generated/graphql";

interface PostCardProps {
  post: Post,
}

export const PostCard = ({ post }: PostCardProps): JSX.Element => {
  return (
    <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
      <Flex flexDir="column" align="center" mr={3}>
        <ChevronUpIcon fontSize="medium" />

        {post.points}

        <ChevronDownIcon fontSize="medium" />
      </Flex>

      <Box>
        <Heading fontSize="xl">{post.title}</Heading>

        {post.author.username}

        <Text mt={4}>{post.textSnippet}</Text>
      </Box>
    </Flex>
  );
};

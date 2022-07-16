import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { PostsQuery } from "../generated/graphql";
import { VoteSection } from "./VoteSection";

interface PostCardProps {
  postWithUserVote: PostsQuery["posts"]["postsWithUserVote"][0];
}

export const PostCard = ({ postWithUserVote }: PostCardProps): JSX.Element => {
  const { post, userVote } = postWithUserVote;

  return (
    <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
      <VoteSection postWithUserVote={postWithUserVote} />

      <Box>
        <Heading fontSize="xl">{post.title}</Heading>

        {post.author.username}

        <Text mt={4}>{post.textSnippet}</Text>
      </Box>
    </Flex>
  );
};

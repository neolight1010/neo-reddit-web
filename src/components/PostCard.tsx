import { Box, Flex, Heading, Text, Link } from "@chakra-ui/layout";
import { PostsQuery } from "../generated/graphql";
import { VoteSection } from "./VoteSection";
import NextLink from "next/link";

interface PostCardProps {
  postWithUserVote: PostsQuery["posts"]["postsWithUserVote"][0];
}

export const PostCard = ({ postWithUserVote }: PostCardProps): JSX.Element => {
  const { post } = postWithUserVote;

  return (
    <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
      <VoteSection postWithUserVote={postWithUserVote} />

      <Box>
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Link>
            <Heading fontSize="xl">{post.title}</Heading>
          </Link>
        </NextLink>

        {post.author.username}

        <Text mt={4}>{post.textSnippet}</Text>
      </Box>
    </Flex>
  );
};

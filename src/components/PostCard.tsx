import { Box, Flex, Heading, Text, Link, Spacer } from "@chakra-ui/layout";
import { PostsQuery } from "../generated/graphql";
import { VoteSection } from "./VoteSection";
import NextLink from "next/link";
import { IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";

interface PostCardProps {
  postWithUserVote: PostsQuery["posts"]["postsWithUserVote"][0];
}

export const PostCard = ({ postWithUserVote }: PostCardProps): JSX.Element => {
  const { post } = postWithUserVote;

  return (
    <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
      <VoteSection postWithUserVote={postWithUserVote} />

      <Box w="100%" h="100%">
        <Flex>
          <Box>
            <NextLink href="/post/[id]" as={`/post/${post.id}`}>
              <Link>
                <Heading fontSize="xl">{post.title}</Heading>
              </Link>
            </NextLink>

            {post.author.username}
          </Box>

          <Spacer />

          <IconButton aria-label="Delete post" colorScheme="red">
            <DeleteIcon />
          </IconButton>
        </Flex>

        <Text mt={4}>{post.textSnippet}</Text>
      </Box>
    </Flex>
  );
};

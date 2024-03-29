import { Box, Flex, Heading, Text, Link, Spacer } from "@chakra-ui/layout";
import {
  PostsQuery,
  useDeletePostMutation,
  useMeQuery,
} from "../generated/graphql";
import { VoteSection } from "./VoteSection";
import NextLink from "next/link";
import { IconButton } from "@chakra-ui/button";
import { DeleteIcon, EditIcon, SpinnerIcon } from "@chakra-ui/icons";

type PostsQueryPost = PostsQuery["posts"]["postsWithUserVote"][0];

interface PostCardProps {
  postWithUserVote: PostsQueryPost;
}

export const PostCard = ({ postWithUserVote }: PostCardProps): JSX.Element => {
  const { post } = postWithUserVote;

  return (
    <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
      <VoteSection postWithUserVote={postWithUserVote} />

      <Box w="100%" h="100%">
        <PostCardHeader post={post} />
        <Text mt={4}>{post.textSnippet}</Text>
      </Box>
    </Flex>
  );
};

interface PostCardHeaderProps {
  post: PostsQuery["posts"]["postsWithUserVote"][0]["post"];
}

const PostCardHeader = ({ post }: PostCardHeaderProps): JSX.Element => {
  const [{ data: meData }] = useMeQuery();

  return (
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

      {meData?.me.user?.id === post.author.id ? (
        <AuthorButtons post={post} />
      ) : null}
    </Flex>
  );
};

interface AuthorButtonsProps {
  post: PostsQueryPost["post"];
}

const AuthorButtons = ({ post }: AuthorButtonsProps): JSX.Element => {
  const [{ fetching: deletingPost }, deletePost] = useDeletePostMutation();

  const onDeletePost = () => {
    deletePost({ id: post.id });
  };

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${post.id}`}>
        <IconButton aria-label="Edit post" mr={2} as={Link}>
          <EditIcon />
        </IconButton>
      </NextLink>

      <IconButton
        aria-label="Delete post"
        colorScheme="red"
        onClick={onDeletePost}
      >
        {deletingPost ? <SpinnerIcon /> : <DeleteIcon />}
      </IconButton>
    </Box>
  );
};

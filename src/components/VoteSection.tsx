import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { PostsQuery, useVoteMutation, VoteDirection } from "../generated/graphql";

interface VoteSectionProps {
  post: PostsQuery["posts"]["posts"][0];
}

export const VoteSection = ({ post }: VoteSectionProps): JSX.Element => {
  const [, vote] = useVoteMutation();

  const onVoteClick = (direction: VoteDirection) => {
    vote({
      direction,
      postId: post.id.toString(),
    })
  };

  return (
    <Flex flexDir="column" align="center" mr={3}>
      <IconButton
        aria-label="Upvote"
        icon={<ChevronUpIcon />}
        onClick={() => onVoteClick(VoteDirection.Up)}
      ></IconButton>

      {post.points}

      <IconButton
        aria-label="Downvote"
        icon={<ChevronDownIcon />}
        onClick={() => onVoteClick(VoteDirection.Down)}
      ></IconButton>
    </Flex>
  );
};

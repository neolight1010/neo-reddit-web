import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import {
  PostsQuery,
  useVoteMutation,
  VoteDirection,
} from "../generated/graphql";

interface VoteSectionProps {
  postWithUserVote: PostsQuery["posts"]["postsWithUserVote"][0];
}

export const VoteSection = ({
  postWithUserVote,
}: VoteSectionProps): JSX.Element => {
  const { post, userVote } = postWithUserVote;

  const [points, setPoints] = useState(post.points);
  const [, vote] = useVoteMutation();

  const onVoteClick = async (direction: VoteDirection) => {
    const voteResult = await vote({
      direction,
      postId: post.id.toString(),
    });

    const newPoints = voteResult.data?.vote;

    if (newPoints !== undefined) {
      setPoints(newPoints);
    }
  };

  return (
    <Flex flexDir="column" align="center" mr={3}>
      <IconButton
        aria-label="Upvote"
        icon={<ChevronUpIcon />}
        colorScheme={userVote == VoteDirection.Up ? "green" : undefined}
        onClick={() => onVoteClick(VoteDirection.Up)}
      ></IconButton>

      {points}

      <IconButton
        aria-label="Downvote"
        icon={<ChevronDownIcon />}
        colorScheme={userVote == VoteDirection.Down ? "red" : undefined}
        onClick={() => onVoteClick(VoteDirection.Down)}
      ></IconButton>
    </Flex>
  );
};

import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import {useState} from "react";
import { PostsQuery, useVoteMutation, VoteDirection } from "../generated/graphql";

interface VoteSectionProps {
  post: PostsQuery["posts"]["posts"][0];
}

export const VoteSection = ({ post }: VoteSectionProps): JSX.Element => {
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
        onClick={() => onVoteClick(VoteDirection.Up)}
      ></IconButton>

      {points}

      <IconButton
        aria-label="Downvote"
        icon={<ChevronDownIcon />}
        onClick={() => onVoteClick(VoteDirection.Down)}
      ></IconButton>
    </Flex>
  );
};

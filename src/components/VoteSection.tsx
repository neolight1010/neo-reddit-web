import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import {
  PostsQuery,
  useDeleteVoteMutation,
  useVoteMutation,
  VoteDirection,
} from "../generated/graphql";

interface VoteSectionProps {
  postWithUserVote: PostsQuery["posts"]["postsWithUserVote"][0];
}

export const VoteSection = ({
  postWithUserVote,
}: VoteSectionProps): JSX.Element => {
  const { post, userVote: initialUserVote } = postWithUserVote;

  const [currentUserVote, setCurrentUserVote] = useState<VoteDirection | null>(
    initialUserVote ?? null
  );

  const [points, setPoints] = useState(post.points);
  const [, voteMutation] = useVoteMutation();
  const [, deleteVoteMutation] = useDeleteVoteMutation();

  const onVoteClick = async (direction: VoteDirection) => {
    if (currentUserVote === direction) {
      return await deleteVote();
    }

    await vote(direction);
  };

  const deleteVote = async (): Promise<void> => {
    setCurrentUserVote(null);

    const deleteVoteResult = await deleteVoteMutation({
      postId: post.id,
    });

    const newPoints = deleteVoteResult.data?.deleteVote || null;

    if (newPoints !== null) {
      setPoints(newPoints);
    }

    return;
  };

  const vote = async (direction: VoteDirection): Promise<void> => {
    setCurrentUserVote(direction);

    const voteResult = await voteMutation({
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
        colorScheme={currentUserVote == VoteDirection.Up ? "green" : undefined}
        onClick={() => onVoteClick(VoteDirection.Up)}
      ></IconButton>

      {points}

      <IconButton
        aria-label="Downvote"
        icon={<ChevronDownIcon />}
        colorScheme={currentUserVote == VoteDirection.Down ? "red" : undefined}
        onClick={() => onVoteClick(VoteDirection.Down)}
      ></IconButton>
    </Flex>
  );
};

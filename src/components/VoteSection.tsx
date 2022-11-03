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
import { voteDirectionValue } from "../utils/vote";

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

  const initialPointsWithoutUserVote =
    post.points - voteDirectionValue(initialUserVote ?? null);

  const [currentPoints, setPoints] = useState(
    initialPointsWithoutUserVote + voteDirectionValue(currentUserVote)
  );
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

    const { error: deleteVoteError } = await deleteVoteMutation({
      postId: post.id,
    });

    if (deleteVoteError !== undefined) {
      throw new Error("Deleting vote failed.");
    }

    setPoints(initialPointsWithoutUserVote);
  };

  const vote = async (direction: VoteDirection): Promise<void> => {
    setCurrentUserVote(direction);

    const { error: voteError } = await voteMutation({
      direction,
      postId: post.id.toString(),
    });

    if (voteError !== undefined) {
      throw new Error("Vote failed.");
    }

    setPoints(initialPointsWithoutUserVote + voteDirectionValue(direction));
  };

  return (
    <Flex flexDir="column" align="center" mr={3}>
      <IconButton
        aria-label="Upvote"
        icon={<ChevronUpIcon />}
        colorScheme={currentUserVote == VoteDirection.Up ? "green" : undefined}
        onClick={() => onVoteClick(VoteDirection.Up)}
      ></IconButton>

      {currentPoints}

      <IconButton
        aria-label="Downvote"
        icon={<ChevronDownIcon />}
        colorScheme={currentUserVote == VoteDirection.Down ? "red" : undefined}
        onClick={() => onVoteClick(VoteDirection.Down)}
      ></IconButton>
    </Flex>
  );
};

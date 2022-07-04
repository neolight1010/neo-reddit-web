import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";

interface VoteSectionProps {
  points: number;
}

export const VoteSection = ({ points }: VoteSectionProps): JSX.Element => {
  return (
    <Flex flexDir="column" align="center" mr={3}>
      <IconButton aria-label="Upvote" icon={<ChevronUpIcon />}></IconButton>

      {points}

      <IconButton aria-label="Downvote" icon={<ChevronDownIcon />}></IconButton>
    </Flex>
  );
};

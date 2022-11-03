import { VoteDirection } from "../generated/graphql";

/**
 * Return the value of a VoteDirection. UP = 1, DOWN = -1, null = 0.
 */
export const voteDirectionValue = (direction: VoteDirection | null): number => {
  switch (direction) {
    case VoteDirection.Up:
      return 1;
    case VoteDirection.Down:
      return -1;
  }

  return 0;
};

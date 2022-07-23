import { Button } from "@chakra-ui/button";
import { Link } from "@chakra-ui/layout";
import NextLink from "next/link";

export const CreatePostButton = (): JSX.Element => {
  return (
    <NextLink href="/create-post">
      <Button>
        <Link ml="auto">Create Post</Link>
      </Button>
    </NextLink>
  );
};

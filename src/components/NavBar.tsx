import { Box, Link } from "@chakra-ui/layout";
import { Flex, Spinner } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

export interface NavBarProps {}

export function NavBar(_props: NavBarProps): ReactElement | null {
  const [meData, _execMeQuery] = useMeQuery();

  let body = null;
  if (meData.fetching) {
    body = <Spinner />;
  } else {
    if (meData.data?.me.user) {
      body = <>{meData.data.me.user?.username}</>;
    } else {
      body = (
        <>
          <NextLink href="/login">
            <Link mr={5}>Login</Link>
          </NextLink>
          <NextLink href="/register">
            <Link>Register</Link>
          </NextLink>
        </>
      );
    }
  }

  return (
    <Flex bg="salmon" p="4">
      <Box ml="auto">{body}</Box>
    </Flex>
  );
}
